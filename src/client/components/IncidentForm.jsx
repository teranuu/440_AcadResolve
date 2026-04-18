import React, { useState, useEffect } from 'react'
import './IncidentForm.css'

export default function IncidentForm({ incident, onSubmit, onCancel }) {
    const isEditing = !!incident

    // Initialize form state with book incident fields
    const [formData, setFormData] = useState({
        student_id: '',
        book_title: '',
        book_isbn: '',
        book_value: '',
        damage_type: 'damaged',
        damage_level: 'minor',
        description: '',
        state: 'open'
    })

    // Load incident data if editing
    useEffect(() => {
        if (incident) {
            // Extract primitive values from potential objects
            const studentId = typeof incident.student_id === 'object' ? incident.student_id.value : incident.student_id
            const bookTitle = typeof incident.book_title === 'object' ? incident.book_title.value : incident.book_title
            const bookIsbn = typeof incident.book_isbn === 'object' ? incident.book_isbn.value : incident.book_isbn
            const bookValue = typeof incident.book_value === 'object' ? incident.book_value.value : incident.book_value
            const damageType = typeof incident.damage_type === 'object' ? incident.damage_type.value : incident.damage_type
            const damageLevel = typeof incident.damage_level === 'object' ? incident.damage_level.value : incident.damage_level
            const description = typeof incident.description === 'object' ? incident.description.value : incident.description
            const state = typeof incident.state === 'object' ? incident.state.value : incident.state

            setFormData({
                student_id: studentId || '',
                book_title: bookTitle || '',
                book_isbn: bookIsbn || '',
                book_value: bookValue || '',
                damage_type: damageType || 'damaged',
                damage_level: damageLevel || 'minor',
                description: description || '',
                state: state || 'open'
            })
        }
    }, [incident])

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        onSubmit(formData)
    }

    const getIncidentNumber = () => {
        if (!incident) return ''
        return typeof incident.number === 'object' ? incident.number.display_value : incident.number
    }

    return (
        <div className="form-overlay">
            <div className="form-container">
                <div className="form-header">
                    <h2>{isEditing ? `Edit Book Incident ${getIncidentNumber()}` : 'Create New Book Incident'}</h2>
                    <button type="button" className="close-button" onClick={onCancel}>
                        ×
                    </button>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor="student_id">Student ID *</label>
                            <input
                                type="text"
                                id="student_id"
                                name="student_id"
                                value={formData.student_id}
                                onChange={handleChange}
                                required
                                maxLength={40}
                                placeholder="e.g., STU123456"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="book_value">Book Value ($) *</label>
                            <input
                                type="number"
                                id="book_value"
                                name="book_value"
                                value={formData.book_value}
                                onChange={handleChange}
                                required
                                min="0"
                                step="0.01"
                                placeholder="0.00"
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="book_title">Book Title *</label>
                        <input
                            type="text"
                            id="book_title"
                            name="book_title"
                            value={formData.book_title}
                            onChange={handleChange}
                            required
                            maxLength={200}
                            placeholder="Enter the full book title"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="book_isbn">Book ISBN</label>
                        <input
                            type="text"
                            id="book_isbn"
                            name="book_isbn"
                            value={formData.book_isbn}
                            onChange={handleChange}
                            maxLength={20}
                            placeholder="e.g., 978-1234567890"
                        />
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor="damage_type">Damage Type *</label>
                            <select id="damage_type" name="damage_type" value={formData.damage_type} onChange={handleChange} required>
                                <option value="lost">Lost</option>
                                <option value="damaged">Damaged</option>
                                <option value="torn_pages">Torn Pages</option>
                                <option value="water_damage">Water Damage</option>
                                <option value="writing">Writing/Markings</option>
                                <option value="missing_pages">Missing Pages</option>
                                <option value="cover_damage">Cover Damage</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label htmlFor="damage_level">Damage Level *</label>
                            <select id="damage_level" name="damage_level" value={formData.damage_level} onChange={handleChange} required>
                                <option value="minor">Minor</option>
                                <option value="moderate">Moderate</option>
                                <option value="major">Major</option>
                                <option value="total_loss">Total Loss</option>
                            </select>
                        </div>
                    </div>

                    {isEditing && (
                        <div className="form-group">
                            <label htmlFor="state">Status</label>
                            <select id="state" name="state" value={formData.state} onChange={handleChange}>
                                <option value="open">Open</option>
                                <option value="pending_approval">Pending Approval</option>
                                <option value="approved">Approved</option>
                                <option value="paid">Paid</option>
                                <option value="replaced">Replaced</option>
                                <option value="disputed">Disputed</option>
                                <option value="closed">Closed</option>
                            </select>
                        </div>
                    )}

                    <div className="form-group">
                        <label htmlFor="description">Description</label>
                        <textarea
                            id="description"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            rows={4}
                            maxLength={1000}
                            placeholder="Describe the incident and any relevant details..."
                        />
                    </div>

                    <div className="form-actions">
                        <button type="button" className="cancel-button" onClick={onCancel}>
                            Cancel
                        </button>
                        <button type="submit" className="submit-button">
                            {isEditing ? 'Update Incident' : 'Create Incident'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}