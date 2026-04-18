import '@servicenow/sdk/global'
import { BusinessRule } from '@servicenow/sdk/core'
import { calculateIncidentFee } from '../../server/fee-calculator.js'

// Business rule to automatically calculate fees when incident is created or updated
BusinessRule({
    $id: Now.ID['calculate_fee_br'],
    name: 'Calculate Incident Fee',
    table: 'x_1997678_acadreso_book_incident',
    when: 'before',
    action: ['insert', 'update'],
    active: true,
    script: calculateIncidentFee,
    condition: "current.damage_type != '' && current.damage_level != '' && current.book_value != ''",
    order: 100
})