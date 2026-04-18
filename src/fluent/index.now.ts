/**
 * Academic Resolve API
 * REST API endpoints for managing book incidents and dispute resolution
 */

// Type declarations for ServiceNow globals
declare class GlideRecord {
    constructor(tableName: string)
    initialize(): void
    get(sysId: string): boolean
    insert(): string
    update(): void
    query(): void
    hasNext(): boolean
    next(): GlideRecord
    addQuery(field: string, value: any): void
    orderByDesc(field: string): void
    setLimit(limit: number): void
    [key: string]: any
}

declare const gs: {
    getUniqueValue(): string
}

// Utility: Get incident by ID
function getIncidentRecord(incidentId: string) {
    const gr = new GlideRecord('x_1997678_acadreso_book_incident')
    if (gr.get(incidentId)) {
        return gr
    }
    return null
}

// Utility: Get fee schedule
function getFeeSchedule(damageType: string, damageLevel: string) {
    const gr = new GlideRecord('x_1997678_acadreso_fee_schedule')
    gr.addQuery('damage_type', damageType)
    gr.addQuery('damage_level', damageLevel)
    gr.addQuery('active', true)
    gr.query()
    return gr.hasNext() ? gr.next() : null
}

// API: Create Incident
export function createIncident(request: any) {
    try {
        const data = request.body?.data || {}
        
        // Validate required fields
        if (!data.student_id || !data.book_title || !data.damage_type || !data.book_value) {
            return {
                status: 400,
                body: { error: 'Missing required fields' }
            }
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
        gr.incident_date = data.incident_date || new Date().toISOString()
        gr.description = data.description || ''
        gr.state = 'open'
        
        const sysId = gr.insert()

        return {
            status: 201,
            body: { 
                incident_id: sysId,
                number: gr.number,
                status: 'created'
            }
        }
    } catch (err) {
        return {
            status: 500,
            body: { error: String(err) }
        }
    }
}

// API: Get Incident
export function getIncident(request: any) {
    try {
        const incidentId = request.queryParams?.id
        if (!incidentId) {
            return {
                status: 400,
                body: { error: 'Incident ID required' }
            }
        }

        const gr = getIncidentRecord(incidentId)
        if (!gr) {
            return {
                status: 404,
                body: { error: 'Incident not found' }
            }
        }

        return {
            status: 200,
            body: {
                incident_id: gr.sys_id,
                number: gr.number,
                student_id: gr.student_id,
                book_title: gr.book_title,
                book_value: gr.book_value,
                damage_type: gr.damage_type,
                damage_level: gr.damage_level,
                calculated_fee: gr.calculated_fee,
                state: gr.state,
                description: gr.description,
                incident_date: gr.incident_date
            }
        }
    } catch (err) {
        return {
            status: 500,
            body: { error: String(err) }
        }
    }
}

// API: Update Incident Status
export function updateIncidentStatus(request: any) {
    try {
        const data = request.body?.data || {}
        const incidentId = data.incident_id
        
        if (!incidentId || !data.state) {
            return {
                status: 400,
                body: { error: 'Incident ID and state required' }
            }
        }

        const gr = getIncidentRecord(incidentId)
        if (!gr) {
            return {
                status: 404,
                body: { error: 'Incident not found' }
            }
        }

        gr.state = data.state
        if (data.state === 'paid' || data.state === 'replaced') {
            gr.resolved_date = new Date().toISOString()
        }
        gr.update()

        return {
            status: 200,
            body: { 
                incident_id: incidentId,
                state: data.state,
                status: 'updated'
            }
        }
    } catch (err) {
        return {
            status: 500,
            body: { error: String(err) }
        }
    }
}

// API: List Incidents
export function listIncidents(request: any) {
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
                incident_id: record.sys_id,
                number: record.number,
                student_id: record.student_id,
                book_title: record.book_title,
                damage_type: record.damage_type,
                damage_level: record.damage_level,
                calculated_fee: record.calculated_fee,
                state: record.state,
                created_date: record.sys_created_on
            })
        }

        return {
            status: 200,
            body: {
                incidents: incidents,
                count: incidents.length
            }
        }
    } catch (err) {
        return {
            status: 500,
            body: { error: String(err) }
        }
    }
}

