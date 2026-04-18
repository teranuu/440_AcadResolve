/**
 * Academic Resolve - Incident Service
 * Handles all API calls for book incident management
 */
export class IncidentService {
    constructor() {
        this.baseUrl = '/api/now/x_1997678_acad_resolve'
        this.tableName = 'x_1997678_acad_resolve_book_incident'
    }

    /**
     * List all incidents (with optional filtering)
     * @param {Object} options - Filter options
     * @returns {Promise<Array>} List of incidents
     */
    async list(options = {}) {
        try {
            let url = `${this.baseUrl}/listIncidents`
            const params = new URLSearchParams()
            
            if (options.state) params.append('state', options.state)
            if (options.student_id) params.append('student_id', options.student_id)
            
            if (params.toString()) {
                url += `?${params.toString()}`
            }
            
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'X-UserToken': window.g_ck,
                }
            })

            if (!response.ok) {
                throw new Error(`HTTP error: ${response.status}`)
            }

            const data = await response.json()
            return data.incidents || []
        } catch (error) {
            console.error('Error listing incidents:', error)
            throw error
        }
    }

    /**
     * Get a single incident by ID
     * @param {string} id - Incident ID
     * @returns {Promise<Object>} Incident details
     */
    async get(id) {
        try {
            const url = `${this.baseUrl}/getIncident?id=${encodeURIComponent(id)}`
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'X-UserToken': window.g_ck,
                }
            })

            if (!response.ok) {
                throw new Error(`Incident not found: ${response.status}`)
            }

            return await response.json()
        } catch (error) {
            console.error('Error fetching incident:', error)
            throw error
        }
    }

    /**
     * Create a new incident
     * @param {Object} data - Incident data
     * @returns {Promise<Object>} Created incident
     */
    async create(data) {
        try {
            const response = await fetch(`${this.baseUrl}/createIncident`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'X-UserToken': window.g_ck,
                },
                body: JSON.stringify(data)
            })

            if (!response.ok) {
                throw new Error(`Failed to create incident: ${response.status}`)
            }

            return await response.json()
        } catch (error) {
            console.error('Error creating incident:', error)
            throw error
        }
    }

    /**
     * Update an incident
     * @param {string} id - Incident ID
     * @param {Object} data - Updated data
     * @returns {Promise<Object>} Updated incident
     */
    async update(id, data) {
        try {
            const response = await fetch(`${this.baseUrl}/updateIncidentStatus`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'X-UserToken': window.g_ck,
                },
                body: JSON.stringify({
                    incident_id: id,
                    ...data
                })
            })

            if (!response.ok) {
                throw new Error(`Failed to update incident: ${response.status}`)
            }

            return await response.json()
        } catch (error) {
            console.error('Error updating incident:', error)
            throw error
        }
    }

    /**
     * Delete an incident (admin only)
     * @param {string} id - Incident ID
     * @returns {Promise<Object>} Deletion result
     */
    async delete(id) {
        try {
            const response = await fetch(`/api/now/table/${this.tableName}/${id}`, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'X-UserToken': window.g_ck,
                }
            })

            if (!response.ok) {
                throw new Error(`Failed to delete incident: ${response.status}`)
            }

            return await response.json()
        } catch (error) {
            console.error('Error deleting incident:', error)
            throw error
        }
    }

    /**
     * Calculate fee for an incident
     * @param {Object} params - Calculation parameters
     * @returns {Promise<Object>} Fee calculation result
     */
    async calculateFee(params) {
        try {
            const response = await fetch(`${this.baseUrl}/calculateFee`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'X-UserToken': window.g_ck,
                },
                body: JSON.stringify(params)
            })

            if (!response.ok) {
                throw new Error('Fee calculation failed')
            }

            return await response.json()
        } catch (error) {
            console.error('Error calculating fee:', error)
            throw error
        }
    }

    /**
     * Initiate payment for an incident
     * @param {string} incidentId - Incident ID
     * @param {string} paymentMethod - Payment method
     * @returns {Promise<Object>} Payment initiation result
     */
    async initiatePayment(incidentId, paymentMethod) {
        try {
            const response = await fetch(`${this.baseUrl}/initiatePayment`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'X-UserToken': window.g_ck,
                },
                body: JSON.stringify({
                    incident_id: incidentId,
                    payment_method: paymentMethod
                })
            })

            if (!response.ok) {
                throw new Error('Payment initiation failed')
            }

            return await response.json()
        } catch (error) {
            console.error('Error initiating payment:', error)
            throw error
        }
    }

    /**
     * Submit for approval
     * @param {string} incidentId - Incident ID
     * @param {string} approverId - Approver user ID
     * @returns {Promise<Object>} Submission result
     */
    async submitForApproval(incidentId, approverId) {
        try {
            const response = await fetch(`${this.baseUrl}/submitForApproval`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'X-UserToken': window.g_ck,
                },
                body: JSON.stringify({
                    incident_id: incidentId,
                    approver_id: approverId
                })
            })

            if (!response.ok) {
                throw new Error('Submission failed')
            }

            return await response.json()
        } catch (error) {
            console.error('Error submitting for approval:', error)
            throw error
        }
    }

    /**
     * Get AI assessment for incident
     * @param {string} incidentId - Incident ID
     * @returns {Promise<Object>} AI assessment result
     */
    async assessWithAI(incidentId) {
        try {
            const response = await fetch(`${this.baseUrl}/assessDisputeWithAI`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'X-UserToken': window.g_ck,
                },
                body: JSON.stringify({
                    incident_id: incidentId
                })
            })

            if (!response.ok) {
                throw new Error('AI assessment failed')
            }

            return await response.json()
        } catch (error) {
            console.error('Error getting AI assessment:', error)
            throw error
        }
    }
            })

            if (!response.ok) {
                const errorData = await response.json()
                throw new Error(errorData.error?.message || `HTTP error ${response.status}`)
            }

            return response.json()
        } catch (error) {
            console.error(`Error updating incident ${sysId}:`, error)
            throw error
        }
    }

    // Delete an incident
    async delete(sysId) {
        try {
            const response = await fetch(`/api/now/table/${this.tableName}/${sysId}`, {
                method: 'DELETE',
                headers: {
                    Accept: 'application/json',
                    'X-UserToken': window.g_ck,
                },
            })

            if (!response.ok) {
                const errorData = await response.json()
                throw new Error(errorData.error?.message || `HTTP error ${response.status}`)
            }

            return response.ok
        } catch (error) {
            console.error(`Error deleting incident ${sysId}:`, error)
            throw error
        }
    }
}
