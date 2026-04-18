# Academic Resolve - Quick Reference Guide

## 🚀 For Developers

### Common Tasks

#### Build and Deploy
```bash
# Build the application
npm run build

# Deploy to ServiceNow
npm run deploy

# Generate types
npm run types

# Transform for ServiceNow
npm run transform
```

#### API Client Usage
```javascript
import { IncidentService } from './services/IncidentService'

const service = new IncidentService()

// List incidents
const incidents = await service.list({ state: 'open' })

// Get single incident
const incident = await service.get(incidentId)

// Create incident
const newIncident = await service.create({
    student_id: 'john.smith',
    book_title: 'Computer Science 101',
    book_isbn: '978-0-13-123456-7',
    book_value: 99.99,
    damage_type: 'water_damage',
    damage_level: 'medium',
    incident_date: '2024-01-15',
    description: 'Book was dropped in water'
})

// Calculate fee
const fee = await service.calculateFee({
    damage_type: 'water_damage',
    damage_level: 'medium',
    book_value: 99.99
})

// Initiate payment
const payment = await service.initiatePayment(incidentId, 'credit_card')

// Get AI assessment
const assessment = await service.assessWithAI(incidentId)
```

#### Adding New Business Rule
1. Navigate to **System Policy > Business Rules**
2. Click **New**
3. Configure:
   - Table: `x_1997678_acad_resolve_book_incident`
   - When: Choose (Before/After)
   - Insert/Update/Delete: Check as needed
4. Write script in **Script** field
5. Set **Priority** (lower number = higher priority)
6. Test with test record

#### Adding New Notification
1. Navigate to **System Notification > Email**
2. Click **New**
3. Configure:
   - Name: Descriptive name
   - Table: `x_1997678_acad_resolve_book_incident`
   - Event: Select or create event
4. Configure recipients (roles or fields)
5. Write template (HTML or text)
6. Test trigger event

---

## 👨‍💼 For Administrators

### Daily Operations

#### Check Pending Approvals
1. Navigate to **Academic Resolve > Approvals**
2. Filter for state = "pending"
3. Review and decide

#### Monitor Payment Status
1. Navigate to **Academic Resolve > Incidents**
2. Filter for state = "paid" (today)
3. Verify payment amounts

#### View Analytics
1. Navigate to **Academic Resolve > Reports**
2. Select report type:
   - Fee Collected
   - Approval Rate
   - Resolution Time
   - Damage Type Distribution

### Monthly Tasks

#### Backup Data
```bash
# In ServiceNow, navigate to System Backup
# Click "Create Backup"
# Backup now includes Academic Resolve data
```

#### Archive Old Records
1. Navigate to **Academic Resolve > Incidents**
2. Create query: state = "closed" AND resolved_date < "1 year ago"
3. Export to archive
4. Delete from production

#### Update Fee Schedule
1. Navigate to **Academic Resolve > Fee Schedule**
2. Update percentages if needed
3. Date changes in description
4. Mark old records as inactive

### Troubleshooting

#### Incident Not Creating
- Check user has `acad_resolve.student` role
- Verify table exists: `x_1997678_acad_resolve_book_incident`
- Check business rule logs for errors
- Verify form submission (client scripts)

#### Fee Not Calculating
- Verify fee schedule has matching damage_type/damage_level
- Check business rule is active
- Review business rule execution logs
- Manual calculation: percentage × book_value ÷ 100

#### Emails Not Sending
- Navigate to **System Notification > Email**
- Check SMTP configuration
- Test SMTP connection
- Verify recipient email addresses valid
- Check notification event was triggered

#### Payment Integration Failing
- Verify API key in System Properties
- Test payment gateway connection
- Check Integration Hub logs
- Verify incident amount > 0

#### AI Assessment Not Working
- Verify Copilot credentials configured
- Check incident has description
- Verify photos uploaded (if required)
- Check Copilot service status

---

## 📊 For Library Staff

### Processing an Incident

#### Step 1: Review
1. Login to Service Portal
2. Go to "Academic Resolve"
3. Click incident to review
4. Check:
   - Student identity verified
   - Damage description matches damage level
   - Book value reasonable
   - Photos attached (if applicable)

#### Step 2: Decide
- **If legitimate**:
  - Click "Approve Replacement"
  - Student will receive approval email
  
- **If questionable**:
  - Click "Send for Review"
  - Manager will review and decide

