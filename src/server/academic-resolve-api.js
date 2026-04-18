/**
 * Academic Resolve API Server Functions
 * Server-side functions for managing book incidents and dispute resolution
 */

import { gs, GlideRecord } from '@servicenow/glide'

// Utility: Get incident by ID
export function getIncidentRecord(incidentId) {
    const gr = new GlideRecord('x_1997678_acadreso_book_incident')
    if (gr.get(incidentId)) {
        return gr
    }
    return null
}

// Utility: Get fee schedule
export function getFeeSchedule(damageType, damageLevel) {
    const gr = new GlideRecord('x_1997678_acadreso_fee_schedule')
    gr.addQuery('damage_type', damageType)
    gr.addQuery('damage_level', damageLevel)
    gr.addQuery('active', true)
    gr.query()
    return gr.hasNext() ? gr.next() : null
}

// API: Create Incident
export function createIncident(request, response) {
    try {
        // Parse request body - handle both direct object and wrapped data
        let data = request.body?.data || request.body || {}
        
        // If body is a string, parse it as JSON
        if (typeof data === 'string') {
            data = JSON.parse(data)
        }
        
        // Validate required fields
        if (!data.student_id || !data.book_title || !data.damage_type || !data.book_value) {
            response.setStatus(400)
            response.setBody({ error: 'Missing required fields: student_id, book_title, damage_type, book_value' })
            return
        }

        // Create incident record
        const gr = new GlideRecord('x_1997678_acadreso_book_incident')
        gr.initialize()
        gr.student_id = data.student_id
        gr.book_title = data.book_title
        gr.book_isbn = data.book_isbn || ''
        gr.book_value = data.book_value
        gr.damage_type = data.damage_type
        gr.damage_level = data.damage_level
        gr.incident_date = data.incident_date || new GlideDateTime().getDisplayValue()
        gr.description = data.description || ''
        gr.state = 'open'
        
        const sysId = gr.insert()
        
        // Get the created record to return full details
        const createdRecord = new GlideRecord('x_1997678_acadreso_book_incident')
        createdRecord.get(sysId)

        response.setStatus(201)
        response.setBody({ 
            sys_id: sysId,
            incident_id: sysId,
            number: createdRecord.number,
            status: 'created'
        })
    } catch (err) {
        response.setStatus(500)
        response.setBody({ error: String(err) })
    }
}

// API: Get Incident
export function getIncident(request, response) {
    try {
        // Get incident ID from path parameter {id}
        const incidentId = request.pathParams?.id || request.queryParams?.id
        if (!incidentId) {
            response.setStatus(400)
            response.setBody({ error: 'Incident ID required' })
            return
        }

        const gr = getIncidentRecord(incidentId)
        if (!gr) {
            response.setStatus(404)
            response.setBody({ error: 'Incident not found' })
            return
        }

        response.setStatus(200)
        response.setBody({
            sys_id: gr.sys_id,
            incident_id: gr.sys_id,
            number: gr.number,
            student_id: gr.student_id,
            book_title: gr.book_title,
            book_isbn: gr.book_isbn,
            book_value: gr.book_value,
            damage_type: gr.damage_type,
            damage_level: gr.damage_level,
            calculated_fee: gr.calculated_fee,
            state: gr.state,
            description: gr.description,
            incident_date: gr.incident_date,
            created_on: gr.created_on
        })
    } catch (err) {
        response.setStatus(500)
        response.setBody({ error: String(err) })
    }
}

// API: Update Incident Status
export function updateIncidentStatus(request, response) {
    try {
        const data = request.body?.data || {}
        const incidentId = data.incident_id
        
        if (!incidentId || !data.state) {
            response.setStatus(400)
            response.setBody({ error: 'Incident ID and state required' })
            return
        }

        const gr = getIncidentRecord(incidentId)
        if (!gr) {
            response.setStatus(404)
            response.setBody({ error: 'Incident not found' })
            return
        }

        gr.state = data.state
        if (data.state === 'paid' || data.state === 'replaced') {
            gr.resolved_date = new GlideDateTime().getDisplayValue()
        }
        gr.update()

        response.setStatus(200)
        response.setBody({ 
            incident_id: incidentId,
            state: data.state,
            status: 'updated'
        })
    } catch (err) {
        response.setStatus(500)
        response.setBody({ error: String(err) })
    }
}

