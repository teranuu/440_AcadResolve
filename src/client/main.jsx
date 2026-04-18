import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './app.jsx'

// Initialize the React application when DOM is ready
function initializeApp() {
    const container = document.getElementById('root')
    if (container) {
        const root = createRoot(container)
        root.render(
            React.createElement(
                React.StrictMode,
                null,
                React.createElement(App)
            )
        )
        console.log('Academic Resolve app initialized successfully')
    } else {
        console.error('Root container not found')
    }
}

// Ensure DOM is ready before initializing
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeApp)
} else {
    initializeApp()
}