- **If not eligible**:
  - Click "Reject Dispute"
  - Student will receive rejection with reason

#### Step 3: Follow-up
- When payment received: Click "Record Payment" → incident closes
- When replacement requested: Coordinate with circulation desk
- Document all notes in incident record

### Reports to Run

```
Report 1: Pending Incidents
Navigate to: Academic Resolve > Reports > Pending by Date
Shows: Incidents waiting for approval, sorted by date

Report 2: Weekly Summary
Navigate to: Academic Resolve > Reports > Weekly Summary
Shows: Incidents created, approved, paid, rejected

Report 3: Student Disputes
Navigate to: Academic Resolve > Reports > By Student
Shows: Breakdown by student for accountability
```

---

## 🔐 For Security Team

### Access Review Checklist
- [ ] Only students have `acad_resolve.student` role
- [ ] Only librarians have `acad_resolve.library_staff` role
- [ ] Only managers have `acad_resolve.approver` role
- [ ] Admins have `acad_resolve.admin` role
- [ ] No excessive permissions granted
- [ ] Payment data encrypted
- [ ] API credentials stored securely
- [ ] Audit logs enabled

### Audit Trail
- Navigate to: **System Audit > Audit Log**
- Search for table: `x_1997678_acad_resolve_book_incident`
- Review changes by: User, Date, Field

### Data Export/Retention
- Incidents archived after 3 years
- Payment data retained for accounting
- Student PII handled per FERPA
- Backups encrypted and stored securely

---

## 🧪 Testing Scenarios

### Test Case 1: Create Incident
```
1. Login as student
2. Navigate to Service Portal
3. Click "Report Book Incident"
4. Fill form:
   - Book: "Test Book"
   - ISBN: "000-0000000000"
   - Value: $50.00
   - Damage: Water Damage / Medium
   - Date: Today
   - Description: "Test description"
5. Submit
Expected: Incident created, confirmation email sent, fee calculated
```

### Test Case 2: Approve Dispute
```
1. Login as library staff
2. View pending incident
3. Click "Approve Replacement"
Expected: Status changes to "replacement_approved", approval email sent
```

### Test Case 3: Process Payment
```
1. Student clicks "Create Payment Request"
2. Fill payment form
3. Submit to gateway
Expected: Payment processed, incident marked "paid", confirmation email
```

### Test Case 4: AI Assessment
```
1. Login as admin
2. Open incident
3. Click "Get AI Assessment"
Expected: AI analysis displayed with confidence score and recommendations
```

---

## 📞 Support Contacts

### Internal Support
- **System Admin**: admin@university.edu
- **Payment Issues**: payments@university.edu
- **AI/Integration Issues**: devops@university.edu

### External Support
- **Payment Gateway**: support@paymentgateway.com
- **ServiceNow**: support.servicenow.com
- **Copilot AI**: support@copilot.ai

---

## 🔗 Useful Links

- ServiceNow Instance: https://instance.service-now.com
- Service Portal: https://instance.service-now.com/sp
- Integration Hub: https://instance.service-now.com/integration_hub
- Flow Designer: https://instance.service-now.com/flow_designer
- Documentation Wiki: (internal link)

---

## 🎓 Training Resources

### For Students
- Service Portal Help & FAQ
- Video Tutorial: "How to Report a Dispute"
- FAQ Email Template
- In-person training sessions

### For Library Staff
- Staff Manual: Academic Resolve Operations
- Video Tutorial: "Processing Disputes"
- Weekly training sessions
- Shadowing program

### For Administrators
- Admin Manual: System Configuration
- Video Tutorial: "System Administration"
- Architecture documentation
- Database schema guide

---

## 📋 Checklist: First-Time Setup

- [ ] ServiceNow instance configured
- [ ] Required plugins installed
- [ ] Database tables created
- [ ] User roles created and assigned
- [ ] Business rules activated
- [ ] Client scripts deployed
- [ ] Notifications configured
- [ ] Integration Hub connections tested
- [ ] Payment gateway connected
- [ ] Email service configured
- [ ] Copilot AI configured
- [ ] Flow Designer flows activated
- [ ] Service Portal widgets deployed
- [ ] Fee schedule initialized
- [ ] Test users created
- [ ] End-to-end test completed
- [ ] Documentation reviewed
- [ ] Staff trained
- [ ] System goes live

---

**Version**: 1.0.0  
**Last Updated**: January 2024  
**Maintained By**: Development Team
