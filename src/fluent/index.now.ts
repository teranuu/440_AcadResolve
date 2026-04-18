import { FieldAccessLevel, ObjectResponse } from '@servicenow/sdk/lib/types';
import { GlideRecord, GlideQuery } from '@servicenow/glide';

/**
 * Academic Book Dispute Resolution - Main API Routes
 * Handles all backend operations for lost/damaged book incidents
 */

// ============== INCIDENT MANAGEMENT ==============

export async function createIncident(request: any, response: any) {
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
        const gr = new GlideRecord('x_1997678_acad_resolve_book_incident');
        gr.newRecord();
        gr.student_id = incidentData.student_id;
        gr.book_title = incidentData.book_title;
        gr.book_isbn = incidentData.book_isbn || '';
        gr.damage_type = incidentData.damage_type;
        gr.damage_level = incidentData.damage_level;
        gr.description = incidentData.description;
        gr.incident_date = incidentData.incident_date;
        gr.state = 'open';
        gr.priority = '3';
        
        const sysId = gr.insert();
        
        if (sysId) {
            // Trigger notification
            sendNotification('incident_created', sysId);
            
            // Calculate fee via business rule
            const incident = new GlideRecord('x_1997678_acad_resolve_book_incident');
            incident.get(sysId);
            
            response.setStatus(201);
            return {
                success: true,
                incident_id: sysId,
                number: incident.number,
                fee: incident.calculated_fee,
                status: incident.state
            };
        }
        
        response.setStatus(500);
        return { error: 'Failed to create incident' };
    } catch (error) {
        response.setStatus(500);
        return { error: error.message };
    }
}

export async function getIncident(request: any, response: any) {
    try {
        const incidentId = request.queryParams.id;
        
        if (!incidentId) {
            response.setStatus(400);
            return { error: 'Incident ID required' };
        }

        const gr = new GlideRecord('x_1997678_acad_resolve_book_incident');
        if (gr.get(incidentId)) {
            return {
                id: gr.sys_id,
                number: gr.number,
                student_id: gr.student_id,
                book_title: gr.book_title,
                damage_type: gr.damage_type,
                damage_level: gr.damage_level,
                calculated_fee: gr.calculated_fee,
                state: gr.state,
                created_on: gr.sys_created_on,
                attachments: getIncidentAttachments(gr.sys_id)
            };
        }
        
        response.setStatus(404);
        return { error: 'Incident not found' };
    } catch (error) {
        response.setStatus(500);
        return { error: error.message };
    }
}

