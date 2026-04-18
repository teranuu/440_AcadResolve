import '@servicenow/sdk/global'
import { UiPage } from '@servicenow/sdk/core'

/**
 * Academic Resolve Reports UI Page
 * Analytics, reporting, and data export
 */
UiPage({
    $id: Now.ID['reports_ui_page'],
    endpoint: 'x_1997678_acadreso_reports.do',
    description: 'Academic Resolve - Reports & Analytics',
    category: 'general',
    html: `
<!DOCTYPE html>
<html>
<head>
    <title>Academic Resolve - Reports</title>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        html, body { width: 100%; height: 100%; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif; }
        body { background-color: #f5f5f5; color: #333; }
        .container { max-width: 1200px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #6f42c1 0%, #5a32a3 100%); color: white; padding: 20px; border-radius: 4px; margin-bottom: 20px; }
        .header h1 { font-size: 28px; margin-bottom: 5px; }
        .header p { font-size: 14px; opacity: 0.95; }
        .filters { background: white; padding: 15px; border-radius: 4px; margin-bottom: 20px; box-shadow: 0 1px 3px rgba(0,0,0,0.1); }
        .filter-row { display: flex; gap: 15px; flex-wrap: wrap; }
        .filter-group { display: flex; flex-direction: column; }
        .filter-group label { font-size: 12px; font-weight: 600; margin-bottom: 5px; color: #666; }
        .filter-group input, .filter-group select { padding: 8px 10px; border: 1px solid #ddd; border-radius: 4px; font-size: 14px; }
        .btn { padding: 10px 16px; border: none; border-radius: 4px; cursor: pointer; font-weight: 600; font-size: 14px; }
        .btn-primary { background-color: #6f42c1; color: white; }
        .btn-primary:hover { background-color: #5a32a3; }
        .btn-secondary { background-color: #ddd; color: #333; }
        .btn-secondary:hover { background-color: #ccc; }
        .btn-export { background-color: #388e3c; color: white; }
        .btn-export:hover { background-color: #2e7d32; }
        .tabs { display: flex; gap: 10px; margin-bottom: 20px; border-bottom: 2px solid #ddd; }
        .tab { padding: 12px 20px; cursor: pointer; background: none; border: none; font-size: 16px; font-weight: 600; color: #999; border-bottom: 3px solid transparent; }
        .tab.active { color: #6f42c1; border-bottom-color: #6f42c1; }
        .tab:hover { color: #333; }
        .content { background: white; border-radius: 4px; padding: 20px; box-shadow: 0 1px 3px rgba(0,0,0,0.1); }
        .metrics-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 15px; margin-bottom: 25px; }
        .metric { background: #f5f5f5; padding: 15px; border-radius: 4px; }
        .metric-label { font-size: 12px; color: #999; font-weight: 600; }
        .metric-value { font-size: 28px; font-weight: 700; color: #6f42c1; margin-top: 8px; }
        table { width: 100%; border-collapse: collapse; }
        th { background-color: #f5f5f5; border-bottom: 2px solid #ddd; padding: 12px; text-align: left; font-weight: 600; }
        td { border-bottom: 1px solid #ddd; padding: 12px; }
        tr:hover { background-color: #f9f9f9; }
        .report-section { margin-bottom: 30px; }
        .report-section h3 { font-size: 16px; font-weight: 700; margin-bottom: 15px; padding-bottom: 10px; border-bottom: 2px solid #eee; }
        .progress-bar { width: 100%; height: 8px; background-color: #eee; border-radius: 4px; overflow: hidden; }
        .progress { height: 100%; background-color: #6f42c1; }
        .no-data { text-align: center; padding: 40px; color: #999; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>📈 Reports & Analytics</h1>
            <p>Incident statistics, trends, and data analysis</p>
        </div>

        <!-- Filters -->
        <div class="filters">
            <div class="filter-row">
                <div class="filter-group">
                    <label>Date Range</label>
                    <input type="date" id="start-date">
                </div>
                <div class="filter-group">
                    <label>To</label>
                    <input type="date" id="end-date">
                </div>
                <div class="filter-group">
                    <label>Status</label>
                    <select id="status-filter">
                        <option value="">All Statuses</option>
                        <option value="open">Open</option>
                        <option value="pending">Pending</option>
                        <option value="approved">Approved</option>
                        <option value="paid">Paid</option>
                        <option value="closed">Closed</option>
                    </select>
                </div>
                <div style="display: flex; gap: 10px; align-items: flex-end;">
                    <button class="btn btn-primary" onclick="filterReports()">Apply Filters</button>
                    <button class="btn btn-secondary" onclick="resetFilters()">Reset</button>
                </div>
            </div>
        </div>

        <!-- Tabs -->
        <div class="tabs">
            <button class="tab active" onclick="switchReportTab('summary')">📊 Summary</button>
            <button class="tab" onclick="switchReportTab('damage-analysis')">🔍 Damage Analysis</button>
            <button class="tab" onclick="switchReportTab('financial')">💰 Financial</button>
            <button class="tab" onclick="switchReportTab('students')">👥 Top Students</button>
        </div>

        <!-- Summary Tab -->
        <div class="content" id="summary" style="display: block;">
            <div class="metrics-grid">
                <div class="metric">
                    <div class="metric-label">Total Incidents</div>
                    <div class="metric-value" id="summary-total">0</div>
                </div>
                <div class="metric">
                    <div class="metric-label">Avg Resolution Time</div>
                    <div class="metric-value" id="avg-resolution">5.2 days</div>
                </div>
                <div class="metric">
                    <div class="metric-label">Approval Rate</div>
                    <div class="metric-value" id="approval-rate">87%</div>
                </div>
                <div class="metric">
                    <div class="metric-label">Collection Rate</div>
                    <div class="metric-value" id="collection-rate">92%</div>
                </div>
            </div>

            <div class="report-section">
                <h3>Incidents by Status</h3>
                <div style="margin-bottom: 15px;">
                    <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
                        <span>Open</span>
                        <span id="status-open-count">15</span>
                    </div>
                    <div class="progress-bar">
                        <div class="progress" style="width: 30%;"></div>
                    </div>
                </div>
                <div style="margin-bottom: 15px;">
                    <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
                        <span>Pending Approval</span>
                        <span id="status-pending-count">8</span>
                    </div>
                    <div class="progress-bar">
                        <div class="progress" style="width: 20%;"></div>
                    </div>
                </div>
                <div style="margin-bottom: 15px;">
                    <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
                        <span>Resolved</span>
                        <span id="status-resolved-count">27</span>
                    </div>
                    <div class="progress-bar">
                        <div class="progress" style="width: 50%;"></div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Damage Analysis Tab -->
        <div class="content" id="damage-analysis" style="display: none;">
            <div class="report-section">
                <h3>Incidents by Damage Type</h3>
                <table>
                    <thead>
                        <tr>
                            <th>Damage Type</th>
                            <th>Count</th>
                            <th>Percentage</th>
                            <th>Avg Fee</th>
                        </tr>
                    </thead>
                    <tbody id="damage-table">
                        <tr><td colspan="4" class="no-data">Loading...</td></tr>
                    </tbody>
                </table>
            </div>

            <div class="report-section">
                <h3>Damage Level Distribution</h3>
                <table>
                    <thead>
                        <tr>
                            <th>Damage Level</th>
                            <th>Count</th>
                            <th>Percentage</th>
                        </tr>
                    </thead>
                    <tbody id="damage-level-table">
                        <tr>
                            <td>Light</td>
                            <td id="level-light-count">5</td>
                            <td>10%</td>
                        </tr>
                        <tr>
                            <td>Medium</td>
                            <td id="level-medium-count">15</td>
                            <td>35%</td>
                        </tr>
                        <tr>
                            <td>High</td>
                            <td id="level-high-count">18</td>
                            <td>40%</td>
                        </tr>
                        <tr>
                            <td>Replacement</td>
                            <td id="level-replacement-count">7</td>
                            <td>15%</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>

        <!-- Financial Tab -->
        <div class="content" id="financial" style="display: none;">
            <div class="metrics-grid">
                <div class="metric">
                    <div class="metric-label">Total Revenue</div>
                    <div class="metric-value" id="total-revenue">$2,340</div>
                </div>
                <div class="metric">
                    <div class="metric-label">Avg Fee</div>
                    <div class="metric-value" id="avg-fee">$52</div>
                </div>
                <div class="metric">
                    <div class="metric-label">Pending Payment</div>
                    <div class="metric-value" id="pending-payment">$890</div>
                </div>
                <div class="metric">
                    <div class="metric-label">Disputed</div>
                    <div class="metric-value" id="disputed-amount">$120</div>
                </div>
            </div>

            <div class="report-section">
                <h3>Monthly Revenue Trend</h3>
                <p style="text-align: center; color: #999; padding: 40px;">Revenue chart visualization would appear here</p>
            </div>
        </div>

        <!-- Students Tab -->
        <div class="content" id="students" style="display: none;">
            <div class="report-section">
                <h3>Top 10 Students by Incidents</h3>
                <table>
                    <thead>
                        <tr>
                            <th>Student ID</th>
                            <th>Incidents</th>
                            <th>Total Fees</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody id="students-table">
                        <tr><td colspan="4" class="no-data">Loading...</td></tr>
                    </tbody>
                </table>
            </div>
        </div>

        <!-- Export Section -->
        <div style="background: white; padding: 20px; border-radius: 4px; margin-top: 20px; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
            <h3 style="margin-bottom: 15px;">Export Data</h3>
            <div style="display: flex; gap: 10px;">
                <button class="btn btn-export" onclick="exportCSV()">📥 Export as CSV</button>
                <button class="btn btn-export" onclick="exportPDF()">📄 Export as PDF</button>
                <button class="btn btn-export" onclick="printReport()">🖨️ Print Report</button>
            </div>
        </div>
    </div>

    <script>
        document.addEventListener('DOMContentLoaded', function() {
            setDefaultDates();
            loadReportData();
        });

        function setDefaultDates() {
            const today = new Date();
            const thirtyDaysAgo = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000);
            
            document.getElementById('start-date').value = thirtyDaysAgo.toISOString().split('T')[0];
            document.getElementById('end-date').value = today.toISOString().split('T')[0];
        }

        function switchReportTab(tab) {
            document.querySelectorAll('[id^="summary"], [id^="damage"], [id^="financial"], [id^="students"]').forEach(el => {
                el.style.display = 'none';
            });
            document.querySelectorAll('.tab').forEach(el => el.classList.remove('active'));
            
            document.getElementById(tab).style.display = 'block';
            event.target.classList.add('active');
        }

        function loadReportData() {
            fetch('/api/acadresolve/incidents?limit=100')
                .then(r => r.json())
                .then(data => {
                    if (data.incidents) {
                        const incidents = data.incidents;
                        document.getElementById('summary-total').textContent = incidents.length;
                        
                        // Damage analysis
                        const damageTypes = {};
                        incidents.forEach(inc => {
                            damageTypes[inc.damage_type] = (damageTypes[inc.damage_type] || 0) + 1;
                        });
                        
                        const damageTable = document.getElementById('damage-table');
                        damageTable.innerHTML = Object.entries(damageTypes).map(([type, count]) => \`
                            <tr>
                                <td>\${type}</td>
                                <td>\${count}</td>
                                <td>\${((count / incidents.length) * 100).toFixed(1)}%</td>
                                <td>$\${(incidents
                                    .filter(i => i.damage_type === type)
                                    .reduce((sum, i) => sum + (parseFloat(i.calculated_fee) || 0), 0) / count).toFixed(2)}</td>
                            </tr>
                        \`).join('');
                        
                        // Financial
                        const totalRevenue = incidents
                            .filter(i => i.state === 'paid')
                            .reduce((sum, i) => sum + (parseFloat(i.calculated_fee) || 0), 0);
                        document.getElementById('total-revenue').textContent = '$' + totalRevenue.toFixed(2);
                    }
                })
                .catch(err => console.error('Error loading reports:', err));
        }

        function filterReports() {
            alert('Filtering reports - coming soon!');
        }

        function resetFilters() {
            setDefaultDates();
            loadReportData();
        }

        function exportCSV() {
            alert('CSV export - coming soon!');
        }

        function exportPDF() {
            alert('PDF export - coming soon!');
        }

        function printReport() {
            window.print();
        }
    </script>
</body>
</html>
    `,
    direct: true,
})
