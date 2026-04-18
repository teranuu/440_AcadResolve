import '@servicenow/sdk/global'
import { Table, StringColumn, DecimalColumn, ChoiceColumn, BooleanColumn } from '@servicenow/sdk/core'

// Fee Schedule Table - defines fees based on damage type and level
export const x_1997678_acadreso_fee_schedule = Table({
    $id: Now.ID['fee_schedule_table'],
    name: 'x_1997678_acadreso_fee_schedule',
    label: 'Fee Schedule',
    schema: {
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
        fee_type: ChoiceColumn({
            label: 'Fee Type',
            mandatory: true,
            dropdown: 'dropdown_with_none',
            choices: {
                percentage: { label: 'Percentage', sequence: 10 },
                fixed: { label: 'Fixed Amount', sequence: 20 },
                replacement_cost: { label: 'Replacement Cost', sequence: 30 }
            }
        }),
        fee_percentage: DecimalColumn({
            label: 'Fee Percentage',
            mandatory: true
        }),
        description: StringColumn({
            label: 'Description',
            maxLength: 500
        }),
        active: BooleanColumn({
            label: 'Active',
            default: 'true'
        })
    },
    display: 'damage_type',
    allow_web_service_access: true,
    actions: ['create', 'read', 'update', 'delete'],
    index: [
        {
            name: 'idx_damage_type_level',
            element: 'damage_type',
            unique: false
        }
    ]
})