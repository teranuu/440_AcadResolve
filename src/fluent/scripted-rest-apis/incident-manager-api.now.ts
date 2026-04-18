/**
 * Academic Resolve Incident Manager API
 * Scripted REST API endpoint for serving the incident manager UI
 */

import { gs, GlideRecord } from '@servicenow/glide'

export function getIncidentManagerUI(request, response) {
    try {
        const user = gs.getUser()
        
        // Check if user has access
        if (!user.hasRole('acad_resolve.admin') && 
            !user.hasRole('acad_resolve.student') && 
            !user.hasRole('acad_resolve.library_staff')) {
            response.setStatus(403)
            response.setBody({ error: 'Access denied' })
            return
        }

        // Return HTML for incident manager
        const html = `
<!DOCTYPE html>
<html>
<head>
    <title>Academic Resolve - Incident Manager</title>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { 
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
            background-color: #f5f5f5;
            color: #333;
        }
        .container { max-width: 1200px; margin: 0 auto; padding: 20px; }
        .header { 
            background: white; 
            padding: 20px; 
            border-radius: 4px; 
            margin-bottom: 20px;
            box-shadow: 0 1px 3px rgba(0,0,0,0.1);
        }
        .header h1 { font-size: 28px; margin-bottom: 5px; color: #0055cc; }
        .header p { color: #666; font-size: 14px; }
        .controls { 
            display: flex; 
            gap: 10px; 
            margin-top: 15px; 
        }
        .btn { 
            background-color: #0055cc; 
            color: white; 
            border: none; 
            padding: 10px 20px; 
            border-radius: 4px; 
            cursor: pointer;
            font-weight: 600;
            font-size: 14px;
        }
        .btn:hover { background-color: #0044a4; }
        .btn-secondary {
            background-color: #6c757d;
        }
        .btn-secondary:hover {
            background-color: #5a6268;
        }
        .content-area {
            background: white;
            border-radius: 4px;
            padding: 20px;
            box-shadow: 0 1px 3px rgba(0,0,0,0.1);
        }
        .table {
            width: 100%;
            border-collapse: collapse;
        }
        .table th {
            background-color: #f0f0f0;
            border-bottom: 2px solid #ddd;
            padding: 12px;
            text-align: left;
            font-weight: 600;
        }
        .table td {
            border-bottom: 1px solid #ddd;
            padding: 12px;
        }
        .table tr:hover {
            background-color: #f9f9f9;
        }
        .status-badge {
            display: inline-block;
            padding: 4px 8px;
            border-radius: 3px;
            font-size: 12px;
            font-weight: 600;
        }
        .status-open { background-color: #e3f2fd; color: #0055cc; }
        .status-pending { background-color: #fff3e0; color: #f57c00; }
        .status-approved { background-color: #e8f5e9; color: #388e3c; }
        .status-paid { background-color: #c8e6c9; color: #1b5e20; }
        .status-closed { background-color: #f0f0f0; color: #666; }
        .alert {
            background-color: #fff3cd;
            border: 1px solid #ffc107;
            color: #856404;
            padding: 12px;
            border-radius: 4px;
            margin-bottom: 15px;
        }
        .loading {
            text-align: center;
            padding: 40px;
            color: #999;
        }
        .error {
            background-color: #f8d7da;
            border: 1px solid #f5c6cb;
            color: #721c24;
            padding: 12px;
            border-radius: 4px;
            margin-bottom: 15px;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Academic Resolve</h1>
            <p>Book Incident Management System</p>
            <div class="controls">
                <button class="btn" onclick="createNewIncident()">+ Report New Incident</button>
                <button class="btn btn-secondary" onclick="refreshIncidents()">Refresh</button>
            </div>
        </div>

        <div class="content-area">
            <div id="loading" class="loading" style="display:none;">Loading incidents...</div>
            <div id="error" class="error" style="display:none;"></div>
            <div id="incidents-list">
                <table class="table">
                    <thead>
                        <tr>
                            <th>Incident #</th>
                            <th>Student</th>
                            <th>Book Title</th>
                            <th>Damage Type</th>
                            <th>Status</th>
                            <th>Fee</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody id="incidents-tbody">
                        <tr><td colspan="7" style="text-align:center; color:#999;">No incidents found</td></tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>

    <script>
        // Initialize on page load
        document.addEventListener('DOMContentLoaded', function() {
            console.log('Academic Resolve Incident Manager loaded');
            refreshIncidents();
        });

        function createNewIncident() {
            if (typeof glideDialogWindow !== 'undefined') {
                glideDialogWindow.open('incident_form', '', {
                    title: 'Create New Incident',
                    onClose: function() {
                        refreshIncidents();
                    }
                });
            } else {
                alert('Feature not available in this view');
            }
        }

        function refreshIncidents() {
            const loading = document.getElementById('loading');
            const error = document.getElementById('error');
            const tbody = document.getElementById('incidents-tbody');
            
            loading.style.display = 'block';
            error.style.display = 'none';

            // Fetch incidents from API
            fetch('/api/x_1997678_acadreso/incidents')
                .then(response => response.json())
                .then(data => {
                    loading.style.display = 'none';
                    
                    if (data.incidents && data.incidents.length > 0) {
                        tbody.innerHTML = data.incidents.map(incident => \`
                            <tr>
                                <td><strong>\${incident.number}</strong></td>
                                <td>\${incident.student_id}</td>
                                <td>\${incident.book_title}</td>
                                <td>\${incident.damage_type}</td>
                                <td>
                                    <span class="status-badge status-\${incident.state}">
                                        \${incident.state}
                                    </span>
                                </td>
                                <td>\$\${incident.calculated_fee}</td>
                                <td>
                                    <button class="btn" style="padding:4px 8px; font-size:12px;" 
                                        onclick="viewIncident('\${incident.sys_id}')">View</button>
                                </td>
                            </tr>
                        \`).join('');
                    } else {
                        tbody.innerHTML = '<tr><td colspan="7" style="text-align:center; color:#999;">No incidents found</td></tr>';
                    }
                })
                .catch(err => {
                    loading.style.display = 'none';
                    error.style.display = 'block';
                    error.textContent = 'Error loading incidents: ' + err.message;
                    console.error('Error:', err);
                });
        }

        function viewIncident(incidentId) {
            if (typeof glideDialogWindow !== 'undefined') {
                glideDialogWindow.open('incident_detail', incidentId, {
                    title: 'View Incident',
                    onClose: function() {
                        refreshIncidents();
                    }
                });
            } else {
                alert('Incident ID: ' + incidentId);
            }
        }
    </script>
</body>
</html>
        `

        response.setStatus(200)
        response.setContentType('text/html')
        response.setBody(html)

    } catch (error) {
        response.setStatus(500)
        response.setBody({ error: error.message })
    }
}

export function listIncidents(request, response) {
    try {
        const user = gs.getUser()
        const studentId = request.queryParams?.student_id
        const state = request.queryParams?.state
        const limit = parseInt(request.queryParams?.limit || '100')

        const gr = new GlideRecord('x_1997678_acadreso_book_incident')

        // Apply filters
        if (studentId) {
            gr.addQuery('student_id', studentId)
        }
        if (state) {
            gr.addQuery('state', state)
        }

        // Limit results
        gr.setLimit(limit)
        gr.query()

        const incidents = []
        while (gr.next()) {
            incidents.push({
                sys_id: gr.getUniqueValue(),
                number: gr.getValue('number'),
                student_id: gr.getValue('student_id'),
                book_title: gr.getValue('book_title'),
                damage_type: gr.getValue('damage_type'),
                damage_level: gr.getValue('damage_level'),
                state: gr.getValue('state'),
                calculated_fee: gr.getValue('calculated_fee'),
                created_on: gr.getValue('sys_created_on')
            })
        }

        response.setStatus(200)
        response.setBody({ incidents })

    } catch (error) {
        response.setStatus(500)
        response.setBody({ error: error.message })
    }
}
