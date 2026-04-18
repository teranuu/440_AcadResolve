import '@servicenow/sdk/global'
import { RestApi } from '@servicenow/sdk/core'
import {
    createIncident,
    getIncident,
    updateIncidentStatus,
    listIncidents,
    calculateFee,
    initiatePayment,
    submitForApproval,
    assessDisputeWithAI
} from '../../server/academic-resolve-api.js'

RestApi({
    $id: Now.ID['acadresolve_api'],
    name: 'Academic Resolve API',
    service_id: 'acadresolve',
    short_description: 'REST API for managing book incidents and dispute resolution',
    enforce_acl: [],
    routes: [
        {
            $id: Now.ID['create_incident_route'],
            name: 'Create Incident',
            path: '/incidents',
            method: 'POST',
            script: createIncident,
            short_description: 'Create a new book incident'
        },
        {
            $id: Now.ID['get_incident_route'],
            name: 'Get Incident',
            path: '/incidents/{id}',
            method: 'GET',
            script: getIncident,
            short_description: 'Get incident by ID'
        },
        {
            $id: Now.ID['list_incidents_route'],
            name: 'List Incidents',
            path: '/incidents',
            method: 'GET',
            script: listIncidents,
            short_description: 'List incidents with optional filtering'
        },
        {
            $id: Now.ID['update_incident_route'],
            name: 'Update Incident Status',
            path: '/incidents/status',
            method: 'PUT',
            script: updateIncidentStatus,
            short_description: 'Update incident status'
        },
        {
            $id: Now.ID['calculate_fee_route'],
            name: 'Calculate Fee',
            path: '/fees/calculate',
            method: 'POST',
            script: calculateFee,
            short_description: 'Calculate fee based on damage type and level'
        },
        {
            $id: Now.ID['initiate_payment_route'],
            name: 'Initiate Payment',
            path: '/payments/initiate',
            method: 'POST',
            script: initiatePayment,
            short_description: 'Initiate payment process'
        },
        {
            $id: Now.ID['submit_approval_route'],
            name: 'Submit for Approval',
            path: '/approvals/submit',
            method: 'POST',
            script: submitForApproval,
            short_description: 'Submit incident for approval'
        },
        {
            $id: Now.ID['ai_assessment_route'],
            name: 'AI Assessment',
            path: '/ai/assess',
            method: 'POST',
            script: assessDisputeWithAI,
            short_description: 'Perform AI assessment of dispute'
        }
    ]
})