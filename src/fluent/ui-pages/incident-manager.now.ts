import '@servicenow/sdk/global'
import { UiPage } from '@servicenow/sdk/core'

UiPage({
    $id: Now.ID['incident_manager_ui_page'],
    endpoint: 'x_1997678_acadreso_incident_manager.do',
    description: 'Incident Response Manager UI Page',
    category: 'general',
    html: Now.include('../../static-content/index.html'),
    direct: true,
})