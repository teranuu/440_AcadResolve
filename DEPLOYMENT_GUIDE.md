# Academic Resolve - Deployment Guide

## Overview
This guide provides step-by-step instructions for deploying the Academic Resolve book dispute resolution system to a ServiceNow instance.

---

## Pre-Deployment Checklist

### Prerequisites
- [ ] ServiceNow instance with Orlando release or later
- [ ] Admin access to the ServiceNow instance
- [ ] Required plugins installed:
  - Integration Hub
  - Flow Designer
  - Service Portal
  - NOW Experience UI
- [ ] Node.js 16+ installed locally (for building)
- [ ] Git repository access
- [ ] External API credentials (payment gateway, email service, AI service)

### Required Credentials
Before deployment, gather the following:
- **Payment Gateway**: API key and endpoint
- **Email Service**: SMTP server, username, password
- **Copilot AI**: Client ID and secret
- **LMS Integration**: API key
- **Analytics**: API key (optional)

---

## Step-by-Step Deployment

### Phase 1: Prepare Environment

#### 1.1 Install Required Plugins
1. In ServiceNow, navigate to **System Applications > Plugins**
2. Search for and install:
   - `com.snc.integration_hub` (Integration Hub)
   - `com.snc.flow_designer` (Flow Designer)
   - `com.snc.service_portal` (Service Portal)
   - `com.snc.nowx` (NOW Experience)

#### 1.2 Create Scoped Application
1. Navigate to **System Applications > Applications > Scoped Applications**
2. Click **New**
3. Fill in:
   - **Name**: Academic Resolve
   - **Scope**: x-1997678-acad-resolve
   - **Version**: 1.0.0
4. Click **Create**

#### 1.3 Set System Properties
1. Navigate to **System Properties > System Properties**
2. Add these properties:
   ```
   x_1997678_acad_resolve.payment_gateway_api_key = [YOUR_API_KEY]
   x_1997678_acad_resolve.payment_gateway_url = [YOUR_ENDPOINT]
   x_1997678_acad_resolve.smtp_server = [YOUR_SMTP_SERVER]
   x_1997678_acad_resolve.smtp_password = [ENCRYPTED_PASSWORD]
   x_1997678_acad_resolve.copilot_client_id = [YOUR_CLIENT_ID]
   x_1997678_acad_resolve.copilot_secret = [YOUR_SECRET]
   x_1997678_acad_resolve.lms_api_key = [YOUR_LMS_KEY]
   ```

### Phase 2: Create Database Tables

#### 2.1 Import Database Schema
1. Navigate to **System Definition > Tables**
2. Click **New**
3. For each table in `config/database_schema.xml`:
   - Create: `x_1997678_acad_resolve_book_incident`
   - Create: `x_1997678_acad_resolve_fee_schedule`
   - Create: `x_1997678_acad_resolve_approval`

#### 2.2 Create Indexes
1. For each table, add indexes from the schema file
2. Recommended indexes:
   - `x_1997678_acad_resolve_book_incident`: student_id, state, sys_created_on
   - `x_1997678_acad_resolve_approval`: incident_id

### Phase 3: Configure User Roles & Access

#### 3.1 Create User Roles
1. Navigate to **System Security > Roles**
2. Create these roles:
   - `acad_resolve.admin` - Full system access
   - `acad_resolve.library_staff` - Can review incidents
   - `acad_resolve.student` - Can create incidents
   - `acad_resolve.approver` - Can approve disputes

#### 3.2 Apply Role Permissions
Using `config/user_roles_access.xml`, configure ACLs:
1. Navigate to **System Security > Access Control (ACL)**
2. Create records matching the ACL definitions
3. Test with sample users

#### 3.3 Assign Users to Roles
1. Navigate to **System Security > Users**
2. For each user:
   - Open their record
   - Add appropriate roles

### Phase 4: Create Business Rules

#### 4.1 Import Business Rules
1. Navigate to **System Policy > Business Rules**
2. Import all rules from `config/business_rules.xml`:
   - Auto Calculate Fee
   - Notify Library on Incident
   - Close Incident on Payment
   - Validate Incident Data
   - Set Priority by Damage

#### 4.2 Test Business Rules
Create a test incident and verify:
- [ ] Fee is calculated automatically
- [ ] Status updates work correctly
- [ ] Notifications are sent

### Phase 5: Add Client Scripts & UI Actions

#### 5.1 Import Client Scripts
1. Navigate to **System UI > Client Scripts**
2. Import from `config/client_scripts.xml`:
   - Validate Incident Form
   - Calculate Fee Preview
   - Show/Hide Fields Based on Type
   - Check User Permissions
   - Handle Photo Upload

#### 5.2 Import UI Actions
1. Navigate to **System UI > UI Actions**
2. Import from `config/ui_actions.xml`:
   - Create Payment Request
   - Approve Replacement
   - Send for Review
   - Close Dispute
   - Get AI Assessment
   - Reject Dispute

### Phase 6: Configure Notifications

#### 6.1 Create Email Templates
1. Navigate to **System Notification > Email**
2. Import notification templates from `config/notifications.xml`
3. Configure SMTP settings

