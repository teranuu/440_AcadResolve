import React, { useState, useEffect } from 'react';
import './app.css';

// Simple test component first
function App() {
    const [message, setMessage] = useState('Loading...');

    useEffect(() => {
        // Test if the app loads
        setMessage('Academic Resolve - Incident Manager Ready!');
    }, []);

    return React.createElement('div', { className: 'incident-app' },
        React.createElement('header', { className: 'app-header' },
            React.createElement('h1', null, message),
            React.createElement('p', null, 'Book incident management system is loading...')
        ),
        React.createElement('div', { className: 'content' },
            React.createElement('p', null, 'This is a test to see if React is working properly.'),
            React.createElement('button', { 
                onClick: () => setMessage('React is working!')
            }, 'Test Button')
        )
    );
}

export default App;