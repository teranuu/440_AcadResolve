/**
 * Academic Resolve Incidents API
 * Fluent SDK compatible endpoint for incident operations
 */

import { gs, GlideRecord } from '@servicenow/glide'

export function listIncidents(request: any, response: any): void {
    const limit = 100
    const gr = new GlideRecord('x_1997678_acadreso_book_incident')
    gr.setLimit(limit)
    gr.query()

    const incidents: any[] = []
    while (gr.next()) {
        incidents.push({
            sys_id: gr.getUniqueValue(),
            number: gr.getValue('number'),
            student_id: gr.getValue('student_id'),
            book_title: gr.getValue('book_title'),
            damage_type: gr.getValue('damage_type'),
            damage_level: gr.getValue('damage_level'),
            state: gr.getValue('state'),
            calculated_fee: gr.getValue('calculated_fee'),
            created_on: gr.getValue('sys_created_on')
        })
    }

    response.setStatus(200)
    response.setBody({ incidents })
}

export function getIncident(request: any, response: any): void {
    const incidentId = request.queryParams?.id
    const gr = new GlideRecord('x_1997678_acadreso_book_incident')
    
    if (gr.get(incidentId)) {
        response.setStatus(200)
        response.setBody({
            sys_id: gr.getUniqueValue(),
            number: gr.getValue('number'),
            student_id: gr.getValue('student_id'),
            book_title: gr.getValue('book_title'),
            damage_type: gr.getValue('damage_type'),
            damage_level: gr.getValue('damage_level'),
            state: gr.getValue('state'),
            calculated_fee: gr.getValue('calculated_fee'),
            created_on: gr.getValue('sys_created_on')
        })
    } else {
        response.setStatus(404)
        response.setBody({ message: 'Incident not found' })
    }
}
