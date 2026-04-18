import '@servicenow/sdk/global'

// Type declaration for UiPage builder
declare function UiPage(config: any): any

import incidentPage from '../../client/index.html'

UiPage({
    endpoint: 'x_1997678_acadreso_incident_manager.do',
    description: 'Incident Response Manager UI Page',
    category: 'general',
    html: incidentPage,
    direct: true,
})
