# Academic Resolve - ServiceNow Web IDE Deployment Guide

## ✅ Current Status

Your application code has been **validated and fixed**:
- ✅ TypeScript errors resolved in `src/fluent/index.now.ts`
- ✅ All 8 API endpoints properly exported
- ✅ GlideRecord operations correctly typed
- ✅ Frontend IncidentService client ready
- ✅ React components configured

---

## 🚀 Deployment to ServiceNow Web IDE

### Step 1: Setup ServiceNow Credentials

```bash
# Navigate to your project directory
cd "d:\Eskwela\side projects\440_AcadResolve"

# Configure credentials (interactive)
npx now-sdk auth --alias myinstance

# When prompted, enter:
# Instance URL: https://your-instance.service-now.com
# Username: your-servicenow-username
# Password: your-servicenow-password

# Set as default
npx now-sdk auth --use myinstance
```

### Step 2: Deploy to Web IDE

```bash
# Deploy the application (creates/updates in web IDE)
npm run deploy

# OR directly use:
npx now-sdk deploy
```

This will:
1. Create the scoped application in ServiceNow
2. Push all backend code (`src/fluent/index.now.ts`)
3. Deploy frontend assets
4. Register API endpoints

---

## 📋 Pre-Deployment Checklist

### In Your ServiceNow Instance

- [ ] **Required Plugins Installed**:
  - Service Portal
  - Integration Hub
  - Flow Designer
  - NOW Experience UI

- [ ] **Application Scope Created**:
  - Scope: `x_1997678_acadreso`
  - Scope ID: `974280ca839c0b109bb1c710feaad308`

- [ ] **Tables Created** (via Update Set or manually):
  - `x_1997678_acadreso_book_incident`
  - `x_1997678_acadreso_fee_schedule`
  - `x_1997678_acadreso_approval`

### Configuration Files to Import

These XML files need to be imported as an Update Set:

```
config/database_schema.xml
config/business_rules.xml
config/client_scripts.xml
config/ui_actions.xml
config/notifications.xml
config/integration_hub.xml
config/flows.xml
config/service_portal.xml
config/user_roles_access.xml
```

---

## 🔄 Deployment Process (Step-by-Step)

### Phase 1: Create Tables (Skip if already done)

1. Log into ServiceNow instance
2. Navigate to **System Definition > Tables**
3. Create three new tables:
   - **x_1997678_acadreso_book_incident** (Extends: task)
   - **x_1997678_acadreso_fee_schedule**
   - **x_1997678_acadreso_approval**

Alternatively, **import config/database_schema.xml** as an Update Set

### Phase 2: Deploy Backend API

```bash
# From your project directory
npm run deploy
```

This deploys:
- **Scoped Application**: x_1997678_acadreso
- **API Module**: REST endpoints at `/api/now/x_1997678_acad_resolve/`

### Phase 3: Import Configuration (Update Set)

1. In ServiceNow, navigate to **System Update Sets > Retrieved Update Sets**
2. Click **Import Update Set from XML**
3. Select your update set XML file
4. Click **Import**
5. Preview and **Commit Update Set**

Or manually create each component:

#### Business Rules
- Navigate to **System Policy > Business Rules**
- Create 5 rules from `config/business_rules.xml`

#### Client Scripts
- Navigate to **System UI > Client Scripts**
- Create 5 scripts from `config/client_scripts.xml`

#### UI Actions
- Navigate to **System UI > UI Actions**
- Create 6 actions from `config/ui_actions.xml`

#### Notifications
- Navigate to **System Notification > Email**
- Create 7 email templates from `config/notifications.xml`

#### Integration Hub
- Navigate to **Integration Hub > Integrations**
- Create 5 connections from `config/integration_hub.xml`
- Configure external API credentials (payment gateway, Copilot, etc.)

#### Flows
- Navigate to **Flow Designer**
- Create 4 flows from `config/flows.xml`

#### Service Portal
- Navigate to **Service Portal > Portals**
- Create/configure portal widget from `config/service_portal.xml`

#### User Roles
- Navigate to **System Security > Roles**
- Create 4 roles from `config/user_roles_access.xml`
- Assign to users

---

## 🔌 API Endpoints (After Deployment)

Your API will be available at:

```
https://your-instance.service-now.com/api/now/x_1997678_acad_resolve/
```

### Available Endpoints

```
POST   /api/now/x_1997678_acad_resolve/createIncident
GET    /api/now/x_1997678_acad_resolve/getIncident
POST   /api/now/x_1997678_acad_resolve/updateIncidentStatus
GET    /api/now/x_1997678_acad_resolve/listIncidents
POST   /api/now/x_1997678_acad_resolve/calculateFee
POST   /api/now/x_1997678_acad_resolve/initiatePayment
POST   /api/now/x_1997678_acad_resolve/submitForApproval
POST   /api/now/x_1997678_acad_resolve/assessDisputeWithAI
```

---

## 🧪 Testing API Endpoints

### Test 1: Create Incident

