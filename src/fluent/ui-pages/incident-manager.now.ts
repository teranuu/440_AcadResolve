import '@servicenow/sdk/global'
import { UiPage } from '@servicenow/sdk/core'
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from '../../client/app'

const initializeApp = () => {
    const rootElement = document.getElementById('root')
    if (rootElement) {
        ReactDOM.createRoot(rootElement).render(
            React.createElement(React.StrictMode, null,
                React.createElement(App)
            )
        )
    }
}

UiPage({
    $id: Now.ID['incident_manager_ui_page'],
    endpoint: 'x_1997678_acadreso_incident_manager.do',
    description: 'Incident Response Manager UI Page',
    category: 'general',
    html: Now.include('../../client/index.html'),
    direct: true,
    onPageLoad: initializeApp,
})