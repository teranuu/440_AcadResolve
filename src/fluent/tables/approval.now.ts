import '@servicenow/sdk/global'
import { Table, StringColumn, DateTimeColumn, ChoiceColumn, ReferenceColumn } from '@servicenow/sdk/core'

// Approval Table - tracks approval requests for incidents
export const x_1997678_acadreso_approval = Table({
    name: 'x_1997678_acadreso_approval',
    label: 'Incident Approval',
    schema: {
        incident_id: ReferenceColumn({
            label: 'Incident',
            referenceTable: 'x_1997678_acadreso_book_incident',
            mandatory: true
        }),
        approver_id: StringColumn({
            label: 'Approver ID',
            maxLength: 40,
            mandatory: true
        }),
        approval_status: ChoiceColumn({
            label: 'Approval Status',
            default: 'pending',
            dropdown: 'dropdown_with_none',
            choices: {
                pending: { label: 'Pending', sequence: 10 },
                approved: { label: 'Approved', sequence: 20 },
                rejected: { label: 'Rejected', sequence: 30 },
                cancelled: { label: 'Cancelled', sequence: 40 }
            }
        }),
        approval_date: DateTimeColumn({
            label: 'Approval Date'
        }),
        comments: StringColumn({
            label: 'Comments',
            maxLength: 1000
        })
    },
    display: 'incident_id',
    allow_web_service_access: true,
    actions: ['create', 'read', 'update', 'delete']
})