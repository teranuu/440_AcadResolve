import '@servicenow/sdk/global'
import { UiPage } from '@servicenow/sdk/core'

/**
 * Academic Resolve Incident Manager UI Page
 * Serves the incident management interface within ServiceNow
 */
UiPage({
    $id: Now.ID['incident_manager_ui_page'],
    endpoint: 'x_1997678_acadreso_incident_manager.do',
    description: 'Academic Resolve - Incident Response Manager',
    category: 'general',
    html: `
<!DOCTYPE html>
<html>
<head>
    <title>Academic Resolve - Incident Manager</title>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        html, body { width: 100%; height: 100%; }
        body { 
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
            background-color: #f5f5f5;
            color: #333;
        }
        .app-container {
            display: flex;
            flex-direction: column;
            height: 100vh;
        }
        .app-header {
            background: linear-gradient(135deg, #0055cc 0%, #0044a4 100%);
            color: white;
            padding: 20px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
            margin-bottom: 20px;
        }
        .header-content { margin-bottom: 15px; }
        .app-header h1 { font-size: 28px; margin-bottom: 5px; }
        .app-header p { font-size: 14px; opacity: 0.9; }
        .btn-primary {
            background-color: white;
            color: #0055cc;
            border: none;
            padding: 10px 20px;
            border-radius: 4px;
            cursor: pointer;
            font-weight: 600;
            font-size: 14px;
        }
        .btn-primary:hover { background-color: #f0f0f0; }
        .main-content {
            flex: 1;
            overflow-y: auto;
            padding: 0 20px 20px;
        }
        .content-area {
            background: white;
            border-radius: 4px;
            padding: 20px;
            box-shadow: 0 1px 3px rgba(0,0,0,0.1);
        }
        .incidents-table {
            width: 100%;
            border-collapse: collapse;
        }
        .incidents-table th {
            background-color: #f0f0f0;
            border-bottom: 2px solid #ddd;
            padding: 12px;
            text-align: left;
            font-weight: 600;
        }
        .incidents-table td {
            border-bottom: 1px solid #ddd;
            padding: 12px;
        }
        .incidents-table tr:hover { background-color: #f9f9f9; }
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
        .loading { text-align: center; padding: 40px; color: #999; }
        .error { 
            background-color: #f8d7da; 
            border: 1px solid #f5c6cb; 
            color: #721c24; 
            padding: 12px; 
            border-radius: 4px; 
            margin-bottom: 15px; 
        }
        .no-data { text-align: center; padding: 40px; color: #999; }
    </style>
</head>
<body>
    <div class="app-container">
        <header class="app-header">
            <div class="header-content">
                <h1>Academic Resolve</h1>
                <p>Book Incident Management System</p>
            </div>
            <button class="btn-primary" onclick="createNewIncident()">+ Report New Incident</button>
        </header>

        <div class="main-content">
            <div id="error" class="error" style="display:none;"></div>
            <div id="loading" class="loading" style="display:none;">Loading incidents...</div>
            
            <div class="content-area" id="content" style="display:none;">
                <table class="incidents-table">
                    <thead>
                        <tr>
                            <th>Incident #</th>
                            <th>Student</th>
                            <th>Book Title</th>
                            <th>Damage Type</th>
                            <th>Status</th>
                            <th>Fee</th>
                            <th>Created</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody id="incidents-tbody">
                        <tr><td colspan="8" class="no-data">No incidents found</td></tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>

    <script>
        document.addEventListener('DOMContentLoaded', function() {
            console.log('Academic Resolve Incident Manager initialized');
            loadIncidents();
        });

        function loadIncidents() {
            const loading = document.getElementById('loading');
            const error = document.getElementById('error');
            const content = document.getElementById('content');
            
            loading.style.display = 'block';
            error.style.display = 'none';
            content.style.display = 'none';

            // Fetch incidents
            const user = (new GlideUser && new GlideUser()) || {};
            const studentId = user.getID ? user.getID() : null;

            fetch('api/x_1997678_acadreso/incidents?limit=100')
                .then(r => r.json())
                .then(data => {
                    loading.style.display = 'none';
                    
                    if (data.incidents && data.incidents.length > 0) {
                        const tbody = document.getElementById('incidents-tbody');
                        tbody.innerHTML = data.incidents.map(inc => \`
                            <tr>
                                <td><strong>\${inc.number || 'N/A'}</strong></td>
                                <td>\${inc.student_id || '-'}</td>
                                <td>\${inc.book_title || '-'}</td>
                                <td>\${inc.damage_type || '-'}</td>
                                <td><span class="status-badge status-\${(inc.state || 'open').toLowerCase()}">\${inc.state || 'Open'}</span></td>
                                <td>\$\${parseFloat(inc.calculated_fee || 0).toFixed(2)}</td>
                                <td>\${inc.created_on ? new Date(inc.created_on).toLocaleDateString() : '-'}</td>
                                <td><button onclick="viewIncident('\${inc.sys_id}')" style="padding:4px 8px; font-size:12px;">View</button></td>
                            </tr>
                        \`).join('');
                        content.style.display = 'block';
                    } else {
                        document.getElementById('incidents-tbody').innerHTML = 
                            '<tr><td colspan="8" class="no-data">No incidents found</td></tr>';
                        content.style.display = 'block';
                    }
                })
                .catch(err => {
                    loading.style.display = 'none';
                    error.style.display = 'block';
                    error.innerHTML = '⚠️ Error loading incidents: ' + (err.message || 'Unknown error');
                    console.error('Error:', err);
                });
        }

        function createNewIncident() {
            alert('Create incident feature - coming soon!');
        }

        function viewIncident(id) {
            alert('View incident: ' + id + ' - feature coming soon!');
        }
    </script>
</body>
</html>
    `,
    direct: true,
})

