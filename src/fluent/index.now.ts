import '@servicenow/sdk/global'

// Import all fluent metadata definitions
import './tables/book-incident.now'
import './tables/fee-schedule.now'
import './tables/approval.now'
import './records/fee-schedule-data.now'
import './business-rules/calculate-fee.now'
import './scripted-rest-apis/academic-resolve-api.now'
import './ui-pages/incident-manager.now'