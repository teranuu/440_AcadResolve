import { GlideRecord } from '@servicenow/glide';

export function calculateIncidentFee(current, previous) {
    // Only calculate if we have the required fields
    if (!current.getValue('damage_type') || !current.getValue('damage_level') || !current.getValue('book_value')) {
        return;
    }
    
    const damageType = current.getValue('damage_type');
    const damageLevel = current.getValue('damage_level');
    const bookValue = parseFloat(current.getValue('book_value'));
    
    // Get fee schedule
    const schedule = new GlideRecord('x_1997678_acadreso_fee_schedule');
    schedule.addQuery('damage_type', damageType);
    schedule.addQuery('damage_level', damageLevel);
    schedule.addQuery('active', 'true');
    schedule.query();
    
    let calculatedFee = bookValue; // Default to full replacement cost
    
    if (schedule.next()) {
        const feePercentage = parseFloat(schedule.getValue('fee_percentage'));
        const feeType = schedule.getValue('fee_type');
        
        switch (feeType) {
            case 'percentage':
                calculatedFee = bookValue * (feePercentage / 100);
                break;
            case 'fixed':
                calculatedFee = feePercentage;
                break;
            case 'replacement_cost':
            default:
                calculatedFee = bookValue;
                break;
        }
    }
    
    // Set the calculated fee on the current record
    current.setValue('calculated_fee', calculatedFee.toFixed(2));
}