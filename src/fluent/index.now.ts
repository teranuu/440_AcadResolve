import '@servicenow/sdk/global'

// Import all fluent metadata definitions
import './tables/book-incident.now.ts'
import './tables/fee-schedule.now.ts'
import './tables/approval.now.ts'
import './records/fee-schedule-data.now.ts'
import './business-rules/calculate-fee.now.ts'
import './scripted-rest-apis/academic-resolve-api.now.ts'
import './ui-pages/incident-manager.now.ts'