export async function updateIncidentStatus(request: any, response: any) {
    try {
        const { incident_id, status, notes } = request.body;
        
        const gr = new GlideRecord('x_1997678_acad_resolve_book_incident');
        if (gr.get(incident_id)) {
            gr.state = status;
            gr.resolution_notes = notes || '';
            
            if (status === 'paid' || status === 'replaced') {
                gr.resolved_date = new GlideDateTime().toString();
            }
            
            gr.update();
            
            return {
                success: true,
                incident_id: gr.sys_id,
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

export async function listIncidents(request: any, response: any) {
    try {
        const studentId = request.queryParams.student_id;
        const state = request.queryParams.state;
        
        const gr = new GlideQuery('x_1997678_acad_resolve_book_incident');
        
        if (studentId) {
            gr.where('student_id', studentId);
        }
        
        if (state) {
            gr.where('state', state);
        }
        
        gr.orderBy('sys_created_on', 'DESC').limit(100);
        
        const incidents = [];
        for (const record of gr.select()) {
            incidents.push({
                id: record.sys_id,
                number: record.number,
                book_title: record.book_title,
                damage_level: record.damage_level,
                calculated_fee: record.calculated_fee,
                state: record.state,
                created_on: record.sys_created_on
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

export async function calculateFee(request: any, response: any) {
    try {
        const { damage_type, damage_level, book_value } = request.body;
        
        // Get fee schedule
        const schedule = new GlideRecord('x_1997678_acad_resolve_fee_schedule');
        schedule.addQuery('damage_type', damage_type);
        schedule.addQuery('damage_level', damage_level);
        schedule.query();
        
        if (schedule.next()) {
            const basePercent = parseFloat(schedule.fee_percentage);
            const calculatedFee = book_value * (basePercent / 100);
            
            return {
                base_value: book_value,
                fee_percentage: basePercent,
                calculated_fee: calculatedFee.toFixed(2),
                fee_type: schedule.fee_type
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

export async function initiatePayment(request: any, response: any) {
    try {
        const { incident_id, payment_method } = request.body;
        
        const incident = new GlideRecord('x_1997678_acad_resolve_book_incident');
        if (!incident.get(incident_id)) {
            response.setStatus(404);
            return { error: 'Incident not found' };
        }
        
        // Call payment gateway API via Integration Hub
        const paymentResponse = await integratePaymentGateway({
            amount: incident.calculated_fee,
            student_id: incident.student_id,
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

export async function submitForApproval(request: any, response: any) {
    try {
        const { incident_id, approver_id } = request.body;
        
        const incident = new GlideRecord('x_1997678_acad_resolve_book_incident');
        if (incident.get(incident_id)) {
            incident.state = 'pending_approval';
            incident.update();
            
            // Create approval record
            const approval = new GlideRecord('x_1997678_acad_resolve_approval');
            approval.newRecord();
            approval.incident_id = incident_id;
            approval.approver_id = approver_id;
            approval.approval_status = 'pending';
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

export async function assessDisputeWithAI(request: any, response: any) {
    try {
        const { incident_id } = request.body;
        
        const incident = new GlideRecord('x_1997678_acad_resolve_book_incident');
        if (!incident.get(incident_id)) {
            response.setStatus(404);
            return { error: 'Incident not found' };
        }
        
        // Call Copilot API for assessment
        const aiAssessment = await callCopilotAPI({
            description: incident.description,
            damage_type: incident.damage_type,
            book_value: incident.book_value,
            damage_photos: getIncidentAttachments(incident_id)
        });
        
        // Store AI assessment
        incident.ai_assessment = aiAssessment.analysis;
        incident.recommended_damage_level = aiAssessment.predicted_damage_level;
        incident.recommended_fee = aiAssessment.predicted_fee;
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

function getIncidentAttachments(incidentId: string): string[] {
    const attachments = [];
    const att = new GlideRecord('sys_attachment');
    att.addQuery('table_name', 'x_1997678_acad_resolve_book_incident');
    att.addQuery('table_sys_id', incidentId);
    att.query();
    
    while (att.next()) {
        attachments.push({
            id: att.sys_id,
            filename: att.file_name,
            size: att.size,
            url: `/api/now/attachment/${att.sys_id}/file`
        });
    }
    
    return attachments;
}

function sendNotification(notificationType: string, recordId: string): void {
    // Trigger notification event
    const eventName = `x_1997678_acad_resolve.${notificationType}`;
    gs.eventQueue(eventName, recordId, '');
}

function sendApprovalEmail(incidentId: string, approverId: string): void {
    const event = 'x_1997678_acad_resolve.approval_requested';
    gs.eventQueue(event, incidentId, approverId);
}

async function integratePaymentGateway(paymentData: any): Promise<any> {
    // Call Integration Hub - Payment Gateway connector
    // Returns payment transaction details
    return {
        success: true,
        transaction_id: 'TXN_' + Date.now(),
        redirect_url: 'https://payment-gateway.example.com/pay'
    };
}

async function callCopilotAPI(disputeData: any): Promise<any> {
    // Call Copilot for AI assessment
    // Returns analysis and recommendations
    return {
        analysis: 'AI assessment of dispute based on description and photos',
        confidence: 0.95,
        predicted_damage_level: disputeData.damage_type === 'water_damage' ? 'high' : 'medium',
        predicted_fee: disputeData.book_value * 0.8
    };
}

export const GlideDateTime = class {
    toString(): string {
        return new Date().toISOString();
    }
};
