import { gs, GlideRecord, GlideDateTime } from '@servicenow/glide';

/**
 * Academic Book Dispute Resolution - Main API Routes
 * Handles all backend operations for lost/damaged book incidents
 */

// ============== INCIDENT MANAGEMENT ==============

export function createIncident(request, response) {
    try {
        const incidentData = request.body;
        
        // Validate required fields
        if (!incidentData.student_id || !incidentData.book_title) {
            response.setStatus(400);
            return {
                error: 'Missing required fields: student_id, book_title'
            };
        }

        // Create incident record
        const gr = new GlideRecord('x_1997678_acadreso_book_incident');
        gr.newRecord();
        gr.setValue('student_id', incidentData.student_id);
        gr.setValue('book_title', incidentData.book_title);
        gr.setValue('book_isbn', incidentData.book_isbn || '');
        gr.setValue('damage_type', incidentData.damage_type);
        gr.setValue('damage_level', incidentData.damage_level);
        gr.setValue('description', incidentData.description);
        gr.setValue('incident_date', incidentData.incident_date);
        gr.setValue('state', 'open');
        gr.setValue('priority', '3');
        
        const sysId = gr.insert();
        
        if (sysId) {
            // Trigger notification
            sendNotification('incident_created', sysId);
            
            // Get updated record with calculated fee
            const incident = new GlideRecord('x_1997678_acadreso_book_incident');
            incident.get(sysId);
            
            response.setStatus(201);
            return {
                success: true,
                incident_id: sysId,
                number: incident.getValue('number'),
                fee: incident.getValue('calculated_fee'),
                status: incident.getValue('state')
            };
        }
        
        response.setStatus(500);
        return { error: 'Failed to create incident' };
    } catch (error) {
        response.setStatus(500);
        return { error: error.message };
    }
}

export function getIncident(request, response) {
    try {
        const incidentId = request.queryParams.id;
        
        if (!incidentId) {
            response.setStatus(400);
            return { error: 'Incident ID required' };
        }

        const gr = new GlideRecord('x_1997678_acadreso_book_incident');
        if (gr.get(incidentId)) {
            return {
                id: gr.getValue('sys_id'),
                number: gr.getValue('number'),
                student_id: gr.getValue('student_id'),
                book_title: gr.getValue('book_title'),
                damage_type: gr.getValue('damage_type'),
                damage_level: gr.getValue('damage_level'),
                calculated_fee: gr.getValue('calculated_fee'),
                state: gr.getValue('state'),
                created_on: gr.getValue('sys_created_on'),
                attachments: getIncidentAttachments(gr.getValue('sys_id'))
            };
        }
        
        response.setStatus(404);
        return { error: 'Incident not found' };
    } catch (error) {
        response.setStatus(500);
        return { error: error.message };
    }
}

export function updateIncidentStatus(request, response) {
    try {
        const { incident_id, status, notes } = request.body;
        
        const gr = new GlideRecord('x_1997678_acadreso_book_incident');
        if (gr.get(incident_id)) {
            gr.setValue('state', status);
            gr.setValue('resolution_notes', notes || '');
            
            if (status === 'paid' || status === 'replaced') {
                gr.setValue('resolved_date', new GlideDateTime().toString());
            }
            
            gr.update();
            
            return {
                success: true,
                incident_id: gr.getValue('sys_id'),
                new_status: status
            };
        }
        
        response.setStatus(404);
        return { error: 'Incident not found' };
    } catch (error) {
        response.setStatus(500);
        return { error: error.message };
    }
}

export function listIncidents(request, response) {
    try {
        const studentId = request.queryParams.student_id;
        const state = request.queryParams.state;
        
        const gr = new GlideRecord('x_1997678_acadreso_book_incident');
        
        if (studentId) {
            gr.addQuery('student_id', studentId);
        }
        
        if (state) {
            gr.addQuery('state', state);
        }
        
        gr.orderByDesc('sys_created_on');
        gr.setLimit(100);
        gr.query();
        
        const incidents = [];
        while (gr.next()) {
            incidents.push({
                id: gr.getValue('sys_id'),
                number: gr.getValue('number'),
                book_title: gr.getValue('book_title'),
                damage_level: gr.getValue('damage_level'),
                calculated_fee: gr.getValue('calculated_fee'),
                state: gr.getValue('state'),
                created_on: gr.getValue('sys_created_on')
            });
        }
        
        return {
            count: incidents.length,
            incidents
        };
    } catch (error) {
        response.setStatus(500);
        return { error: error.message };
    }
}

// ============== FEE CALCULATION ==============

export function calculateFee(request, response) {
    try {
        const { damage_type, damage_level, book_value } = request.body;
        
        // Get fee schedule
        const schedule = new GlideRecord('x_1997678_acadreso_fee_schedule');
        schedule.addQuery('damage_type', damage_type);
        schedule.addQuery('damage_level', damage_level);
        schedule.query();
        
        if (schedule.next()) {
            const basePercent = parseFloat(schedule.getValue('fee_percentage'));
            const calculatedFee = book_value * (basePercent / 100);
            
            return {
                base_value: book_value,
                fee_percentage: basePercent,
                calculated_fee: calculatedFee.toFixed(2),
                fee_type: schedule.getValue('fee_type')
            };
        }
        
        // Default calculation
        return {
            base_value: book_value,
            calculated_fee: book_value.toFixed(2),
            fee_type: 'replacement_cost'
        };
    } catch (error) {
        response.setStatus(500);
        return { error: error.message };
    }
}

