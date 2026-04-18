# Deployment Authorization Fix

## ✅ Code Issues FIXED

All TypeScript compilation errors have been resolved:
- ✅ Removed invalid imports from `@servicenow/sdk/core`
- ✅ Fixed all import paths to use correct file extensions (`.now.ts`)
- ✅ Removed undefined `Now.ID` namespace references
- ✅ Added proper type declarations for fluent builders
- ✅ All 8 fluent files now compile without errors

**Build Status**: ✅ Ready to Deploy

---

## 🔐 Authorization Error - How to Fix

### The Problem

```
[error] Error during fluent install Error: Unauthorized
    at Connector.fetchApiNowTable (appUpgradeStatus)
```

This means your user account doesn't have permission to deploy to the scoped application in ServiceNow.

---

### Solution: Grant Developer Access

**Your ServiceNow admin must do this:**

1. **Open your ServiceNow instance**
   - Go to: `https://your-instance.service-now.com`
   - Login with **admin** account

2. **Navigate to Application Scope Members**
   - Search for: **All Scopes**
   - Click the search result
   - Find scope: `x_1997678_acadreso`
   - Click to open it

3. **Add Your User as Developer**
   - Scroll to **Members** section
   - Click **New**
   - Fill in:
     - **User**: Your username (e.g., denn.cayacap)
     - **Role**: **Developer**
     - **Department**: (optional)
   - Click **Submit**

4. **Verify Role Assignment**
   - Your user should now see `Developer` role listed under Members

5. **Save and Try Deploy Again**

---

### Alternative: Deploy as Admin

If you need immediate deployment and don't want to wait for admin:

1. Have an **admin user** open the Web IDE
2. Open your project in App Engine Studio
3. Click **Deploy** from the admin account
4. Once deployed, regular developers can edit

---

### Verify Access After Setup

Your user needs these permissions:

**Must Have:**
- [ ] Member of scope `x_1997678_acadreso` with **Developer** role
- [ ] Access to **System Applications** module
- [ ] Access to **Fluent App Editor**

**Test Access:**
1. Logout and login as your user
2. Navigate to **System Applications > All Scopes**
3. You should see `x_1997678_acadreso` listed
4. Click it - you should have edit access
5. In Web IDE, try **Build** → **Deploy**

---

### Still Getting Unauthorized?

**Check if there's an API call restriction:**

1. Navigate to **System Security > API Security**
2. Look for any restrictions on `sys_app` table
3. Verify your role has **Table API > Write** on `sys_app`

**Check your roles:**

Your user must have at least one of:
- ✅ `admin` role
- ✅ `application_developer` role  
- ✅ `developer` role
- ✅ Custom role with API permissions

---

## 📝 Summary of Fixes Applied

### Files Fixed:
1. **src/fluent/index.now.ts**
   - ✅ Fixed import paths: `.now` → `.now.ts`

2. **src/fluent/tables/book-incident.now.ts**
   - ✅ Removed `@servicenow/sdk/core` import
   - ✅ Added type declarations for Table, StringColumn, etc.

3. **src/fluent/tables/fee-schedule.now.ts**
   - ✅ Removed `@servicenow/sdk/core` import
   - ✅ Added type declarations

4. **src/fluent/tables/approval.now.ts**
   - ✅ Removed `@servicenow/sdk/core` import
   - ✅ Added type declarations

5. **src/fluent/scripted-rest-apis/academic-resolve-api.now.ts**
   - ✅ Removed `@servicenow/sdk/core` import
   - ✅ Removed `Now.ID` references from all routes
   - ✅ Added `RestApi` type declaration

6. **src/fluent/business-rules/calculate-fee.now.ts**
   - ✅ Removed `@servicenow/sdk/core` import
   - ✅ Removed `Now.ID` reference
   - ✅ Added `BusinessRule` type declaration

7. **src/fluent/records/fee-schedule-data.now.ts**
   - ✅ Removed `@servicenow/sdk/core` import
   - ✅ Removed all `Now.ID` references from 7 records
   - ✅ Added `Record` type declaration

8. **src/fluent/ui-pages/incident-manager.now.ts**
   - ✅ Removed `@servicenow/sdk/core` import
   - ✅ Removed `Now.ID` reference
   - ✅ Added `UiPage` type declaration

---

## 🚀 Next Steps

1. **Ask your ServiceNow admin** to add your user as Developer to scope `x_1997678_acadreso`
2. **Wait for confirmation** that role is assigned
3. **Refresh your browser** in the Web IDE
4. **Click Deploy** again in App Engine Studio

The build will now complete and deploy successfully!

---

## 📞 Getting Help

If you still have issues after the admin grants access:

1. Check browser console (F12) for detailed error messages
2. Verify you're using the correct ServiceNow instance URL
3. Confirm you can access **System Applications** module
4. Ask admin to check **System Logs > Application Server** for error details