#### 6.2 Set Up Notification Events
1. Navigate to **System Notification > Event**
2. Create events:
   - `x_1997678_acad_resolve.incident_created`
   - `x_1997678_acad_resolve.approval_requested`
   - `x_1997678_acad_resolve.payment_received`
   - (etc. - see notifications.xml)

### Phase 7: Configure Integration Hub

#### 7.1 Set Up Connections
1. Navigate to **Integration Hub > Connections**
2. Create connections:
   - **Payment Gateway**: REST API endpoint
   - **Email Service**: SMTP connection
   - **Copilot API**: OAuth 2.0
   - **LMS API**: REST API

#### 7.2 Create Integration Actions
1. Navigate to **Integration Hub > Integrations**
2. Create integration actions from `config/integration_hub.xml`:
   - Payment Gateway Connector
   - SMTP Email Service
   - Copilot AI Assessment
   - LMS Student Verification

### Phase 8: Create Flow Designer Flows

#### 8.1 Import Flows
1. Navigate to **Flow Designer**
2. Create flows from `config/flows.xml`:
   - Incident Intake Flow
   - Incident Approval Workflow
   - Payment Processing Flow
   - Incident Escalation Flow

#### 8.2 Test Flows
1. Execute each flow with test data
2. Verify all steps execute correctly
3. Check integrations are called

### Phase 9: Set Up Service Portal

#### 9.1 Create Portal Page
1. Navigate to **Service Portal > Portals**
2. Create new portal: "Academic Resolve"
3. Set as available for students

#### 9.2 Add Portal Widgets
1. From `config/service_portal.xml`, add:
   - Report Book Incident
   - My Incidents
   - Payment Portal
   - Help & FAQ

#### 9.3 Configure Page Layout
1. Arrange widgets on portal page
2. Set permissions for each widget
3. Test widget functionality

### Phase 10: Deploy Frontend Application

#### 10.1 Build React Application
```bash
cd project-root
npm install
npm run build
```

#### 10.2 Deploy to ServiceNow
```bash
npm run deploy
```

#### 10.3 Verify Frontend
1. Navigate to the deployed portal
2. Test form submission
3. Verify incident creation

### Phase 11: Initialize Fee Schedule

#### 11.1 Create Fee Schedule Records
1. Navigate to **Academic Resolve > Fee Schedule**
2. Add fee rules:

| Damage Type | Level | Fee % |
|-------------|-------|-------|
| lost | - | 100 |
| water_damage | light | 25 |
| water_damage | medium | 50 |
| water_damage | high | 100 |
| physical_damage | light | 20 |
| physical_damage | medium | 40 |
| physical_damage | high | 80 |
| tear | light | 15 |
| tear | medium | 35 |
| mold | light | 30 |
| mold | high | 100 |

### Phase 12: Testing & QA

#### 12.1 Functional Testing
- [ ] Student can create incident
- [ ] Fee is calculated correctly
- [ ] Library staff receives notification
- [ ] Approver can approve/reject
- [ ] Payment process works
- [ ] Email notifications are sent
- [ ] AI assessment is retrieved

#### 12.2 Integration Testing
- [ ] Payment gateway integration works
- [ ] Email service sends messages
- [ ] AI service responds correctly
- [ ] LMS verification works

#### 12.3 User Acceptance Testing
- [ ] Student experience is smooth
- [ ] Library staff workflow is efficient
- [ ] Approvers can make decisions
- [ ] Reports are accurate

### Phase 13: Production Deployment

#### 13.1 Backup
```bash
# Backup current instance
sn backup create --instance [INSTANCE_NAME]
```

#### 13.2 Deploy Update Set
1. Navigate to **System Update Sets > Update Sets**
2. Right-click `x_1997678_acad_resolve_updateset_v1`
3. Click **Preview Update Set**
4. Click **Commit Update Set**

#### 13.3 Verify Production
- [ ] All tables created
- [ ] All roles assigned
- [ ] All integrations configured
- [ ] Portal is accessible
- [ ] Test incident works end-to-end

---

## Post-Deployment

### Monitoring
- Monitor Integration Hub execution logs
- Check Flow Designer execution logs
- Monitor incident creation rate
- Track payment success rate

### Maintenance
- Regular backup schedule
- Update fee schedules as needed
- Monitor system performance
- User support and training

### Support
For issues or questions:
1. Check application logs
2. Review Integration Hub connections
3. Verify API credentials
4. Contact ServiceNow support if needed

---

## Rollback Procedure

If issues occur:
1. Navigate to **System Update Sets**
2. Find `x_1997678_acad_resolve_updateset_v1`
3. Click **Rollback**
4. Verify tables and configurations removed
5. Restore from backup if necessary

---

## Performance Tuning

### Database Optimization
- Add indexes on frequently queried fields
- Archive old closed incidents
- Optimize business rule triggers

### Integration Optimization
- Batch payment requests
- Cache fee schedule lookups
- Optimize API response times

### Scaling
- Monitor database growth
- Plan for archival strategy
- Consider load balancing

---

## Additional Resources
- ServiceNow Documentation: https://docs.servicenow.com
- Integration Hub Guide: https://docs.servicenow.com/integration-hub
- Flow Designer Reference: https://docs.servicenow.com/flow-designer
- Service Portal Admin Guide: https://docs.servicenow.com/service-portal
