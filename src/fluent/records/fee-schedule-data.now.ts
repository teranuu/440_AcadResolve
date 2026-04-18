import '@servicenow/sdk/global'

// Type declaration for Record builder
declare function Record(config: any): any

// Fee schedule records to define default fee calculations
export const feeSchedule1 = Record({
    table: 'x_1997678_acadreso_fee_schedule',
    data: {
        damage_type: 'lost',
        damage_level: 'total_loss',
        fee_type: 'replacement_cost',
        fee_percentage: 100,
        description: 'Lost book - full replacement cost',
        active: true
    }
})

export const feeSchedule2 = Record({
    table: 'x_1997678_acadreso_fee_schedule',
    data: {
        damage_type: 'damaged',
        damage_level: 'major',
        fee_type: 'percentage',
        fee_percentage: 75,
        description: 'Major damage - 75% of book value',
        active: true
    }
})

export const feeSchedule3 = Record({
    table: 'x_1997678_acadreso_fee_schedule',
    data: {
        damage_type: 'damaged',
        damage_level: 'moderate',
        fee_type: 'percentage',
        fee_percentage: 50,
        description: 'Moderate damage - 50% of book value',
        active: true
    }
})

export const feeSchedule4 = Record({
    table: 'x_1997678_acadreso_fee_schedule',
    data: {
        damage_type: 'damaged',
        damage_level: 'minor',
        fee_type: 'percentage',
        fee_percentage: 25,
        description: 'Minor damage - 25% of book value',
        active: true
    }
})

export const feeSchedule5 = Record({
    table: 'x_1997678_acadreso_fee_schedule',
    data: {
        damage_type: 'torn_pages',
        damage_level: 'moderate',
        fee_type: 'percentage',
        fee_percentage: 30,
        description: 'Torn pages - 30% of book value',
        active: true
    }
})

export const feeSchedule6 = Record({
    table: 'x_1997678_acadreso_fee_schedule',
    data: {
        damage_type: 'water_damage',
        damage_level: 'major',
        fee_type: 'replacement_cost',
        fee_percentage: 100,
        description: 'Water damage - full replacement cost',
        active: true
    }
})

export const feeSchedule7 = Record({
    table: 'x_1997678_acadreso_fee_schedule',
    data: {
        damage_type: 'writing',
        damage_level: 'minor',
        fee_type: 'percentage',
        fee_percentage: 15,
        description: 'Writing/markings - 15% of book value',
        active: true
    }
})