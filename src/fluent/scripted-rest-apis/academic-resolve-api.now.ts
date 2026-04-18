import '@servicenow/sdk/global'

// Type declaration for RestApi builder
declare function RestApi(config: any): any

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
    name: 'Academic Resolve API',
    service_id: 'acadresolve',
    short_description: 'REST API for managing book incidents and dispute resolution',
    enforce_acl: [],
    routes: [
        {
            name: 'Create Incident',
            path: '/incidents',
            method: 'POST',
            script: createIncident,
            short_description: 'Create a new book incident'
        },
        {
            name: 'Get Incident',
            path: '/incidents/{id}',
            method: 'GET',
            script: getIncident,
            short_description: 'Get incident by ID'
        },
        {
            name: 'List Incidents',
            path: '/incidents',
            method: 'GET',
            script: listIncidents,
            short_description: 'List incidents with optional filtering'
        },
        {
            name: 'Update Incident Status',
            path: '/incidents/status',
            method: 'PUT',
            script: updateIncidentStatus,
            short_description: 'Update incident status'
        },
        {
            name: 'Calculate Fee',
            path: '/fees/calculate',
            method: 'POST',
            script: calculateFee,
            short_description: 'Calculate fee based on damage type and level'
        },
        {
            name: 'Initiate Payment',
            path: '/payments/initiate',
            method: 'POST',
            script: initiatePayment,
            short_description: 'Initiate payment process'
        },
        {
            name: 'Submit for Approval',
            path: '/approvals/submit',
            method: 'POST',
            script: submitForApproval,
            short_description: 'Submit incident for approval'
        },
        {
            name: 'AI Assessment',
            path: '/ai/assess',
            method: 'POST',
            script: assessDisputeWithAI,
            short_description: 'Perform AI assessment of dispute'
        }
    ]
})