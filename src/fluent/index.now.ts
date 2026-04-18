import '@servicenow/sdk/global'
import { Table, StringColumn, DateColumn, DecimalColumn, ReferenceColumn, DateTimeColumn, RestApi, Role } from '@servicenow/sdk/core'

// Import server functions
import { 
    createIncident, 
    getIncident, 
    updateIncidentStatus, 
    listIncidents, 
    calculateFee, 
    initiatePayment, 
    submitForApproval, 
    assessDisputeWithAI 
} from '../server/incident-service.js'

// Main book incident table
export const x_1997678_acadreso_book_incident = Table({
    name: 'x_1997678_acadreso_book_incident',
    label: 'Book Incident',
    schema: {
        number: StringColumn({
            label: 'Number',
            maxLength: 40,
            read_only: true
        }),
        student_id: StringColumn({
            label: 'Student ID',
            maxLength: 40,
            mandatory: true
        }),
        book_title: StringColumn({
            label: 'Book Title',
            maxLength: 200,
            mandatory: true
        }),
        book_isbn: StringColumn({
            label: 'Book ISBN',
            maxLength: 40
        }),
        book_value: DecimalColumn({
            label: 'Book Value',
            mandatory: true
        }),
        damage_type: StringColumn({
            label: 'Damage Type',
            choices: {
                water_damage: { label: 'Water Damage', sequence: 0 },
                torn_pages: { label: 'Torn Pages', sequence: 1 },
                missing_pages: { label: 'Missing Pages', sequence: 2 },
                lost: { label: 'Lost', sequence: 3 },
                other: { label: 'Other', sequence: 4 }
            }
        }),
        damage_level: StringColumn({
            label: 'Damage Level',
            choices: {
                low: { label: 'Low', sequence: 0 },
                medium: { label: 'Medium', sequence: 1 },
                high: { label: 'High', sequence: 2 },
                total: { label: 'Total Loss', sequence: 3 }
            }
        }),
        description: StringColumn({
            label: 'Description',
            maxLength: 4000
        }),
        incident_date: DateColumn({
            label: 'Incident Date'
        }),
        state: StringColumn({
            label: 'State',
            choices: {
                open: { label: 'Open', sequence: 0 },
                assessment: { label: 'In Assessment', sequence: 1 },
                pending_approval: { label: 'Pending Approval', sequence: 2 },
                approved: { label: 'Approved', sequence: 3 },
                paid: { label: 'Paid', sequence: 4 },
                replaced: { label: 'Replaced', sequence: 5 },
                closed: { label: 'Closed', sequence: 6 },
                disputed: { label: 'Disputed', sequence: 7 }
            },
            default: 'open'
        }),
        priority: StringColumn({
            label: 'Priority',
            choices: {
                '1': { label: '1 - Critical', sequence: 0 },
                '2': { label: '2 - High', sequence: 1 },
                '3': { label: '3 - Moderate', sequence: 2 },
                '4': { label: '4 - Low', sequence: 3 }
            },
            default: '3'
        }),
        calculated_fee: DecimalColumn({
            label: 'Calculated Fee',
            read_only: true
        }),
        resolution_notes: StringColumn({
            label: 'Resolution Notes',
            maxLength: 4000
        }),
        resolved_date: DateTimeColumn({
            label: 'Resolved Date'
        }),
        ai_assessment: StringColumn({
            label: 'AI Assessment',
            maxLength: 4000
        }),
        recommended_damage_level: StringColumn({
            label: 'AI Recommended Damage Level',
            maxLength: 40
        }),
        recommended_fee: DecimalColumn({
            label: 'AI Recommended Fee'
        })
    },
    auto_number: {
        prefix: 'INC',
        number: 1000,
        number_of_digits: 7
    }
})

// Fee schedule table
export const x_1997678_acadreso_fee_schedule = Table({
    name: 'x_1997678_acadreso_fee_schedule',
    label: 'Fee Schedule',
    schema: {
        damage_type: StringColumn({
            label: 'Damage Type',
            maxLength: 40,
            mandatory: true
        }),
        damage_level: StringColumn({
            label: 'Damage Level',
            maxLength: 40,
            mandatory: true
        }),
        fee_percentage: DecimalColumn({
            label: 'Fee Percentage',
            mandatory: true
        }),
        fee_type: StringColumn({
            label: 'Fee Type',
            choices: {
                percentage: { label: 'Percentage of Value', sequence: 0 },
                fixed: { label: 'Fixed Amount', sequence: 1 },
                replacement_cost: { label: 'Full Replacement Cost', sequence: 2 }
            }
        }),
        active: StringColumn({
            label: 'Active',
            choices: {
                'true': { label: 'True', sequence: 0 },
                'false': { label: 'False', sequence: 1 }
            },
            default: 'true'
        })
    }
})

