import React, { useState, useEffect } from 'react';
import axios from 'axios';

const LawyerDashboard = () => {
    const [assignedCases, setAssignedCases] = useState([]);
    const [schedule, setSchedule] = useState([]);

    useEffect(() => {
        // Fetch assigned cases and schedule on component mount
        const fetchAssignedCases = async () => {
            try {
                const response = await axios.get('/api/lawyer/assigned-cases');
                setAssignedCases(response.data);
            } catch (error) {
                console.error('Error fetching assigned cases:', error);
            }
        };

        const fetchSchedule = async () => {
            try {
                const response = await axios.get('/api/lawyer/schedule');
                setSchedule(response.data);
            } catch (error) {
                console.error('Error fetching schedule:', error);
            }
        };

        fetchAssignedCases();
        fetchSchedule();
    }, []);

    return (
        <div>
            <h1>Lawyer Dashboard</h1>
            <div>
                <h2>Assigned Cases:</h2>
                <ul>
                    {Array.isArray(assignedCases) && assignedCases.map((caseItem) => (
                        <li key={caseItem.id}>
                            <div>Case ID: {caseItem.id}</div>
                            <div>Status: {caseItem.status}</div>
                            {/* Add more case details as needed */}
                        </li>
                    ))}
                </ul>
            </div>
            <div>
                <h2>Schedule:</h2>
                <ul>
                    {Array.isArray(schedule) && schedule.map((event) => (
                        <li key={event.id}>
                            <div>Title: {event.title}</div>
                            <div>Date: {event.date}</div>
                            {/* Add more schedule details as needed */}
                        </li>
                    ))}
                </ul>
            </div>
            {/* Add more components and features */}
        </div>
    );
};

export default LawyerDashboard;
