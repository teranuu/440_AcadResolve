import '@servicenow/sdk/global'
import { Now } from '@servicenow/sdk/core'

/**
 * Academic Resolve Incident Manager Widget
 * Serves the incident manager UI within ServiceNow interface
 */
Now.Widget({
    id: 'incident_manager_widget',
    label: 'Incident Manager',
    description: 'Academic Resolve - Book Incident Management',
    table: 'x_1997678_acadreso_book_incident',
    config: {
        fields: ['number', 'student_id', 'book_title', 'damage_type', 'damage_level', 'calculated_fee', 'state']
    },
    template: `
        <div class="incident-manager">
            <div class="manager-header">
                <h2>Book Incident Management</h2>
                <button type="button" class="btn-new-incident">
                    + Report New Incident
                </button>
            </div>
            <div id="incident-app"></div>
        </div>
    `,
    css: `
        .incident-manager {
            padding: 20px;
            background-color: #f5f5f5;
        }
        .manager-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 20px;
            background: white;
            padding: 15px;
            border-radius: 4px;
            box-shadow: 0 1px 3px rgba(0,0,0,0.1);
        }
        .btn-new-incident {
            background-color: #0055cc;
            color: white;
            border: none;
            padding: 8px 16px;
            border-radius: 4px;
            cursor: pointer;
            font-weight: 600;
        }
        .btn-new-incident:hover {
            background-color: #0044a4;
        }
    `,
    onLoad: function() {
        console.log('Incident Manager Widget loaded');
        this.initializeApp();
    },
    onRender: function() {
        const container = document.getElementById('incident-app');
        if (container && typeof React !== 'undefined') {
            console.log('Rendering incident app');
        }
    }
})
