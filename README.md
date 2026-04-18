# Academic Resolve - Book Dispute Resolution System

A comprehensive ServiceNow scoped application for managing lost and damaged book disputes in academic institutions. Students can report incidents, upload photos, view calculated fees, and complete payments or arrange replacements through an intuitive Service Portal and React frontend.

## 🎯 Project Overview

**Sector**: Education  
**Problem**: Students want fair charges for lost/damaged library items  
**Solution**: Automated intake, fee calculation, approval workflow, and payment processing

### Key Features
- ✅ Self-service incident reporting with photos
- ✅ Automatic fee calculation based on damage type and level
- ✅ Multi-stage approval workflow
- ✅ Online payment processing via payment gateway
- ✅ Email notifications and approvals
- ✅ AI-powered dispute assessment using Copilot
- ✅ Comprehensive analytics and reporting
- ✅ Service Portal for students and staff
- ✅ Replacement management

---

## 📁 Project Structure

```
440_AcadResolve/
├── src/
│   ├── client/                          # React frontend application
│   │   ├── components/
│   │   │   ├── IncidentForm.jsx        # Form to report incidents
│   │   │   └── IncidentList.jsx        # List of incidents
│   │   ├── services/
│   │   │   └── IncidentService.js      # API client for backend
│   │   ├── app.jsx                      # Main application component
│   │   ├── main.jsx                     # Entry point
│   │   ├── index.html                   # HTML template
│   │   └── app.css                      # Application styles
│   └── fluent/
│       ├── index.now.ts                 # Main API routes and business logic
│       └── generated/
│           └── keys.ts                  # Generated configuration
├── config/
│   ├── business_rules.xml               # Server-side business logic
│   ├── client_scripts.xml               # Browser-side validation
│   ├── ui_actions.xml                   # Custom UI actions
│   ├── notifications.xml                # Email templates & events
│   ├── integration_hub.xml              # External API integrations
│   ├── flows.xml                        # Flow Designer workflows
│   ├── service_portal.xml               # Service Portal widgets
│   ├── user_roles_access.xml            # User roles & permissions
│   ├── database_schema.xml              # Database table definitions
│   ├── sample_data.xml                  # Sample fee schedules & test data
│   └── UPDATESET_MANIFEST.xml           # Update set configuration
├── IMPLEMENTATION_GUIDE.md              # Implementation overview
├── DEPLOYMENT_GUIDE.md                  # Step-by-step deployment
├── package.json                         # NPM dependencies
├── now.config.json                      # ServiceNow configuration
├── now.prebuild.mjs                     # Build configuration
└── README.md                            # This file
```

---

## 🚀 Quick Start

### Prerequisites
- Node.js 16 or higher
- ServiceNow Orlando release or later
- Required plugins: Integration Hub, Flow Designer, Service Portal
- External service credentials (payment gateway, email, AI)

### Local Development

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd 440_AcadResolve
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Build the application**
   ```bash
   npm run build
   ```

4. **Deploy to ServiceNow**
   ```bash
   npm run deploy
   ```

### Deployment to Production

See [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md) for comprehensive step-by-step instructions.

---

## 🏗️ Application Components

### 1. Database Tables

| Table | Purpose |
|-------|---------|
| `x_1997678_acad_resolve_book_incident` | Main incident records |
| `x_1997678_acad_resolve_fee_schedule` | Fee calculation rules |
| `x_1997678_acad_resolve_approval` | Approval workflow tracking |

### 2. Business Rules (5 total)

| Rule | Trigger | Purpose |
|------|---------|---------|
| Auto Calculate Fee | Insert/Update | Calculates fee based on damage type and level |
| Notify Library on Incident | Insert | Sends notification to library staff |
| Close Incident on Payment | Update | Closes incident when payment is recorded |
| Validate Incident Data | Insert/Update | Validates required fields |
| Set Priority by Damage | Insert/Update | Sets incident priority automatically |

### 3. Client Scripts (5 total)

| Script | Type | Purpose |
|--------|------|---------|
| Validate Incident Form | onSubmit | Client-side form validation |
| Calculate Fee Preview | onChange | Real-time fee calculation |
| Show/Hide Fields Based on Type | onChange | Dynamic field visibility |
| Check User Permissions | onLoad | Role-based field access |
| Handle Photo Upload | onLoad | Photo attachment management |

### 4. UI Actions (6 total)

| Action | Roles | Purpose |
|--------|-------|---------|
| Create Payment Request | Student, Admin | Initiate payment process |
| Approve Replacement | Library Staff, Admin | Approve item replacement |
| Send for Review | Library Staff, Admin | Escalate to manager |
| Close Dispute | Library Staff, Admin | Finalize incident |
| Get AI Assessment | Admin, Library Staff | Request AI analysis |
| Reject Dispute | Approver, Admin | Reject claim |

### 5. Notifications (7 total)

- Incident Created (to Library Staff)
- Incident Confirmation (to Student)
- Approval Requested (to Manager)
- Dispute Approved (to Student)
- Dispute Rejected (to Student)
- Payment Received (to Student & Staff)
- Replacement Completed (to Student)

### 6. Integration Hub (5 integrations)

| Integration | Type | Purpose |
|-------------|------|---------|
| Payment Gateway | Outbound API | Process payments |
| SMTP Email Service | Outbound SMTP | Send email notifications |
| Copilot AI Assessment | Outbound API | AI dispute analysis |
| LMS Student Verification | Outbound API | Verify student status |
| Analytics Event Tracking | Outbound API | Send metrics |

