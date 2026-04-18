import '@servicenow/sdk/global'

// Type declaration for BusinessRule builder
declare function BusinessRule(config: any): any

import { calculateIncidentFee } from '../../server/fee-calculator.js'

// Business rule to automatically calculate fees when incident is created or updated
BusinessRule({
    name: 'Calculate Incident Fee',
    table: 'x_1997678_acadreso_book_incident',
    when: 'before',
    action: ['insert', 'update'],
    active: true,
    script: calculateIncidentFee,
    condition: "current.damage_type != '' && current.damage_level != '' && current.book_value != ''",
    order: 100
})