// Approval table
export const x_1997678_acadreso_approval = Table({
    name: 'x_1997678_acadreso_approval',
    label: 'Book Incident Approval',
    schema: {
        incident_id: ReferenceColumn({
            label: 'Incident',
            referenceTable: 'x_1997678_acadreso_book_incident',
            mandatory: true
        }),
        approver_id: ReferenceColumn({
            label: 'Approver',
            referenceTable: 'sys_user',
            mandatory: true
        }),
        approval_status: StringColumn({
            label: 'Approval Status',
            choices: {
                pending: { label: 'Pending', sequence: 0 },
                approved: { label: 'Approved', sequence: 1 },
                rejected: { label: 'Rejected', sequence: 2 }
            },
            default: 'pending'
        }),
        approval_notes: StringColumn({
            label: 'Approval Notes',
            maxLength: 4000
        }),
        approval_date: DateTimeColumn({
            label: 'Approval Date'
        })
    }
})

// Roles
export const x_1997678_acadreso_admin = Role({
    $id: Now.ID['acadreso_admin_role'],
    name: 'x_1997678_acadreso.admin',
    description: 'Administrator role for Academic Resolve application',
    assignable_by: 'admin',
    can_delegate: false,
    elevated_privilege: false
})

export const x_1997678_acadreso_student = Role({
    $id: Now.ID['acadreso_student_role'],
    name: 'x_1997678_acadreso.student',
    description: 'Student role for Academic Resolve application',
    assignable_by: 'admin',
    can_delegate: false,
    elevated_privilege: false
})

export const x_1997678_acadreso_librarian = Role({
    $id: Now.ID['acadreso_librarian_role'],
    name: 'x_1997678_acadreso.librarian',
    description: 'Librarian role for Academic Resolve application',
    assignable_by: 'admin',
    can_delegate: false,
    elevated_privilege: false
})

// REST API
RestApi({
    $id: Now.ID['acadreso_api'],
    name: 'Academic Resolve API',
    service_id: 'x_1997678_acad_resolve',
    short_description: 'API for managing book incident reports and resolution',
    active: true,
    routes: [
        {
            $id: Now.ID['create_incident_route'],
            name: 'Create Incident',
            path: '/createIncident',
            method: 'POST',
            script: createIncident,
            short_description: 'Create a new book incident report'
        },
        {
            $id: Now.ID['get_incident_route'],
            name: 'Get Incident',
            path: '/getIncident',
            method: 'GET',
            script: getIncident,
            short_description: 'Retrieve a specific incident by ID'
        },
        {
            $id: Now.ID['update_incident_route'],
            name: 'Update Incident Status',
            path: '/updateIncidentStatus',
            method: 'POST',
            script: updateIncidentStatus,
            short_description: 'Update the status of an incident'
        },
        {
            $id: Now.ID['list_incidents_route'],
            name: 'List Incidents',
            path: '/listIncidents',
            method: 'GET',
            script: listIncidents,
            short_description: 'List incidents with optional filtering'
        },
        {
            $id: Now.ID['calculate_fee_route'],
            name: 'Calculate Fee',
            path: '/calculateFee',
            method: 'POST',
            script: calculateFee,
            short_description: 'Calculate fee for book damage'
        },
        {
            $id: Now.ID['initiate_payment_route'],
            name: 'Initiate Payment',
            path: '/initiatePayment',
            method: 'POST',
            script: initiatePayment,
            short_description: 'Initiate payment process for incident'
        },
        {
            $id: Now.ID['submit_approval_route'],
            name: 'Submit for Approval',
            path: '/submitForApproval',
            method: 'POST',
            script: submitForApproval,
            short_description: 'Submit incident for approval'
        },
        {
            $id: Now.ID['ai_assessment_route'],
            name: 'AI Assessment',
            path: '/assessDisputeWithAI',
            method: 'POST',
            script: assessDisputeWithAI,
            short_description: 'Get AI assessment for dispute resolution'
        }
    ]
})