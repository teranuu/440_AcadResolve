import '@servicenow/sdk/global'
import { UiPage } from '@servicenow/sdk/core'

/**
 * Academic Resolve Dashboard UI Page
 * Comprehensive dashboard with statistics and quick actions
 */
UiPage({
    $id: Now.ID['dashboard_ui_page'],
    endpoint: 'x_1997678_acadreso_dashboard.do',
    description: 'Academic Resolve - Dashboard',
    category: 'general',
    html: String.raw`
<!DOCTYPE html>
<html>
<head>
    <title>Academic Resolve - Dashboard</title>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        html, body { width: 100%; height: 100%; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif; }
        body { background-color: #f5f5f5; color: #333; }
        .dashboard { display: flex; flex-direction: column; height: 100vh; }
        .header { background: linear-gradient(135deg, #0055cc 0%, #0044a4 100%); color: white; padding: 25px; }
        .header h1 { font-size: 32px; margin-bottom: 5px; }
        .header p { font-size: 14px; opacity: 0.9; }
        .content { flex: 1; overflow-y: auto; padding: 25px; }
        .container { max-width: 1400px; margin: 0 auto; }
        .grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 20px; margin-bottom: 30px; }
        .card { background: white; padding: 25px; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); }
        .card h3 { font-size: 13px; color: #999; margin-bottom: 12px; font-weight: 600; text-transform: uppercase; }
        .card .big-number { font-size: 42px; font-weight: 700; color: #0055cc; margin-bottom: 8px; }
        .card .subtitle { font-size: 12px; color: #999; }
        .stat-row { display: flex; align-items: center; justify-content: space-between; padding: 12px 0; border-bottom: 1px solid #eee; }
        .stat-row:last-child { border-bottom: none; }
        .stat-label { font-size: 14px; color: #666; }
        .stat-value { font-size: 16px; font-weight: 700; color: #0055cc; }
        .chart-container { background: white; padding: 25px; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); margin-bottom: 20px; }
        .chart-title { font-size: 16px; font-weight: 700; margin-bottom: 20px; }
        .bar-chart { display: flex; align-items: flex-end; gap: 15px; height: 150px; }
        .bar { flex: 1; background: linear-gradient(180deg, #0055cc 0%, #0044a4 100%); border-radius: 4px 4px 0 0; display: flex; align-items: flex-end; justify-content: center; color: white; font-weight: 700; font-size: 12px; }
        .bar:hover { opacity: 0.8; }
        .quick-actions { display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 15px; }
        .action-btn { padding: 15px; background: white; border: 2px solid #0055cc; color: #0055cc; border-radius: 8px; cursor: pointer; font-weight: 600; font-size: 14px; transition: all 0.2s; }
        .action-btn:hover { background: #0055cc; color: white; }
        .section-title { font-size: 20px; font-weight: 700; margin-bottom: 20px; }
        table { width: 100%; border-collapse: collapse; }
        th { background-color: #f5f5f5; border-bottom: 2px solid #ddd; padding: 12px; text-align: left; font-weight: 600; }
        td { border-bottom: 1px solid #ddd; padding: 12px; }
        tr:hover { background-color: #f9f9f9; }
        .status-badge { display: inline-block; padding: 4px 8px; border-radius: 3px; font-size: 11px; font-weight: 600; }
        .status-open { background-color: #e3f2fd; color: #0055cc; }
        .status-pending { background-color: #fff3e0; color: #f57c00; }
        .status-paid { background-color: #c8e6c9; color: #1b5e20; }
    </style>
</head>
<body>
    <div class="dashboard">
        <!-- Header -->
        <div class="header">
            <h1>📊 Academic Resolve Dashboard</h1>
            <p>Book Incident Management System - Overview & Analytics</p>
        </div>

        <!-- Main Content -->
        <div class="content">
            <div class="container">
                <!-- Quick Stats Grid -->
                <div class="grid">
                    <div class="card">
                        <h3>Total Incidents</h3>
                        <div class="big-number" id="total-incidents">0</div>
                        <div class="subtitle">All-time reports</div>
                    </div>

                    <div class="card">
                        <h3>Open Cases</h3>
                        <div class="big-number" id="open-cases">0</div>
                        <div class="subtitle">Awaiting resolution</div>
                    </div>

                    <div class="card">
                        <h3>Pending Approval</h3>
                        <div class="big-number" id="pending-approval">0</div>
                        <div class="subtitle">Under review</div>
                    </div>

                    <div class="card">
                        <h3>Total Collected</h3>
                        <div class="big-number" id="total-collected">$0</div>
                        <div class="subtitle">Payment received</div>
                    </div>
                </div>

                <!-- Activity Summary -->
                <div class="grid">
                    <div class="chart-container" style="grid-column: span 2;">
                        <div class="chart-title">Incidents by Status</div>
                        <div class="bar-chart" id="status-chart">
                            <div class="bar" style="height: 60%;">
                                <span>Open: 15</span>
                            </div>
                            <div class="bar" style="height: 40%;">
                                <span>Pending: 10</span>
                            </div>
                            <div class="bar" style="height: 80%;">
                                <span>Resolved: 20</span>
                            </div>
                        </div>
                    </div>

                    <div class="card">
                        <h3>Recent Activity</h3>
                        <div class="stat-row">
                            <span class="stat-label">This Week</span>
                            <span class="stat-value" id="this-week">5</span>
                        </div>
                        <div class="stat-row">
                            <span class="stat-label">This Month</span>
                            <span class="stat-value" id="this-month">18</span>
                        </div>
                        <div class="stat-row">
                            <span class="stat-label">Avg Fee</span>
                            <span class="stat-value" id="avg-fee">$45</span>
                        </div>
                    </div>
                </div>

                <!-- Quick Actions -->
                <div style="background: white; padding: 25px; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); margin-bottom: 20px;">
                    <div class="section-title">Quick Actions</div>
                    <div class="quick-actions">
                        <button class="action-btn" onclick="goToPage('incident-manager')">📋 View Incidents</button>
                        <button class="action-btn" onclick="goToPage('approval-manager')">✓ Approvals</button>
                        <button class="action-btn" onclick="goToPage('payment-manager')">💳 Payments</button>
                        <button class="action-btn" onclick="goToPage('reports')">📈 Reports</button>
                    </div>
                </div>

                <!-- Recent Incidents Table -->
                <div class="chart-container">
                    <div class="chart-title">Recent Incidents</div>
                    <table>
                        <thead>
                            <tr>
                                <th>Incident #</th>
                                <th>Student</th>
                                <th>Book</th>
                                <th>Damage Type</th>
                                <th>Status</th>
                                <th>Created</th>
                            </tr>
                        </thead>
                        <tbody id="recent-incidents">
                            <tr><td colspan="6" style="text-align: center; color: #999;">Loading...</td></tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>

    <script>
        document.addEventListener('DOMContentLoaded', function() {
            loadDashboardData();
        });

        function loadDashboardData() {
            // Load incidents
            fetch('/api/acadresolve/incidents?limit=100')
                .then(r => r.json())
                .then(data => {
                    if (data.incidents) {
                        const incidents = data.incidents;
                        
                        // Update stats
                        document.getElementById('total-incidents').textContent = incidents.length;
                        
                        const open = incidents.filter(i => i.state === 'open').length;
                        const pending = incidents.filter(i => i.state === 'pending').length;
                        document.getElementById('open-cases').textContent = open;
                        document.getElementById('pending-approval').textContent = pending;

                        // Calculate totals
                        const totalCollected = incidents
                            .filter(i => i.state === 'paid')
                            .reduce((sum, i) => sum + (parseFloat(i.calculated_fee) || 0), 0);
                        document.getElementById('total-collected').textContent = '$' + totalCollected.toFixed(2);

                        // Display recent incidents
                        const recent = incidents.slice(0, 5);
                        let html = '';
                        for (let i = 0; i < recent.length; i++) {
                            const inc = recent[i];
                            const status = (inc.state || 'open').toLowerCase();
                            html += '<tr><td><strong>' + inc.number + '</strong></td>';
                            html += '<td>' + inc.student_id + '</td>';
                            html += '<td>' + inc.book_title + '</td>';
                            html += '<td>' + inc.damage_type + '</td>';
                            html += '<td><span class="status-badge status-' + status + '">' + inc.state + '</span></td>';
                            html += '<td>' + new Date(inc.created_on).toLocaleDateString() + '</td>';
                            html += '</tr>';
                        }
                        document.getElementById('recent-incidents').innerHTML = html;
                    }
                })
                .catch(err => console.error('Error loading dashboard:', err));
        }

        function goToPage(page) {
            const pages = {
                'incident-manager': '/now/nav/ui_page/x_1997678_acadreso_incident_manager',
                'approval-manager': '/now/nav/ui_page/x_1997678_acadreso_approval_manager',
                'payment-manager': '/now/nav/ui_page/x_1997678_acadreso_payment_manager',
                'reports': '/now/nav/ui_page/reports'
            };
            
            if (pages[page]) {
                window.location.href = pages[page];
            }
        }
    </script>
</body>
</html>
    `,
    direct: true,
})
