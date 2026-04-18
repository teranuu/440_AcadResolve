import '@servicenow/sdk/global'
import { UiPage } from '@servicenow/sdk/core'

/**
 * Academic Resolve Incident Manager UI Page
 * Comprehensive incident management interface with forms and details
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
        html, body { width: 100%; height: 100%; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif; }
        body { background-color: #f5f5f5; color: #333; }
        .app-container { display: flex; flex-direction: column; height: 100vh; }
        .app-header { background: linear-gradient(135deg, #0055cc 0%, #0044a4 100%); color: white; padding: 20px; box-shadow: 0 2px 8px rgba(0,0,0,0.15); }
        .header-content { margin-bottom: 15px; }
        .app-header h1 { font-size: 28px; margin-bottom: 5px; font-weight: 700; }
        .app-header p { font-size: 14px; opacity: 0.95; }
        .header-actions { display: flex; gap: 10px; margin-top: 15px; }
        .btn { padding: 10px 18px; border: none; border-radius: 4px; cursor: pointer; font-weight: 600; font-size: 14px; transition: all 0.2s; }
        .btn-primary { background-color: white; color: #0055cc; }
        .btn-primary:hover { background-color: #f0f0f0; }
        .btn-secondary { background-color: rgba(255,255,255,0.2); color: white; }
        .btn-secondary:hover { background-color: rgba(255,255,255,0.3); }
        .main-content { flex: 1; overflow-y: auto; padding: 20px; }
        .content-area { background: white; border-radius: 4px; padding: 20px; box-shadow: 0 1px 3px rgba(0,0,0,0.1); }
        table { width: 100%; border-collapse: collapse; }
        th { background-color: #f5f5f5; border-bottom: 2px solid #ddd; padding: 12px; text-align: left; font-weight: 600; }
        td { border-bottom: 1px solid #ddd; padding: 12px; }
        tr:hover { background-color: #f9f9f9; }
        .status-badge { display: inline-block; padding: 6px 10px; border-radius: 3px; font-size: 12px; font-weight: 600; }
        .status-open { background-color: #e3f2fd; color: #0055cc; }
        .status-pending { background-color: #fff3e0; color: #f57c00; }
        .status-approved { background-color: #e8f5e9; color: #388e3c; }
        .status-paid { background-color: #c8e6c9; color: #1b5e20; }
        .status-closed { background-color: #f0f0f0; color: #666; }
        .status-rejected { background-color: #ffebee; color: #c62828; }
        .btn-action { padding: 6px 12px; font-size: 12px; margin: 0 4px; }
        .btn-view { background-color: #0055cc; color: white; }
        .btn-view:hover { background-color: #0044a4; }
        .btn-pay { background-color: #388e3c; color: white; }
        .btn-pay:hover { background-color: #2e7d32; }
        .modal { display: none; position: fixed; top: 0; left: 0; width: 100%; height: 100%; background-color: rgba(0,0,0,0.5); z-index: 1000; }
        .modal.active { display: flex; align-items: center; justify-content: center; }
        .modal-content { background: white; border-radius: 8px; padding: 30px; max-width: 600px; width: 90%; max-height: 90vh; overflow-y: auto; box-shadow: 0 4px 12px rgba(0,0,0,0.2); }
        .modal-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; }
        .modal-header h2 { font-size: 22px; }
        .close-btn { background: none; border: none; font-size: 28px; cursor: pointer; color: #999; }
        .close-btn:hover { color: #333; }
        .form-group { margin-bottom: 16px; }
        .form-group label { display: block; font-weight: 600; margin-bottom: 6px; }
        .form-group input, .form-group textarea, .form-group select { width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 4px; font-size: 14px; font-family: inherit; }
        .form-group textarea { resize: vertical; min-height: 100px; }
        .form-group input:focus, .form-group textarea:focus, .form-group select:focus { outline: none; border-color: #0055cc; box-shadow: 0 0 0 3px rgba(0, 85, 204, 0.1); }
        .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
        .form-actions { display: flex; gap: 10px; justify-content: flex-end; margin-top: 24px; }
        .btn-cancel { background-color: #ddd; color: #333; }
        .btn-cancel:hover { background-color: #ccc; }
        .btn-submit { background-color: #0055cc; color: white; }
        .btn-submit:hover { background-color: #0044a4; }
        .loading { text-align: center; padding: 40px; color: #999; }
        .error { background-color: #f8d7da; border: 1px solid #f5c6cb; color: #721c24; padding: 12px; border-radius: 4px; margin-bottom: 15px; }
        .success { background-color: #d4edda; border: 1px solid #c3e6cb; color: #155724; padding: 12px; border-radius: 4px; margin-bottom: 15px; }
        .no-data { text-align: center; padding: 40px; color: #999; }
        .detail-container { max-width: 800px; }
        .detail-section { margin-bottom: 24px; }
        .detail-section h3 { font-size: 16px; font-weight: 700; margin-bottom: 12px; padding-bottom: 8px; border-bottom: 2px solid #eee; }
        .detail-row { display: grid; grid-template-columns: 150px 1fr; margin-bottom: 10px; }
        .detail-label { font-weight: 600; color: #666; }
        .detail-value { }
        .fee-display { background-color: #f5f5f5; padding: 12px; border-radius: 4px; font-size: 18px; font-weight: 700; color: #0055cc; }
        .action-buttons { display: flex; gap: 10px; flex-wrap: wrap; margin-top: 20px; }
    </style>
</head>
<body>
    <div class="app-container">
        <!-- Header -->
        <header class="app-header">
            <div class="header-content">
                <h1>Academic Resolve</h1>
                <p>Book Incident Management System</p>
            </div>
            <div class="header-actions">
                <button class="btn btn-primary" onclick="showCreateForm()">+ Report New Incident</button>
                <button class="btn btn-secondary" onclick="loadIncidents()">Refresh List</button>
            </div>
        </header>

        <!-- Main Content -->
        <div class="main-content">
            <div id="success-message" class="success" style="display:none;"></div>
            <div id="error-message" class="error" style="display:none;"></div>
            
            <!-- Incidents List View -->
            <div id="list-view">
                <div id="loading" class="loading">Loading incidents...</div>
                
                <div class="content-area" id="content" style="display:none;">
                    <table>
                        <thead>
                            <tr>
                                <th>Incident #</th>
                                <th>Student</th>
                                <th>Book Title</th>
                                <th>Damage</th>
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

            <!-- Detail View -->
            <div id="detail-view" style="display:none;">
                <button class="btn btn-secondary" onclick="showListView()">← Back to List</button>
                <div class="content-area detail-container" id="detail-content"></div>
            </div>
        </div>
    </div>

    <!-- Create/Edit Incident Modal -->
    <div id="incident-modal" class="modal">
        <div class="modal-content">
            <div class="modal-header">
                <h2 id="modal-title">Report New Incident</h2>
                <button class="close-btn" onclick="closeModal()">&times;</button>
            </div>
            <form id="incident-form" onsubmit="submitIncident(event)">
                <div class="form-group">
                    <label>Student ID *</label>
                    <input type="text" id="student_id" name="student_id" required placeholder="e.g., STU123456">
                </div>

                <div class="form-row">
                    <div class="form-group">
                        <label>Book Title *</label>
                        <input type="text" id="book_title" name="book_title" required placeholder="Book title">
                    </div>
                    <div class="form-group">
                        <label>ISBN</label>
                        <input type="text" id="book_isbn" name="book_isbn" placeholder="978-...">
                    </div>
                </div>

                <div class="form-row">
                    <div class="form-group">
                        <label>Book Value ($) *</label>
                        <input type="number" id="book_value" name="book_value" step="0.01" min="0" required placeholder="0.00">
                    </div>
                    <div class="form-group">
                        <label>Incident Date *</label>
                        <input type="date" id="incident_date" name="incident_date" required>
                    </div>
                </div>

                <div class="form-row">
                    <div class="form-group">
                        <label>Damage Type *</label>
                        <select id="damage_type" name="damage_type" required onchange="updateDamageOptions()">
                            <option value="">-- Select --</option>
                            <option value="lost">Lost</option>
                            <option value="water_damage">Water Damage</option>
                            <option value="physical_damage">Physical Damage</option>
                            <option value="tear">Torn Pages</option>
                            <option value="mold">Mold/Mildew</option>
                            <option value="missing_pages">Missing Pages</option>
                            <option value="other">Other</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label>Damage Level *</label>
                        <select id="damage_level" name="damage_level" required>
                            <option value="">-- Select --</option>
                            <option value="light">Light - Minor cosmetic damage</option>
                            <option value="medium">Medium - Affects usability</option>
                            <option value="high">High - Book unusable</option>
                            <option value="replacement">Total Loss - Replacement needed</option>
                        </select>
                    </div>
                </div>

                <div class="form-group">
                    <label>Description *</label>
                    <textarea id="description" name="description" required placeholder="Describe what happened to the book..." minlength="10"></textarea>
                </div>

                <div class="form-actions">
                    <button type="button" class="btn btn-cancel" onclick="closeModal()">Cancel</button>
                    <button type="submit" class="btn btn-submit">Create Incident</button>
                </div>
            </form>
        </div>
    </div>

    <script>
        // Initialize
        document.addEventListener('DOMContentLoaded', function() {
            console.log('Academic Resolve Incident Manager initialized');
            loadIncidents();
            setDefaultDate();
        });

        function setDefaultDate() {
            const today = new Date().toISOString().split('T')[0];
            document.getElementById('incident_date').value = today;
        }

        function loadIncidents() {
            showListView();
            const loading = document.getElementById('loading');
            const content = document.getElementById('content');
            loading.style.display = 'block';
            content.style.display = 'none';

            fetch('/api/acadresolve/incidents?limit=100')
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
                                <td>
                                    <span class="status-badge status-\${(inc.state || 'open').toLowerCase()}">
                                        \${inc.state || 'Open'}
                                    </span>
                                </td>
                                <td>\$\${parseFloat(inc.calculated_fee || 0).toFixed(2)}</td>
                                <td>\${inc.created_on ? new Date(inc.created_on).toLocaleDateString() : '-'}</td>
                                <td>
                                    <button class="btn btn-action btn-view" onclick="viewIncident('\${inc.sys_id}')">View</button>
                                </td>
                            </tr>
                        \`).join('');
                        content.style.display = 'block';
                    } else {
                        document.getElementById('incidents-tbody').innerHTML = 
                            '<tr><td colspan="8" class="no-data">No incidents found. Create one to get started!</td></tr>';
                        content.style.display = 'block';
                    }
                })
                .catch(err => {
                    loading.style.display = 'none';
                    content.style.display = 'none';
                    showError('Error loading incidents: ' + (err.message || 'Unknown error'));
                    console.error('Error:', err);
                });
        }

        function viewIncident(incidentId) {
            fetch('/api/acadresolve/incidents/' + incidentId)
                .then(r => r.json())
                .then(data => {
                    if (data.sys_id) {
                        displayIncidentDetail(data);
                    } else {
                        showError('Incident not found');
                    }
                })
                .catch(err => showError('Error loading incident: ' + err.message));
        }

        function displayIncidentDetail(inc) {
            const detail = \`
                <div class="detail-section">
                    <h3>\${inc.number} - \${inc.book_title}</h3>
                    <div class="detail-row">
                        <div class="detail-label">Student:</div>
                        <div class="detail-value">\${inc.student_id}</div>
                    </div>
                    <div class="detail-row">
                        <div class="detail-label">Book ISBN:</div>
                        <div class="detail-value">\${inc.book_isbn || '-'}</div>
                    </div>
                    <div class="detail-row">
                        <div class="detail-label">Book Value:</div>
                        <div class="detail-value">\$\${parseFloat(inc.book_value || 0).toFixed(2)}</div>
                    </div>
                </div>

                <div class="detail-section">
                    <h3>Incident Details</h3>
                    <div class="detail-row">
                        <div class="detail-label">Damage Type:</div>
                        <div class="detail-value">\${inc.damage_type}</div>
                    </div>
                    <div class="detail-row">
                        <div class="detail-label">Damage Level:</div>
                        <div class="detail-value">\${inc.damage_level}</div>
                    </div>
                    <div class="detail-row">
                        <div class="detail-label">Date:</div>
                        <div class="detail-value">\${inc.incident_date || '-'}</div>
                    </div>
                    <div class="detail-row">
                        <div class="detail-label">Description:</div>
                        <div class="detail-value">\${inc.description || '-'}</div>
                    </div>
                </div>

                <div class="detail-section">
                    <h3>Fee Information</h3>
                    <div class="fee-display">\$\${parseFloat(inc.calculated_fee || 0).toFixed(2)}</div>
                </div>

                <div class="detail-section">
                    <h3>Status</h3>
                    <div class="detail-row">
                        <div class="detail-label">Current Status:</div>
                        <div class="detail-value">
                            <span class="status-badge status-\${(inc.state || 'open').toLowerCase()}">
                                \${inc.state || 'Open'}
                            </span>
                        </div>
                    </div>
                </div>

                <div class="action-buttons">
                    <button class="btn btn-primary" onclick="showPaymentOption('\${inc.sys_id}')">💳 Make Payment</button>
                    <button class="btn btn-secondary" onclick="requestApproval('\${inc.sys_id}')">✓ Request Approval</button>
                </div>
            \`;
            
            document.getElementById('detail-content').innerHTML = detail;
            document.getElementById('detail-view').style.display = 'block';
            document.getElementById('list-view').style.display = 'none';
        }

        function showListView() {
            document.getElementById('list-view').style.display = 'block';
            document.getElementById('detail-view').style.display = 'none';
        }

        function showCreateForm() {
            document.getElementById('modal-title').textContent = 'Report New Incident';
            document.getElementById('incident-form').reset();
            setDefaultDate();
            document.getElementById('incident-modal').classList.add('active');
        }

        function closeModal() {
            document.getElementById('incident-modal').classList.remove('active');
            document.getElementById('incident-form').reset();
        }

        function submitIncident(event) {
            event.preventDefault();
            
            const formData = new FormData(document.getElementById('incident-form'));
            const data = Object.fromEntries(formData);

            fetch('/api/acadresolve/incidents', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            })
            .then(r => r.json())
            .then(response => {
                closeModal();
                showSuccess('Incident created successfully! Number: ' + response.number);
                loadIncidents();
            })
            .catch(err => showError('Error creating incident: ' + err.message));
        }

        function requestApproval(incidentId) {
            alert('Approval request feature - coming soon!');
        }

        function showPaymentOption(incidentId) {
            alert('Payment processing - coming soon! Incident: ' + incidentId);
        }

        function showError(msg) {
            const elem = document.getElementById('error-message');
            elem.textContent = '⚠️ ' + msg;
            elem.style.display = 'block';
            setTimeout(() => { elem.style.display = 'none'; }, 5000);
        }

        function showSuccess(msg) {
            const elem = document.getElementById('success-message');
            elem.textContent = '✓ ' + msg;
            elem.style.display = 'block';
            setTimeout(() => { elem.style.display = 'none'; }, 5000);
        }

        function updateDamageOptions() {
            // Can add logic here for conditional fields
        }
    </script>
</body>
</html>
    `,
    direct: true,
})

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

            // Fetch incidents from API
            fetch('/api/acadresolve/incidents?limit=100')
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