```bash
curl -X POST https://your-instance.service-now.com/api/now/x_1997678_acad_resolve/createIncident \
  -H "Content-Type: application/json" \
  -H "X-UserToken: $(cat ~/.now-sdk/token)" \
  -d '{
    "data": {
      "student_id": "john.smith",
      "book_title": "Computer Science 101",
      "book_isbn": "978-0-13-123456-7",
      "book_value": 99.99,
      "damage_type": "water_damage",
      "damage_level": "medium",
      "incident_date": "2024-01-15",
      "description": "Book was dropped in water during transport"
    }
  }'
```

### Test 2: List Incidents

```bash
curl -X GET https://your-instance.service-now.com/api/now/x_1997678_acad_resolve/listIncidents \
  -H "X-UserToken: $(cat ~/.now-sdk/token)"
```

### Test 3: Calculate Fee

```bash
curl -X POST https://your-instance.service-now.com/api/now/x_1997678_acad_resolve/calculateFee \
  -H "Content-Type: application/json" \
  -H "X-UserToken: $(cat ~/.now-sdk/token)" \
  -d '{
    "data": {
      "damage_type": "water_damage",
      "damage_level": "medium",
      "book_value": 99.99
    }
  }'
```

---

## 📱 Frontend Integration

Your React frontend (`src/client/app.jsx`) is already configured to use the API:

```javascript
// src/client/services/IncidentService.js
const baseURL = '/api/now/x_1997678_acad_resolve'

// Examples:
const incidents = await IncidentService.list({ state: 'open' })
const fee = await IncidentService.calculateFee({
  damage_type: 'water_damage',
  damage_level: 'medium',
  book_value: 99.99
})
```

---

## 🛠️ Troubleshooting

### Issue: "Cannot find module '@servicenow/sdk'"

**Solution**: Reinstall dependencies
```bash
npm install
npm install lodash
```

### Issue: "Build failed: Failed to load native binding"

**Solution**: This is a known issue with certain Node versions. You can skip local build:
```bash
# Use deploy directly without building
npx now-sdk deploy
```

### Issue: Credentials not found

**Solution**: Configure credentials first
```bash
npx now-sdk auth --alias myinstance
npx now-sdk auth --use myinstance
```

### Issue: "Scoped application not found"

**Solution**: Ensure the scope exists in your instance
1. Navigate to **System Applications > All Scopes**
2. Create new scope with ID: `974280ca839c0b109bb1c710feaad308`
3. Retry deployment

### Issue: API returning 404

**Solution**: Verify tables exist
1. Navigate to **System Definition > Tables**
2. Search for: `x_1997678_acadreso_book_incident`
3. If not found, import `config/database_schema.xml`

---

## 📊 File Structure for Deployment

```
440_AcadResolve/
├── src/
│   ├── fluent/
│   │   └── index.now.ts          ✅ READY - Backend API
│   └── client/
│       ├── app.jsx                ✅ READY - React app
│       ├── components/
│       │   ├── IncidentForm.jsx
│       │   └── IncidentList.jsx
│       └── services/
│           └── IncidentService.js ✅ READY - API client
├── config/
│   ├── database_schema.xml        📋 Tables
│   ├── business_rules.xml         📋 Business Logic
│   ├── client_scripts.xml         📋 Frontend Validation
│   ├── ui_actions.xml             📋 Custom Actions
│   ├── notifications.xml          📋 Email Templates
│   ├── integration_hub.xml        📋 API Integrations
│   ├── flows.xml                  📋 Workflows
│   ├── service_portal.xml         📋 Portal Widgets
│   └── user_roles_access.xml      📋 Security
├── package.json                   ✅ Dependencies configured
├── now.config.json                ✅ Scope configured
└── now.prebuild.mjs              ✅ Build script
```

---

## 🔐 Security Checklist

- [ ] Service Account created for API calls
- [ ] API key/token secured in environment variables
- [ ] SSL/TLS enabled for all API endpoints
- [ ] User roles properly assigned and tested
- [ ] ACLs configured for table access
- [ ] Integration passwords stored in System Properties
- [ ] Audit logging enabled for book_incident table

---

## 📞 Support

**If deployment fails:**
1. Check ServiceNow instance is running
2. Verify credentials are correct
3. Ensure required plugins are installed
4. Review ServiceNow server logs
5. Contact ServiceNow support if issues persist

**For SDK issues:**
```bash
npx now-sdk --version
npx now-sdk build -d  # Debug mode
```

---

## ✅ Validation Checklist After Deployment

- [ ] API endpoints responding at correct URLs
- [ ] Test incident creation successful
- [ ] Business rules executing on record insert
- [ ] Email notifications sending
- [ ] Integration Hub connections authenticated
- [ ] Flow Designer workflows triggering
- [ ] Service Portal displaying correctly
- [ ] User roles granting appropriate access
- [ ] Frontend IncidentService making API calls
- [ ] React components rendering incident data

---

**Version**: 1.0.0
**Last Updated**: April 18, 2026
**Status**: ✅ Ready for Deployment

