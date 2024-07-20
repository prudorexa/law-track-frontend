import React, { useEffect, useState } from 'react';
import CaseManagement from './CaseManagement';
import Schedule from './Schedule';

// Admin Dashboard Component
const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [cases, setCases] = useState([]);
  const [documents, setDocuments] = useState([]);
  const [messages, setMessages] = useState([]);
  const [schedules, setSchedules] = useState([]);


  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/users/')
      .then((response) => response.json())
      .then((data) => setUsers(Array.isArray(data) ? data : []))
      .catch((error) => console.error('Error fetching users data:', error));
    
    fetch('http://127.0.0.1:8000/api/cases/')
      .then((response) => response.json())
      .then((data) => setCases(Array.isArray(data) ? data : []))
      .catch((error) => console.error('Error fetching cases data:', error));

    fetch('http://127.0.0.1:8000/api/documents/')
      .then((response) => response.json())
      .then((data) => setDocuments(Array.isArray(data) ? data : []))
      .catch((error) => console.error('Error fetching documents data:', error));

    fetch('http://127.0.0.1:8000/api/messages/')
      .then((response) => response.json())
      .then((data) => setMessages(Array.isArray(data) ? data : []))
      .catch((error) => console.error('Error fetching messages data:', error));

    fetch('http://127.0.0.1:8000/api/schedule/')
      .then((response) => response.json())
      .then((data) => setSchedules(Array.isArray(data) ? data : []))
      .catch((error) => console.error('Error fetching schedules data:', error));
  }, []);

  const handleScheduleUpdate = (newSchedules) => {
    setSchedules(newSchedules);
  };

  return (
    <div>
      <section className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">Manage Users</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="py-3 px-6 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Username</th>
                <th className="py-3 px-6 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                <th className="py-3 px-6 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {users.map((user) => (
                <tr key={user.id}>
                  <td className="py-4 px-6 whitespace-nowrap">{user.username}</td>
                  <td className="py-4 px-6 whitespace-nowrap">{user.email}</td>
                  <td className="py-4 px-6 whitespace-nowrap">{user.role}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">Manage Cases</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="py-3 px-6 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Case ID</th>
                <th className="py-3 px-6 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Case Title</th>
                <th className="py-3 px-6 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Assigned Lawyer</th>
                <th className="py-3 px-6 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {cases.map((caseItem) => (
                <tr key={caseItem.id}>
                  <td className="py-4 px-6 whitespace-nowrap">{caseItem.id}</td>
                  <td className="py-4 px-6 whitespace-nowrap">{caseItem.title}</td>
                  <td className="py-4 px-6 whitespace-nowrap">{caseItem.assigned_lawyer}</td>
                  <td className="py-4 px-6 whitespace-nowrap">{caseItem.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">Manage Documents</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="py-3 px-6 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Document Name</th>
                <th className="py-3 px-6 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Uploaded At</th>
                <th className="py-3 px-6 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Case ID</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {documents.map((document) => (
                <tr key={document.id}>
                  <td className="py-4 px-6 whitespace-nowrap">{document.name}</td>
                  <td className="py-4 px-6 whitespace-nowrap">{document.uploaded_at}</td>
                  <td className="py-4 px-6 whitespace-nowrap">{document.case}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">Client Messages</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="py-3 px-6 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Message ID</th>
                <th className="py-3 px-6 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Content</th>
                <th className="py-3 px-6 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Client ID</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {messages.map((message) => (
                <tr key={message.id}>
                  <td className="py-4 px-6 whitespace-nowrap">{message.id}</td>
                  <td className="py-4 px-6 whitespace-nowrap">{message.content}</td>
                  <td className="py-4 px-6 whitespace-nowrap">{message.client}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">Manage Schedule</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="py-3 px-6 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Event</th>
                <th className="py-3 px-6 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="py-3 px-6 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {schedules.map((schedule) => (
                <tr key={schedule.id}>
                  <td className="py-4 px-6 whitespace-nowrap">{schedule.event}</td>
                  <td className="py-4 px-6 whitespace-nowrap">{schedule.date}</td>
                  <td className="py-4 px-6 whitespace-nowrap">{schedule.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

// Lawyer Dashboard Component
const LawyerDashboard = () => {
  const [cases, setCases] = useState([]);
  const [schedule, setSchedule] = useState([]);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/assigned_cases/')
      .then((response) => response.json())
      .then((data) => setCases(Array.isArray(data) ? data : []))
      .catch((error) => console.error('Error fetching cases data:', error));

    fetch('http://127.0.0.1:8000/api/schedule/')
      .then((response) => response.json())
      .then((data) => setSchedule(Array.isArray(data) ? data : []))
      .catch((error) => console.error('Error fetching schedule data:', error));

    fetch('http://127.0.0.1:8000/api/messages/')
      .then((response) => response.json())
      .then((data) => setMessages(Array.isArray(data) ? data : []))
      .catch((error) => console.error('Error fetching messages data:', error));
  }, []);

  return (
    <div>
      <section className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">Assigned Cases</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="py-3 px-6 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Case ID</th>
                <th className="py-3 px-6 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Case Title</th>
                <th className="py-3 px-6 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {cases.map((caseItem) => (
                <tr key={caseItem.id}>
                  <td className="py-4 px-6 whitespace-nowrap">{caseItem.id}</td>
                  <td className="py-4 px-6 whitespace-nowrap">{caseItem.title}</td>
                  <td className="py-4 px-6 whitespace-nowrap">{caseItem.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">Manage Schedule</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="py-3 px-6 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Event</th>
                <th className="py-3 px-6 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="py-3 px-6 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {schedule.map((event) => (
                <tr key={event.id}>
                  <td className="py-4 px-6 whitespace-nowrap">{event.title}</td>
                  <td className="py-4 px-6 whitespace-nowrap">{event.date}</td>
                  <td className="py-4 px-6 whitespace-nowrap">{event.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">Communicate with Clients</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="py-3 px-6 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Message ID</th>
                <th className="py-3 px-6 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Content</th>
                <th className="py-3 px-6 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Client ID</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {messages.map((message) => (
                <tr key={message.id}>
                  <td className="py-4 px-6 whitespace-nowrap">{message.id}</td>
                  <td className="py-4 px-6 whitespace-nowrap">{message.content}</td>
                  <td className="py-4 px-6 whitespace-nowrap">{message.client}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

// Client Dashboard Component
const ClientDashboard = () => {
  const [profile, setProfile] = useState({});

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/profile/')
      .then((response) => response.json())
      .then((data) => setProfile(data))
      .catch((error) => console.error('Error fetching profile data:', error));
  }, []);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">My Profile</h2>
      <div className="space-y-4">
        <div className="flex items-center">
          <label className="w-32 font-medium text-gray-600">Username:</label>
          <span className="text-gray-800">{profile.username}</span>
        </div>
        <div className="flex items-center">
          <label className="w-32 font-medium text-gray-600">Email:</label>
          <span className="text-gray-800">{profile.email}</span>
        </div>
        <div className="flex items-center">
          <label className="w-32 font-medium text-gray-600">Role:</label>
          <span className="text-gray-800">{profile.role}</span>
        </div>
      </div>
    </div>
  );
};

// Main Dashboard Component
const Dashboard = () => {
  const [userRole, setUserRole] = useState('');

  useEffect(() => {
    // Fetch the user role from your backend or authentication service
    // For demonstration, we'll use a hardcoded role
    const role = 'admin'; // Replace with actual fetch call
    setUserRole(role);
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <header className="bg-white shadow-sm py-4 mb-6">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
        </div>
      </header>
      <main className="container mx-auto">
        {userRole === 'admin' && <AdminDashboard />}
        {userRole === 'lawyer' && <LawyerDashboard />}
        {userRole === 'client' && <ClientDashboard />}
      </main>
      <footer className="bg-white shadow-sm py-4 mt-6">
        <div className="container mx-auto text-center">
          <p className="text-gray-600">&copy; 2024 All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Dashboard;
