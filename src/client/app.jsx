import React, { useState, useEffect } from 'react';
import './app.css';
import IncidentForm from './components/IncidentForm';
import IncidentList from './components/IncidentList';

// Main application component
function App() {
    const [view, setView] = useState('list'); // 'list' or 'form'
    const [incidents, setIncidents] = useState([]);
    const [selectedIncident, setSelectedIncident] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Initialize on component mount
        console.log('Academic Resolve App initialized');
        loadIncidents();
    }, []);

    const loadIncidents = async () => {
        try {
            setLoading(true);
            // TODO: Fetch from backend API
            setIncidents([]);
            setError(null);
        } catch (err) {
            console.error('Error loading incidents:', err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleCreateIncident = (formData) => {
        console.log('Creating incident:', formData);
        // TODO: Submit to backend
        setView('list');
        loadIncidents();
    };

    const handleEditIncident = (incident) => {
        setSelectedIncident(incident);
        setView('form');
    };

    const handleCloseForm = () => {
        setSelectedIncident(null);
        setView('list');
    };

    return React.createElement('div', { className: 'app-container' },
        React.createElement('header', { className: 'app-header' },
            React.createElement('div', { className: 'header-content' },
                React.createElement('h1', null, 'Academic Resolve'),
                React.createElement('p', null, 'Book Incident Management System')
            ),
            React.createElement('button', { 
                className: 'btn-primary',
                onClick: () => { setSelectedIncident(null); setView('form'); }
            }, '+ Report New Incident')
        ),
        
        error && React.createElement('div', { className: 'error-banner' },
            React.createElement('p', null, 'Error: ' + error)
        ),

        view === 'list' && React.createElement('div', { className: 'view-container' },
            loading ? 
                React.createElement('div', { className: 'loading' }, 'Loading incidents...') :
                React.createElement(IncidentList, {
                    incidents,
                    onEdit: handleEditIncident,
                    onRefresh: loadIncidents,
                    service: null
                })
        ),

        view === 'form' && React.createElement(IncidentForm, {
            incident: selectedIncident,
            onSubmit: handleCreateIncident,
            onCancel: handleCloseForm
        })
    );
}

export default App;