// API: List Incidents
export function listIncidents(request, response) {
    try {
        const studentId = request.queryParams?.student_id
        const state = request.queryParams?.state
        const limit = parseInt(request.queryParams?.limit || '100')

        const gr = new GlideRecord('x_1997678_acadreso_book_incident')
        
        if (studentId) {
            gr.addQuery('student_id', studentId)
        }
        if (state) {
            gr.addQuery('state', state)
        }
        
        gr.orderByDesc('sys_created_on')
        gr.setLimit(limit)
        gr.query()

        const incidents = []
        while (gr.hasNext()) {
            const record = gr.next()
            incidents.push({
                sys_id: record.sys_id,
                incident_id: record.sys_id,
                number: record.number,
                student_id: record.student_id,
                book_title: record.book_title,
                book_isbn: record.book_isbn,
                damage_type: record.damage_type,
                damage_level: record.damage_level,
                calculated_fee: record.calculated_fee,
                state: record.state,
                created_on: record.sys_created_on,
                description: record.description,
                book_value: record.book_value
            })
        }

        response.setStatus(200)
        response.setBody({
            incidents: incidents,
            count: incidents.length
        })
    } catch (err) {
        response.setStatus(500)
        response.setBody({ error: String(err) })
    }
}

// API: Calculate Fee
export function calculateFee(request, response) {
    try {
        const data = request.body?.data || {}
        const { damage_type, damage_level, book_value } = data

        if (!damage_type || !damage_level || !book_value) {
            response.setStatus(400)
            response.setBody({ error: 'Missing required fields' })
            return
        }

        const feeSchedule = getFeeSchedule(damage_type, damage_level)
        if (!feeSchedule) {
            response.setStatus(404)
            response.setBody({ error: 'Fee schedule not found' })
            return
        }

        const feePercentage = parseFloat(feeSchedule.fee_percentage)
        const calculatedFee = (book_value * feePercentage) / 100

        response.setStatus(200)
        response.setBody({
            damage_type: damage_type,
            damage_level: damage_level,
            book_value: book_value,
            fee_percentage: feePercentage,
            calculated_fee: calculatedFee
        })
    } catch (err) {
        response.setStatus(500)
        response.setBody({ error: String(err) })
    }
}

// API: Initiate Payment
export function initiatePayment(request, response) {
    try {
        const data = request.body?.data || {}
        const { incident_id, payment_method } = data

        if (!incident_id || !payment_method) {
            response.setStatus(400)
            response.setBody({ error: 'Incident ID and payment method required' })
            return
        }

        const gr = getIncidentRecord(incident_id)
        if (!gr) {
            response.setStatus(404)
            response.setBody({ error: 'Incident not found' })
            return
        }

        // Generate payment transaction ID
        const transactionId = 'TXN_' + gs.generateGUID()
        gr.payment_gateway_id = transactionId
        gr.payment_status = 'processing'
        gr.update()

        response.setStatus(200)
        response.setBody({
            transaction_id: transactionId,
            incident_id: incident_id,
            amount: gr.calculated_fee,
            payment_method: payment_method,
            redirect_url: '/payment_portal?transaction=' + transactionId
        })
    } catch (err) {
        response.setStatus(500)
        response.setBody({ error: String(err) })
    }
}

// API: Submit for Approval
export function submitForApproval(request, response) {
    try {
        const data = request.body?.data || {}
        const { incident_id, approver_id } = data

        if (!incident_id || !approver_id) {
            response.setStatus(400)
            response.setBody({ error: 'Incident ID and approver ID required' })
            return
        }

        const gr = getIncidentRecord(incident_id)
        if (!gr) {
            response.setStatus(404)
            response.setBody({ error: 'Incident not found' })
            return
        }

        // Create approval record
        const approvalGr = new GlideRecord('x_1997678_acadreso_approval')
        approvalGr.initialize()
        approvalGr.incident_id = incident_id
        approvalGr.approver_id = approver_id
        approvalGr.approval_status = 'pending'
        const approvalId = approvalGr.insert()

        // Update incident status
        gr.state = 'pending_approval'
        gr.update()

        response.setStatus(200)
        response.setBody({
            approval_id: approvalId,
            incident_id: incident_id,
            status: 'submitted_for_approval'
        })
    } catch (err) {
        response.setStatus(500)
        response.setBody({ error: String(err) })
    }
}

// API: AI Assessment
export function assessDisputeWithAI(request, response) {
    try {
        const data = request.body?.data || {}
        const { incident_id } = data

        if (!incident_id) {
            response.setStatus(400)
            response.setBody({ error: 'Incident ID required' })
            return
        }

        const gr = getIncidentRecord(incident_id)
        if (!gr) {
            response.setStatus(404)
            response.setBody({ error: 'Incident not found' })
            return
        }

        // Placeholder AI assessment (would call Copilot API in production)
        const assessment = 'AI Assessment: Damage level appears consistent with description. Recommended fee: ' + gr.calculated_fee

        gr.ai_assessment = assessment
        gr.recommended_damage_level = gr.damage_level
        gr.recommended_fee = gr.calculated_fee
        gr.update()

        response.setStatus(200)
        response.setBody({
            incident_id: incident_id,
            assessment: assessment,
            recommended_damage_level: gr.damage_level,
            recommended_fee: gr.calculated_fee,
            confidence_score: 0.85
        })
    } catch (err) {
        response.setStatus(500)
        response.setBody({ error: String(err) })
    }
}