### 7. Flow Designer (4 flows)

| Flow | Trigger | Purpose |
|------|---------|---------|
| Incident Intake | Record Insert | Validate and categorize incident |
| Approval Workflow | Manual Action | Route approvals to managers |
| Payment Processing | Manual Action | Handle payments |
| Incident Escalation | Scheduled Daily | Escalate old incidents |

### 8. Service Portal (4 widgets)

| Widget | Users | Purpose |
|--------|-------|---------|
| Report Book Incident | Students | Submit new disputes |
| My Incidents | Students | Track their incidents |
| Payment Portal | Students | Pay fees online |
| Help & FAQ | Everyone | Support information |

### 9. User Roles (4 total)

| Role | Permissions |
|------|-------------|
| `acad_resolve.admin` | Full system access |
| `acad_resolve.library_staff` | Review and manage incidents |
| `acad_resolve.student` | Create and view own incidents |
| `acad_resolve.approver` | Approve disputes and fees |

---

## 🔧 Configuration

### API Endpoints

All endpoints are prefixed with `/api/now/x_1997678_acad_resolve/`

```
POST   /createIncident          - Create new incident
GET    /getIncident             - Get incident details
POST   /updateIncidentStatus    - Update incident status
GET    /listIncidents           - List incidents
POST   /calculateFee            - Calculate fee
POST   /initiatePayment         - Start payment process
POST   /submitForApproval       - Submit for approval
POST   /assessDisputeWithAI     - Get AI assessment
```

### System Properties

Configure these in System Properties:
```
x_1997678_acad_resolve.payment_gateway_api_key
x_1997678_acad_resolve.smtp_server
x_1997678_acad_resolve.copilot_client_id
x_1997678_acad_resolve.lms_api_key
```

### Fee Schedule

Initialize with provided sample data in `config/sample_data.xml`

---

## 📊 Incident States

```
open → pending_review → pending_approval → replacement_approved → paid/replaced → closed
                                        ↓
                                      rejected
```

### State Descriptions

- **open**: Initial state when incident is created
- **pending_review**: Submitted for library staff review
- **pending_approval**: Awaiting manager approval
- **replacement_approved**: Approved for replacement or payment
- **paid**: Payment received, case closed
- **replaced**: Replacement provided, case closed
- **closed**: Final state after resolution
- **rejected**: Claim denied, case closed
- **error**: Data validation error

---

## 🔐 Security & Access Control

### Role-Based Access
- Students can only see their own incidents
- Library staff can see all incidents
- Approvers can make approval decisions
- Admins have full access

### Field-Level Security
- Payment gateway IDs are read-only to users
- Approval status visible only to authorized roles
- Student IDs cannot be modified by students

### Data Protection
- All API calls authenticated via X-UserToken
- Sensitive fields encrypted in database
- SMTP passwords encrypted
- API credentials stored in system properties

---

## 📈 Monitoring & Analytics

### Key Metrics
- Incident creation rate
- Average resolution time
- Payment success rate
- Approval/rejection ratio
- AI assessment accuracy

### Integration
- Analytics events sent to analytics platform
- Real-time dashboards available
- Reports accessible to administrators

---

## 🚨 Troubleshooting

### Common Issues

**Issue**: Notifications not sending
- Check SMTP configuration
- Verify email addresses in user records
- Check notification event trigger

**Issue**: Fee not calculating
- Verify fee schedule entries exist
- Check damage type and level match
- Inspect business rule logs

**Issue**: Payment gateway fails
- Verify API credentials
- Check payment gateway connection
- Review integration logs

**Issue**: AI assessment errors
- Verify Copilot credentials
- Check incident has required fields
- Review Copilot API response

For more details, see [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md#troubleshooting)

---

## 📚 Documentation

- [IMPLEMENTATION_GUIDE.md](./IMPLEMENTATION_GUIDE.md) - Overview of all components
- [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md) - Step-by-step deployment
- [config/UPDATESET_MANIFEST.xml](./config/UPDATESET_MANIFEST.xml) - Update set contents
- [config/sample_data.xml](./config/sample_data.xml) - Sample fee schedules

---

## 🤝 Support & Contribution

### Getting Help
1. Check the FAQ section in Service Portal
2. Review system logs in ServiceNow
3. Contact Academic Library team
4. Open issue in repository

### Contributing
1. Create feature branch
2. Make changes and test thoroughly
3. Submit pull request with description
4. Code review and merge

---

## 📋 Update Set Information

**Scope**: x-1997678-acad-resolve  
**Version**: 1.0.0  
**Update Set**: x_1997678_acad_resolve_updateset_v1

To backup or transfer:
1. Navigate to System Update Sets
2. Select update set
3. Export or Transfer as needed

---

## ✅ Compliance & Standards

- ✅ FERPA compliant (student data protection)
- ✅ Follows ServiceNow best practices
- ✅ Implements role-based access control
- ✅ Audit trail logging enabled
- ✅ Data encryption for sensitive fields

---

## 📄 License

UNLICENSED - Internal use only

---

## 👥 Team

Academic Resolve Development Team
- Project Manager: [Name]
- Lead Developer: [Name]
- Quality Assurance: [Name]
- Business Analyst: [Name]

---

## 📅 Release Notes

### Version 1.0.0 (Initial Release)
- Complete incident management system
- Payment processing integration
- Email notifications
- AI assessment capability
- Service Portal interface
- Comprehensive reporting

---

**Last Updated**: January 2024  
**Application ID**: x-1997678-acad-resolve  
**Documentation Version**: 1.0.0
