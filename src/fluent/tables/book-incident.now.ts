import '@servicenow/sdk/global'
import { Table, StringColumn, DecimalColumn, DateTimeColumn, ChoiceColumn } from '@servicenow/sdk/core'

// Book Incident Table - tracks damaged or lost books
export const x_1997678_acadreso_book_incident = Table({
    name: 'x_1997678_acadreso_book_incident',
    label: 'Book Incident',
    schema: {
        number: StringColumn({
            label: 'Number',
            maxLength: 40,
            read_only: true,
            default: 'javascript:global.getNextObjNumberPadded();'
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
            maxLength: 20
        }),
        book_value: DecimalColumn({
            label: 'Book Value',
            mandatory: true
        }),
        damage_type: ChoiceColumn({
            label: 'Damage Type',
            mandatory: true,
            dropdown: 'dropdown_with_none',
            choices: {
                lost: { label: 'Lost', sequence: 10 },
                damaged: { label: 'Damaged', sequence: 20 },
                torn_pages: { label: 'Torn Pages', sequence: 30 },
                water_damage: { label: 'Water Damage', sequence: 40 },
                writing: { label: 'Writing/Markings', sequence: 50 },
                missing_pages: { label: 'Missing Pages', sequence: 60 },
                cover_damage: { label: 'Cover Damage', sequence: 70 }
            }
        }),
        damage_level: ChoiceColumn({
            label: 'Damage Level',
            mandatory: true,
            dropdown: 'dropdown_with_none',
            choices: {
                minor: { label: 'Minor', sequence: 10 },
                moderate: { label: 'Moderate', sequence: 20 },
                major: { label: 'Major', sequence: 30 },
                total_loss: { label: 'Total Loss', sequence: 40 }
            }
        }),
        calculated_fee: DecimalColumn({
            label: 'Calculated Fee',
            read_only: true
        }),
        state: ChoiceColumn({
            label: 'State',
            default: 'open',
            dropdown: 'dropdown_with_none',
            choices: {
                open: { label: 'Open', sequence: 10 },
                pending_approval: { label: 'Pending Approval', sequence: 20 },
                approved: { label: 'Approved', sequence: 30 },
                paid: { label: 'Paid', sequence: 40 },
                replaced: { label: 'Replaced', sequence: 50 },
                disputed: { label: 'Disputed', sequence: 60 },
                closed: { label: 'Closed', sequence: 70 }
            }
        }),
        description: StringColumn({
            label: 'Description',
            maxLength: 1000
        }),
        incident_date: DateTimeColumn({
            label: 'Incident Date',
            default: 'javascript:new GlideDateTime().getDisplayValue()'
        }),
        resolved_date: DateTimeColumn({
            label: 'Resolved Date'
        }),
        payment_gateway_id: StringColumn({
            label: 'Payment Gateway ID',
            maxLength: 100
        }),
        payment_status: ChoiceColumn({
            label: 'Payment Status',
            dropdown: 'dropdown_with_none',
            choices: {
                pending: { label: 'Pending', sequence: 10 },
                processing: { label: 'Processing', sequence: 20 },
                completed: { label: 'Completed', sequence: 30 },
                failed: { label: 'Failed', sequence: 40 }
            }
        }),
        ai_assessment: StringColumn({
            label: 'AI Assessment',
            maxLength: 2000
        }),
        recommended_damage_level: StringColumn({
            label: 'Recommended Damage Level',
            maxLength: 40
        }),
        recommended_fee: DecimalColumn({
            label: 'Recommended Fee'
        })
    },
    auto_number: {
        prefix: 'INC',
        number: 1001,
        number_of_digits: 7
    },
    display: 'number',
    allow_web_service_access: true,
    actions: ['create', 'read', 'update', 'delete']
})