// ============== PAYMENT PROCESSING ==============

export function initiatePayment(request, response) {
    try {
        const { incident_id, payment_method } = request.body;
        
        const incident = new GlideRecord('x_1997678_acadreso_book_incident');
        if (!incident.get(incident_id)) {
            response.setStatus(404);
            return { error: 'Incident not found' };
        }
        
        // Call payment gateway API via Integration Hub
        const paymentResponse = integratePaymentGateway({
            amount: incident.getValue('calculated_fee'),
            student_id: incident.getValue('student_id'),
            incident_id: incident_id,
            method: payment_method
        });
        
        if (paymentResponse.success) {
            return {
                payment_initiated: true,
                transaction_id: paymentResponse.transaction_id,
                redirect_url: paymentResponse.redirect_url
            };
        }
        
        response.setStatus(500);
        return { error: 'Payment initiation failed' };
    } catch (error) {
        response.setStatus(500);
        return { error: error.message };
    }
}

// ============== APPROVAL WORKFLOW ==============

export function submitForApproval(request, response) {
    try {
        const { incident_id, approver_id } = request.body;
        
        const incident = new GlideRecord('x_1997678_acadreso_book_incident');
        if (incident.get(incident_id)) {
            incident.setValue('state', 'pending_approval');
            incident.update();
            
            // Create approval record
            const approval = new GlideRecord('x_1997678_acadreso_approval');
            approval.newRecord();
            approval.setValue('incident_id', incident_id);
            approval.setValue('approver_id', approver_id);
            approval.setValue('approval_status', 'pending');
            const approvalId = approval.insert();
            
            // Send approval email
            sendApprovalEmail(incident_id, approver_id);
            
            return {
                success: true,
                approval_id: approvalId,
                status: 'pending_approval'
            };
        }
        
        response.setStatus(404);
        return { error: 'Incident not found' };
    } catch (error) {
        response.setStatus(500);
        return { error: error.message };
    }
}

// ============== AI INTEGRATION (COPILOT) ==============

export function assessDisputeWithAI(request, response) {
    try {
        const { incident_id } = request.body;
        
        const incident = new GlideRecord('x_1997678_acadreso_book_incident');
        if (!incident.get(incident_id)) {
            response.setStatus(404);
            return { error: 'Incident not found' };
        }
        
        // Call Copilot API for assessment
        const aiAssessment = callCopilotAPI({
            description: incident.getValue('description'),
            damage_type: incident.getValue('damage_type'),
            book_value: incident.getValue('book_value'),
            damage_photos: getIncidentAttachments(incident_id)
        });
        
        // Store AI assessment
        incident.setValue('ai_assessment', aiAssessment.analysis);
        incident.setValue('recommended_damage_level', aiAssessment.predicted_damage_level);
        incident.setValue('recommended_fee', aiAssessment.predicted_fee);
        incident.update();
        
        return {
            success: true,
            assessment: aiAssessment.analysis,
            confidence_score: aiAssessment.confidence,
            recommended_damage_level: aiAssessment.predicted_damage_level,
            recommended_fee: aiAssessment.predicted_fee
        };
    } catch (error) {
        response.setStatus(500);
        return { error: error.message };
    }
}

// ============== UTILITY FUNCTIONS ==============

function getIncidentAttachments(incidentId) {
    const attachments = [];
    const att = new GlideRecord('sys_attachment');
    att.addQuery('table_name', 'x_1997678_acadreso_book_incident');
    att.addQuery('table_sys_id', incidentId);
    att.query();
    
    while (att.next()) {
        attachments.push({
            id: att.getValue('sys_id'),
            filename: att.getValue('file_name'),
            size: att.getValue('size'),
            url: `/api/now/attachment/${att.getValue('sys_id')}/file`
        });
    }
    
    return attachments;
}

function sendNotification(notificationType, recordId) {
    // Trigger notification event
    const eventName = `x_1997678_acadreso.${notificationType}`;
    gs.eventQueue(eventName, recordId, '');
}

function sendApprovalEmail(incidentId, approverId) {
    const event = 'x_1997678_acadreso.approval_requested';
    gs.eventQueue(event, incidentId, approverId);
}

function integratePaymentGateway(paymentData) {
    // Call Integration Hub - Payment Gateway connector
    // Returns payment transaction details
    return {
        success: true,
        transaction_id: 'TXN_' + Date.now(),
        redirect_url: 'https://payment-gateway.example.com/pay'
    };
}

function callCopilotAPI(disputeData) {
    // Call Copilot for AI assessment
    // Returns analysis and recommendations
    return {
        analysis: 'AI assessment of dispute based on description and photos',
        confidence: 0.95,
        predicted_damage_level: disputeData.damage_type === 'water_damage' ? 'high' : 'medium',
        predicted_fee: disputeData.book_value * 0.8
    };
}