# Academic Book Dispute Resolution System (Zurich)
## Lost/Damaged Book Dispute & Settlement Application

### Project Overview
A comprehensive ServiceNow application for managing lost/damaged book disputes in academic institutions. Students can report incidents, upload photos, view charges, and complete payments or replacements.

### Application Scope
- **Scope Name**: x-1997678-acad-resolve
- **Version**: 1.0.0
- **Sector**: Education
- **Target Users**: Academic Libraries (HEI/K-12)

---

## Implementation Components

### 1. Database & Tables
- **x_1997678_acad_resolve_book_incident**: Main incident table
- **x_1997678_acad_resolve_fee_schedule**: Fee calculation reference
- **x_1997678_acad_resolve_approval**: Approval tracking

### 2. Business Rules
- **Auto-Calculate Fee**: Calculates fees based on book type and damage level
- **Set Incident Status**: Updates status based on payment/replacement
- **Notify Academic Library**: Sends notification on incident creation
- **Send Approval Email**: Triggers approval workflow

### 3. Client Scripts
- **Validate Form**: Client-side validation for incident data
- **Calculate Fee Preview**: Real-time fee calculation on form
- **Photo Upload Handler**: Manages photo attachments
- **Permission Checker**: Validates user access

### 4. UI Actions
- **Create Payment Request**: Initiates payment process
- **Approve Replacement**: Marks item as replaced
- **Send for Review**: Escalates to library staff
- **Close Dispute**: Final closure with notes

### 5. Notifications
- **Inbound Email**: Process incoming dispute notifications
- **Outbound Email**: Confirmation to student
- **Approval Email**: Approval request to staff
- **Resolution Email**: Dispute resolution notification

### 6. Integration Hub
- **Payment Gateway Integration**: Process payments via external API
- **Email Service Integration**: Send notifications via SMTP
- **AI Service Integration**: Copilot for dispute assessment

### 7. Flow Designer
- **Incident Intake Flow**: Capture and categorize incident
- **Approval Workflow**: Route approvals to library staff
- **Payment Processing Flow**: Handle payment and closure
- **Escalation Flow**: Route complex cases to managers

### 8. Service Portal
- **Self-Service Incident Form**: Students submit disputes
- **Incident Tracking**: View incident status and history
- **Payment Portal**: Process payments and replacements
- **FAQ Widget**: Help and guidance

### 9. User Roles & Access
- **acad_resolve.admin**: Full access to configuration
- **acad_resolve.library_staff**: Can approve replacements
- **acad_resolve.student**: Can create incidents and view own records
- **acad_resolve.approver**: Can approve disputes and fees

### 10. AI Integration (Copilot)
- **Dispute Assessment**: AI categorizes damage level
- **Fee Recommendation**: AI suggests appropriate fees
- **Resolution Suggestion**: AI recommends resolution approach

---

## Deployment Instructions

### Prerequisites
1. ServiceNow instance with NOW SDK support
2. Active credentials for scoped application
3. Integration Hub configured
4. Email service configured

### Build & Deploy
```bash
# Install dependencies
npm install

# Build the application
npm run build

# Deploy to instance
npm run deploy

# Transform for ServiceNow
npm run transform
```

### Update Set Backup
All changes are stored in update set: `x_1997678_acad_resolve_updateset_v1`

---

## Features

### For Students
- ✅ Submit incident reports with photos
- ✅ View charges and fee breakdown
- ✅ Make payments online
- ✅ Track dispute status
- ✅ Receive notifications

### For Library Staff
- ✅ Review incidents
- ✅ Approve or deny claims
- ✅ Manage replacements
- ✅ View analytics and reports

### For Administrators
- ✅ Configure fee schedules
- ✅ Manage user roles
- ✅ Configure integrations
- ✅ Monitor system health

---

## Configuration References

See individual component files in `/config/` for detailed ServiceNow XML/JSON configurations.
