/**
 * Academic Resolve - Incident Service
 * Handles all API calls for book incident management
 */
export class IncidentService {
    constructor() {
        this.tableName = 'x_1997678_acadreso_book_incident'
    }

    /**
     * List all incidents (with optional filtering)
     * @param {Object} options - Filter options
     * @returns {Promise<Array>} List of incidents
     */
    async list(options = {}) {
        try {
            const params = new URLSearchParams({
                sysparm_display_value: 'all',
                sysparm_limit: '100'
            })
            
            if (options.state) params.append('sysparm_query', `state=${options.state}`)
            if (options.student_id) {
                const query = params.get('sysparm_query') || ''
                params.set('sysparm_query', query ? `${query}^student_id=${options.student_id}` : `student_id=${options.student_id}`)
            }
            
            const response = await fetch(`/api/now/table/${this.tableName}?${params.toString()}`, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'X-UserToken': window.g_ck,
                }
            })

            if (!response.ok) {
                const errorData = await response.json()
                throw new Error(errorData.error?.message || `HTTP error: ${response.status}`)
            }

            const data = await response.json()
            return data.result || []
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
            const response = await fetch(`/api/now/table/${this.tableName}/${id}?sysparm_display_value=all`, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'X-UserToken': window.g_ck,
                }
            })

            if (!response.ok) {
                const errorData = await response.json()
                throw new Error(errorData.error?.message || `Incident not found: ${response.status}`)
            }

            const data = await response.json()
            return data.result
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
            const response = await fetch(`/api/now/table/${this.tableName}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'X-UserToken': window.g_ck,
                },
                body: JSON.stringify(data)
            })

            if (!response.ok) {
                const errorData = await response.json()
                throw new Error(errorData.error?.message || `Failed to create incident: ${response.status}`)
            }

            const result = await response.json()
            return result.result
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
            const response = await fetch(`/api/now/table/${this.tableName}/${id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'X-UserToken': window.g_ck,
                },
                body: JSON.stringify(data)
            })

            if (!response.ok) {
                const errorData = await response.json()
                throw new Error(errorData.error?.message || `HTTP error ${response.status}`)
            }

            const result = await response.json()
            return result.result
        } catch (error) {
            console.error('Error updating incident:', error)
            throw error
        }
    }

    /**
     * Delete an incident (admin only)
     * @param {string} id - Incident ID
     * @returns {Promise<boolean>} Deletion success
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
                const errorData = await response.json()
                throw new Error(errorData.error?.message || `HTTP error ${response.status}`)
            }

            return response.ok
        } catch (error) {
            console.error('Error deleting incident:', error)
            throw error
        }
    }
}