import React from 'react'
import './IncidentList.css'

export default function IncidentList({ incidents, onEdit, onRefresh, service }) {
    const handleDelete = async (incident) => {
        const number = typeof incident.number === 'object' ? incident.number.display_value : incident.number
        if (!confirm(`Are you sure you want to delete incident ${number}?`)) {
            return
        }

        try {
            const sysId = typeof incident.sys_id === 'object' ? incident.sys_id.value : incident.sys_id
            await service.delete(sysId)
            onRefresh()
        } catch (error) {
            console.error('Failed to delete incident:', error)
            alert('Failed to delete incident: ' + (error.message || 'Unknown error'))
        }
    }

    const getStateClass = (state) => {
        const stateValue = typeof state === 'object' ? state.display_value : state

        switch (stateValue) {
            case 'Open':
                return 'state-open'
            case 'Pending Approval':
                return 'state-pending'
            case 'Approved':
                return 'state-approved'
            case 'Paid':
                return 'state-paid'
            case 'Replaced':
                return 'state-replaced'
            case 'Disputed':
                return 'state-disputed'
            case 'Closed':
                return 'state-closed'
            default:
                return ''
        }
    }

    const getDamageClass = (damageType) => {
        const damageValue = typeof damageType === 'object' ? damageType.display_value : damageType

        switch (damageValue) {
            case 'Lost':
                return 'damage-lost'
            case 'Damaged':
                return 'damage-damaged'
            case 'Water Damage':
                return 'damage-water'
            default:
                return 'damage-other'
        }
    }

    return (
        <div className="incident-list">
            {incidents.length === 0 ? (
                <div className="no-incidents">No book incidents found</div>
            ) : (
                <table>
                    <thead>
                        <tr>
                            <th>Number</th>
                            <th>Student ID</th>
                            <th>Book Title</th>
                            <th>Damage Type</th>
                            <th>State</th>
                            <th>Calculated Fee</th>
                            <th>Created</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {incidents.map((incident) => {
                            // Extract primitive values from potential objects
                            const number = typeof incident.number === 'object' ? incident.number.display_value : incident.number
                            const studentId = typeof incident.student_id === 'object' ? incident.student_id.display_value : incident.student_id
                            const bookTitle = typeof incident.book_title === 'object' ? incident.book_title.display_value : incident.book_title
                            const damageType = typeof incident.damage_type === 'object' ? incident.damage_type.display_value : incident.damage_type
                            const state = typeof incident.state === 'object' ? incident.state.display_value : incident.state
                            const calculatedFee = typeof incident.calculated_fee === 'object' ? incident.calculated_fee.display_value : incident.calculated_fee
                            const created = typeof incident.sys_created_on === 'object' ? incident.sys_created_on.display_value : incident.sys_created_on

                            return (
                                <tr key={typeof incident.sys_id === 'object' ? incident.sys_id.value : incident.sys_id}>
                                    <td>{number}</td>
                                    <td>{studentId}</td>
                                    <td>{bookTitle}</td>
                                    <td>
                                        <span className={`damage-badge ${getDamageClass(incident.damage_type)}`}>
                                            {damageType}
                                        </span>
                                    </td>
                                    <td>
                                        <span className={`state-badge ${getStateClass(incident.state)}`}>
                                            {state}
                                        </span>
                                    </td>
                                    <td>${calculatedFee}</td>
                                    <td>{created ? new Date(created).toLocaleDateString() : ''}</td>
                                    <td>
                                        <div className="action-buttons">
                                            <button
                                                className="edit-button"
                                                onClick={() => onEdit(incident)}
                                                aria-label={`Edit incident ${number}`}
                                            >
                                                Edit
                                            </button>
                                            <button
                                                className="delete-button"
                                                onClick={() => handleDelete(incident)}
                                                aria-label={`Delete incident ${number}`}
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            )}
        </div>
    )
}