import '@servicenow/sdk/global'
import { UiPage } from '@servicenow/sdk/core'

/**
 * Academic Resolve Approval Manager UI Page
 * Handles approval workflow for incident resolution
 */
UiPage({
    $id: Now.ID['approval_manager_ui_page'],
    endpoint: 'x_1997678_acadreso_approval_manager.do',
    description: 'Academic Resolve - Approval Manager',
    category: 'general',
    html: `
<!DOCTYPE html>
<html>
<head>
    <title>Academic Resolve - Approvals</title>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        html, body { width: 100%; height: 100%; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif; }
        body { background-color: #f5f5f5; color: #333; }
        .container { max-width: 1200px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #0055cc 0%, #0044a4 100%); color: white; padding: 20px; border-radius: 4px; margin-bottom: 20px; }
        .header h1 { font-size: 28px; margin-bottom: 5px; }
        .header p { font-size: 14px; opacity: 0.95; }
        .tabs { display: flex; gap: 10px; margin-bottom: 20px; border-bottom: 2px solid #ddd; }
        .tab { padding: 12px 20px; cursor: pointer; background: none; border: none; font-size: 16px; font-weight: 600; color: #999; border-bottom: 3px solid transparent; }
        .tab.active { color: #0055cc; border-bottom-color: #0055cc; }
        .tab:hover { color: #333; }
        .content { background: white; border-radius: 4px; padding: 20px; box-shadow: 0 1px 3px rgba(0,0,0,0.1); }
        table { width: 100%; border-collapse: collapse; }
        th { background-color: #f5f5f5; border-bottom: 2px solid #ddd; padding: 12px; text-align: left; font-weight: 600; }
        td { border-bottom: 1px solid #ddd; padding: 12px; }
        tr:hover { background-color: #f9f9f9; }
        .status-badge { display: inline-block; padding: 6px 10px; border-radius: 3px; font-size: 12px; font-weight: 600; }
        .status-pending { background-color: #fff3e0; color: #f57c00; }
        .status-approved { background-color: #e8f5e9; color: #388e3c; }
        .status-rejected { background-color: #ffebee; color: #c62828; }
        .btn { padding: 10px 16px; border: none; border-radius: 4px; cursor: pointer; font-weight: 600; font-size: 14px; }
        .btn-primary { background-color: #0055cc; color: white; }
        .btn-primary:hover { background-color: #0044a4; }
        .btn-success { background-color: #388e3c; color: white; }
        .btn-success:hover { background-color: #2e7d32; }
        .btn-danger { background-color: #d32f2f; color: white; }
        .btn-danger:hover { background-color: #b71c1c; }
        .modal { display: none; position: fixed; top: 0; left: 0; width: 100%; height: 100%; background-color: rgba(0,0,0,0.5); z-index: 1000; }
        .modal.active { display: flex; align-items: center; justify-content: center; }
        .modal-content { background: white; border-radius: 8px; padding: 30px; max-width: 500px; width: 90%; max-height: 90vh; overflow-y: auto; }
        .modal-header { margin-bottom: 20px; }
        .modal-header h2 { font-size: 22px; }
        .form-group { margin-bottom: 16px; }
        .form-group label { display: block; font-weight: 600; margin-bottom: 6px; }
        .form-group textarea { width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 4px; font-size: 14px; min-height: 100px; }
        .form-actions { display: flex; gap: 10px; justify-content: flex-end; margin-top: 20px; }
        .no-data { text-align: center; padding: 40px; color: #999; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Incident Approvals</h1>
            <p>Review and manage incident dispute approvals</p>
        </div>

        <div class="tabs">
            <button class="tab active" onclick="switchTab('pending')">⏳ Pending Approval</button>
            <button class="tab" onclick="switchTab('approved')">✓ Approved</button>
            <button class="tab" onclick="switchTab('rejected')">✕ Rejected</button>
        </div>

        <div class="content">
            <div id="pending" class="tab-content" style="display: block;">
                <h3>Pending Approval</h3>
                <table>
                    <thead>
                        <tr>
                            <th>Incident #</th>
                            <th>Student</th>
                            <th>Book</th>
                            <th>Fee</th>
                            <th>Submitted</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody id="pending-tbody">
                        <tr><td colspan="6" class="no-data">No pending approvals</td></tr>
                    </tbody>
                </table>
            </div>

            <div id="approved" class="tab-content" style="display: none;">
                <h3>Approved Incidents</h3>
                <table>
                    <thead>
                        <tr>
                            <th>Incident #</th>
                            <th>Student</th>
                            <th>Book</th>
                            <th>Fee</th>
                            <th>Approved Date</th>
                        </tr>
                    </thead>
                    <tbody id="approved-tbody">
                        <tr><td colspan="5" class="no-data">No approved incidents</td></tr>
                    </tbody>
                </table>
            </div>

            <div id="rejected" class="tab-content" style="display: none;">
                <h3>Rejected Incidents</h3>
                <table>
                    <thead>
                        <tr>
                            <th>Incident #</th>
                            <th>Student</th>
                            <th>Book</th>
                            <th>Reason</th>
                            <th>Rejected Date</th>
                        </tr>
                    </thead>
                    <tbody id="rejected-tbody">
                        <tr><td colspan="5" class="no-data">No rejected incidents</td></tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>

    <!-- Approval Modal -->
    <div id="approval-modal" class="modal">
        <div class="modal-content">
            <div class="modal-header">
                <h2 id="modal-title">Review Incident</h2>
            </div>
            <div id="incident-details"></div>
            <div class="form-group">
                <label>Decision</label>
                <select id="approval-decision" style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 4px;">
                    <option value="">-- Select --</option>
                    <option value="approved">Approve</option>
                    <option value="rejected">Reject</option>
                    <option value="needs_info">Request More Information</option>
                </select>
            </div>
            <div class="form-group">
                <label>Notes</label>
                <textarea id="approval-notes" placeholder="Enter approval notes or reason for rejection..."></textarea>
            </div>
            <div class="form-actions">
                <button class="btn" onclick="closeApprovalModal()" style="background-color: #ddd; color: #333;">Cancel</button>
                <button class="btn btn-primary" onclick="submitApproval()">Submit Decision</button>
            </div>
        </div>
    </div>

    <script>
        let currentIncidentId = null;

        document.addEventListener('DOMContentLoaded', function() {
            loadApprovals();
        });

        function loadApprovals() {
            // Fetch pending approvals
            fetch('/api/acadresolve/approvals?status=pending&limit=50')
                .then(r => r.json())
                .then(data => {
                    if (data.approvals) {
                        const tbody = document.getElementById('pending-tbody');
                        if (data.approvals.length > 0) {
                            tbody.innerHTML = data.approvals.map(a => \`
                                <tr>
                                    <td><strong>\${a.incident_number}</strong></td>
                                    <td>\${a.student_id}</td>
                                    <td>\${a.book_title}</td>
                                    <td>\$\${parseFloat(a.fee).toFixed(2)}</td>
                                    <td>\${new Date(a.submitted_date).toLocaleDateString()}</td>
                                    <td>
                                        <button class="btn btn-primary" onclick="openApprovalModal('\${a.incident_id}')">Review</button>
                                    </td>
                                </tr>
                            \`).join('');
                        }
                    }
                })
                .catch(err => console.error('Error loading approvals:', err));
        }

        function switchTab(tabName) {
            // Hide all tabs
            document.querySelectorAll('.tab-content').forEach(el => el.style.display = 'none');
            document.querySelectorAll('.tab').forEach(el => el.classList.remove('active'));
            
            // Show selected tab
            document.getElementById(tabName).style.display = 'block';
            event.target.classList.add('active');
        }

        function openApprovalModal(incidentId) {
            currentIncidentId = incidentId;
            fetch('/api/acadresolve/incidents/' + incidentId)
                .then(r => r.json())
                .then(data => {
                    document.getElementById('incident-details').innerHTML = \`
                        <div style="background-color: #f5f5f5; padding: 15px; border-radius: 4px; margin-bottom: 20px;">
                            <p><strong>Incident:</strong> \${data.number}</p>
                            <p><strong>Student:</strong> \${data.student_id}</p>
                            <p><strong>Book:</strong> \${data.book_title}</p>
                            <p><strong>Damage:</strong> \${data.damage_type} - \${data.damage_level}</p>
                            <p><strong>Requested Fee:</strong> \$\${parseFloat(data.calculated_fee || 0).toFixed(2)}</p>
                        </div>
                    \`;
                    document.getElementById('approval-modal').classList.add('active');
                })
                .catch(err => console.error('Error loading incident:', err));
        }

        function closeApprovalModal() {
            document.getElementById('approval-modal').classList.remove('active');
            document.getElementById('approval-decision').value = '';
            document.getElementById('approval-notes').value = '';
            currentIncidentId = null;
        }

        function submitApproval() {
            if (!currentIncidentId) return;
            
            const decision = document.getElementById('approval-decision').value;
            const notes = document.getElementById('approval-notes').value;
            
            if (!decision) {
                alert('Please select a decision');
                return;
            }

            fetch('/api/acadresolve/approvals/submit', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    incident_id: currentIncidentId,
                    approval_status: decision,
                    notes: notes
                })
            })
            .then(r => r.json())
            .then(response => {
                alert('Approval decision submitted');
                closeApprovalModal();
                loadApprovals();
            })
            .catch(err => alert('Error: ' + err.message));
        }
    </script>
</body>
</html>
    `,
    direct: true,
})
