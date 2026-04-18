import '@servicenow/sdk/global'
import { UiPage } from '@servicenow/sdk/core'

/**
 * Academic Resolve Payment Manager UI Page
 * Handles payment processing and tracking
 */
UiPage({
    $id: Now.ID['payment_manager_ui_page'],
    endpoint: 'x_1997678_acadreso_payment_manager.do',
    description: 'Academic Resolve - Payment Manager',
    category: 'general',
    html: String.raw`
<!DOCTYPE html>
<html>
<head>
    <title>Academic Resolve - Payments</title>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        html, body { width: 100%; height: 100%; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif; }
        body { background-color: #f5f5f5; color: #333; }
        .container { max-width: 1200px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #388e3c 0%, #2e7d32 100%); color: white; padding: 20px; border-radius: 4px; margin-bottom: 20px; }
        .header h1 { font-size: 28px; margin-bottom: 5px; }
        .header p { font-size: 14px; opacity: 0.95; }
        .stats { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 15px; margin-bottom: 20px; }
        .stat-card { background: white; padding: 20px; border-radius: 4px; box-shadow: 0 1px 3px rgba(0,0,0,0.1); }
        .stat-card h3 { font-size: 14px; color: #999; margin-bottom: 10px; }
        .stat-card .value { font-size: 28px; font-weight: 700; color: #0055cc; }
        .content { background: white; border-radius: 4px; padding: 20px; box-shadow: 0 1px 3px rgba(0,0,0,0.1); }
        table { width: 100%; border-collapse: collapse; }
        th { background-color: #f5f5f5; border-bottom: 2px solid #ddd; padding: 12px; text-align: left; font-weight: 600; }
        td { border-bottom: 1px solid #ddd; padding: 12px; }
        tr:hover { background-color: #f9f9f9; }
        .status-badge { display: inline-block; padding: 6px 10px; border-radius: 3px; font-size: 12px; font-weight: 600; }
        .status-pending { background-color: #fff3e0; color: #f57c00; }
        .status-completed { background-color: #c8e6c9; color: #1b5e20; }
        .status-failed { background-color: #ffebee; color: #c62828; }
        .btn { padding: 10px 16px; border: none; border-radius: 4px; cursor: pointer; font-weight: 600; font-size: 14px; }
        .btn-primary { background-color: #388e3c; color: white; }
        .btn-primary:hover { background-color: #2e7d32; }
        .modal { display: none; position: fixed; top: 0; left: 0; width: 100%; height: 100%; background-color: rgba(0,0,0,0.5); z-index: 1000; }
        .modal.active { display: flex; align-items: center; justify-content: center; }
        .modal-content { background: white; border-radius: 8px; padding: 30px; max-width: 500px; width: 90%; }
        .modal-header { margin-bottom: 20px; }
        .modal-header h2 { font-size: 22px; }
        .form-group { margin-bottom: 16px; }
        .form-group label { display: block; font-weight: 600; margin-bottom: 6px; }
        .form-group input, .form-group select { width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 4px; font-size: 14px; }
        .form-group input:focus, .form-group select:focus { outline: none; border-color: #388e3c; box-shadow: 0 0 0 3px rgba(56, 142, 60, 0.1); }
        .form-actions { display: flex; gap: 10px; justify-content: flex-end; margin-top: 20px; }
        .btn-cancel { background-color: #ddd; color: #333; }
        .btn-cancel:hover { background-color: #ccc; }
        .no-data { text-align: center; padding: 40px; color: #999; }
        .payment-info { background-color: #f5f5f5; padding: 15px; border-radius: 4px; margin-bottom: 20px; }
        .payment-info p { margin-bottom: 8px; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>💳 Payment Processing</h1>
            <p>Manage incident fees and payment collection</p>
        </div>

        <div class="stats">
            <div class="stat-card">
                <h3>Total Pending</h3>
                <div class="value" id="pending-count">0</div>
            </div>
            <div class="stat-card">
                <h3>Total Collected</h3>
                <div class="value" id="collected-amount">$0.00</div>
            </div>
            <div class="stat-card">
                <h3>Success Rate</h3>
                <div class="value" id="success-rate">0%</div>
            </div>
        </div>

        <div class="content">
            <h3 style="margin-bottom: 15px;">Payment Requests</h3>
            <table>
                <thead>
                    <tr>
                        <th>Incident #</th>
                        <th>Student</th>
                        <th>Amount</th>
                        <th>Status</th>
                        <th>Requested</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody id="payments-tbody">
                    <tr><td colspan="6" class="no-data">Loading payments...</td></tr>
                </tbody>
            </table>
        </div>
    </div>

    <!-- Payment Modal -->
    <div id="payment-modal" class="modal">
        <div class="modal-content">
            <div class="modal-header">
                <h2>Process Payment</h2>
            </div>
            
            <div class="payment-info" id="payment-details"></div>

            <div class="form-group">
                <label>Payment Method</label>
                <select id="payment-method">
                    <option value="">-- Select Method --</option>
                    <option value="credit_card">Credit Card</option>
                    <option value="debit_card">Debit Card</option>
                    <option value="bank_transfer">Bank Transfer</option>
                    <option value="cash">Cash / In-Person</option>
                </select>
            </div>

            <div class="form-group">
                <label>Cardholder Name</label>
                <input type="text" id="cardholder-name" placeholder="Name on card">
            </div>

            <div class="form-group">
                <label>Card Number</label>
                <input type="text" id="card-number" placeholder="1234 5678 9012 3456" maxlength="19">
            </div>

            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px;">
                <div class="form-group">
                    <label>Expiry (MM/YY)</label>
                    <input type="text" id="card-expiry" placeholder="12/25" maxlength="5">
                </div>
                <div class="form-group">
                    <label>CVV</label>
                    <input type="text" id="card-cvv" placeholder="123" maxlength="4">
                </div>
            </div>

            <div class="form-actions">
                <button class="btn btn-cancel" onclick="closePaymentModal()">Cancel</button>
                <button class="btn btn-primary" onclick="processPayment()">Submit Payment</button>
            </div>
        </div>
    </div>

    <script>
        let currentPaymentIncident = null;

        document.addEventListener('DOMContentLoaded', function() {
            loadPayments();
        });

        function loadPayments() {
            fetch('/api/acadresolve/payments?limit=50')
                .then(r => r.json())
                .then(data => {
                    const tbody = document.getElementById('payments-tbody');
                    if (data.payments && data.payments.length > 0) {
                        let html = '';
                        for (let i = 0; i < data.payments.length; i++) {
                            const p = data.payments[i];
                            const status = (p.status || 'pending').toLowerCase();
                            html += '<tr><td><strong>' + p.incident_number + '</strong></td>';
                            html += '<td>' + p.student_id + '</td>';
                            html += '<td>$' + parseFloat(p.amount).toFixed(2) + '</td>';
                            html += '<td><span class="status-badge status-' + status + '">' + (p.status || 'Pending') + '</span></td>';
                            html += '<td>' + new Date(p.created_date).toLocaleDateString() + '</td>';
                            if (p.status === 'pending') {
                                html += '<td><button class="btn btn-primary" onclick="openPaymentModal(\'' + p.incident_id + '\', ' + p.amount + ')">Pay Now</button></td>';
                            } else {
                                html += '<td>-</td>';
                            }
                            html += '</tr>';
                        }
                        tbody.innerHTML = html;
                    } else {
                        tbody.innerHTML = '<tr><td colspan="6" class="no-data">No payment requests</td></tr>';
                    }
                })
                .catch(err => {
                    console.error('Error:', err);
                    document.getElementById('payments-tbody').innerHTML = '<tr><td colspan="6" class="no-data">Error loading payments</td></tr>';
                });
        }

        function openPaymentModal(incidentId, amount) {
            currentPaymentIncident = { id: incidentId, amount: amount };
            let html = '<p><strong>Incident:</strong> ' + incidentId + '</p>';
            html += '<p><strong>Amount Due:</strong> <span style="font-size: 18px; font-weight: 700; color: #388e3c;">$' + parseFloat(amount).toFixed(2) + '</span></p>';
            document.getElementById('payment-details').innerHTML = html;
            document.getElementById('payment-modal').classList.add('active');
        }

        function closePaymentModal() {
            document.getElementById('payment-modal').classList.remove('active');
            currentPaymentIncident = null;
        }

        function processPayment() {
            if (!currentPaymentIncident) return;
            
            const method = document.getElementById('payment-method').value;
            if (!method) {
                alert('Please select a payment method');
                return;
            }

            const paymentData = {
                incident_id: currentPaymentIncident.id,
                amount: currentPaymentIncident.amount,
                method: method,
                card_number: document.getElementById('card-number').value,
                card_holder: document.getElementById('cardholder-name').value,
                expiry: document.getElementById('card-expiry').value,
                cvv: document.getElementById('card-cvv').value
            };

            fetch('/api/acadresolve/payments/initiate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(paymentData)
            })
            .then(r => r.json())
            .then(response => {
                if (response.status === 'success') {
                    alert('Payment processed successfully!');
                    closePaymentModal();
                    loadPayments();
                } else {
                    alert('Payment failed: ' + (response.error || 'Unknown error'));
                }
            })
            .catch(err => alert('Error: ' + err.message));
        }
    </script>
</body>
</html>
    `,
    direct: true,
})