// API: Calculate Fee
export function calculateFee(request: any) {
    try {
        const data = request.body?.data || {}
        const { damage_type, damage_level, book_value } = data

        if (!damage_type || !damage_level || !book_value) {
            return {
                status: 400,
                body: { error: 'Missing required fields' }
            }
        }

        const feeSchedule = getFeeSchedule(damage_type, damage_level)
        if (!feeSchedule) {
            return {
                status: 404,
                body: { error: 'Fee schedule not found' }
            }
        }

        const feePercentage = parseFloat(feeSchedule.fee_percentage)
        const calculatedFee = (book_value * feePercentage) / 100

        return {
            status: 200,
            body: {
                damage_type: damage_type,
                damage_level: damage_level,
                book_value: book_value,
                fee_percentage: feePercentage,
                calculated_fee: calculatedFee
            }
        }
    } catch (err) {
        return {
            status: 500,
            body: { error: String(err) }
        }
    }
}

// API: Initiate Payment
export function initiatePayment(request: any) {
    try {
        const data = request.body?.data || {}
        const { incident_id, payment_method } = data

        if (!incident_id || !payment_method) {
            return {
                status: 400,
                body: { error: 'Incident ID and payment method required' }
            }
        }

        const gr = getIncidentRecord(incident_id)
        if (!gr) {
            return {
                status: 404,
                body: { error: 'Incident not found' }
            }
        }

        // Generate payment transaction ID
        const transactionId = 'TXN_' + gs.getUniqueValue()
        gr.payment_gateway_id = transactionId
        gr.payment_status = 'processing'
        gr.update()

        return {
            status: 200,
            body: {
                transaction_id: transactionId,
                incident_id: incident_id,
                amount: gr.calculated_fee,
                payment_method: payment_method,
                redirect_url: '/payment_portal?transaction=' + transactionId
            }
        }
    } catch (err) {
        return {
            status: 500,
            body: { error: String(err) }
        }
    }
}

// API: Submit for Approval
export function submitForApproval(request: any) {
    try {
        const data = request.body?.data || {}
        const { incident_id, approver_id } = data

        if (!incident_id || !approver_id) {
            return {
                status: 400,
                body: { error: 'Incident ID and approver ID required' }
            }
        }

        const gr = getIncidentRecord(incident_id)
        if (!gr) {
            return {
                status: 404,
                body: { error: 'Incident not found' }
            }
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

        return {
            status: 200,
            body: {
                approval_id: approvalId,
                incident_id: incident_id,
                status: 'submitted_for_approval'
            }
        }
    } catch (err) {
        return {
            status: 500,
            body: { error: String(err) }
        }
    }
}

// API: AI Assessment
export function assessDisputeWithAI(request: any) {
    try {
        const data = request.body?.data || {}
        const { incident_id } = data

        if (!incident_id) {
            return {
                status: 400,
                body: { error: 'Incident ID required' }
            }
        }

        const gr = getIncidentRecord(incident_id)
        if (!gr) {
            return {
                status: 404,
                body: { error: 'Incident not found' }
            }
        }

        // Placeholder AI assessment (would call Copilot API in production)
        const assessment = 'AI Assessment: Damage level appears consistent with description. Recommended fee: ' + gr.calculated_fee

        gr.ai_assessment = assessment
        gr.recommended_damage_level = gr.damage_level
        gr.recommended_fee = gr.calculated_fee
        gr.update()

        return {
            status: 200,
            body: {
                incident_id: incident_id,
                assessment: assessment,
                recommended_damage_level: gr.damage_level,
                recommended_fee: gr.calculated_fee,
                confidence_score: 0.85
            }
        }
    } catch (err) {
        return {
            status: 500,
            body: { error: String(err) }
        }
    }
}