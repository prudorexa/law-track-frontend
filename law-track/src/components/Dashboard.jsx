import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BASE_URL from '../../config';

// Fetch data function using Axios
const fetchData = async (url, setData) => {
  try {
    const response = await axios.get(url);
    setData(Array.isArray(response.data) ? response.data : []);
  } catch (error) {
    console.error(`Error fetching data from ${url}:`, error);
  }
};

// DataTable Component
const DataTable = ({ columns, data }) => (
  <div className="overflow-x-auto">
    <table className="min-w-full bg-white divide-y divide-gray-200">
      <thead>
        <tr>
          {columns.map((col) => (
            <th
              key={col}
              className="py-3 px-6 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              {col}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {data.map((item) => (
          <tr key={item.id}>
            {Object.values(item).map((value, index) => (
              <td key={index} className="py-4 px-6 whitespace-nowrap">
                {value}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

// Section Component
const Section = ({ title, data, columns }) => (
  <section className="bg-white p-6 rounded-lg shadow-md mb-6">
    <h2 className="text-2xl font-semibold mb-4 text-gray-800">{title}</h2>
    <DataTable data={data} columns={columns} />
  </section>
);

// User List Component
const UserList = ({ users }) => {
  const columns = ['ID', 'Username', 'Email', 'Role'];
  return <Section title="Registered Users" data={users} columns={columns} />;
};

// Admin Dashboard Component
const AdminDashboard = ({
  users,
  cases,
  // documents,
  // messages,
  schedules,
  contacts,
  billings,
}) => {
  return (
    <div>
      <UserList users={users} />
      <Section title="Manage Cases" data={cases} columns={['ID', 'Title', 'Assigned Lawyer', 'Status']} />
      {/* <Section title="Manage Documents" data={documents} columns={['ID', 'Name', 'Uploaded At', 'Case ID']} /> */}
      {/* <Section title="Client Messages" data={messages} columns={['ID', 'Content', 'Client ID']} /> */}
      <Section title="Manage Schedule" data={schedules} columns={['ID', 'Event', 'Date']} />
      <Section title="Manage Contacts" data={contacts} columns={['ID', 'Name', 'Email', 'Message']} />
      <Section title="Manage Billings" data={billings} columns={['Invoice Number', 'Amount', 'Issue Date', 'Due Date']} />
    </div>
  );
};

// Lawyer Dashboard Component
const LawyerDashboard = ({ cases, schedule, messages }) => {
  return (
    <div>
      <Section title="Assigned Cases" data={cases} columns={['ID', 'Title', 'Status']} />
      <Section title="Manage Schedule" data={schedule} columns={['Event', 'Date', 'Time']} />
      <Section title="Communicate with Clients" data={messages} columns={['ID', 'Content', 'Client ID']} />
    </div>
  );
};

// Client Dashboard Component
const ClientDashboard = ({ profile }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">My Profile</h2>
      <div className="space-y-4">
        {Object.entries(profile).map(([key, value]) => (
          <div key={key} className="flex items-center">
            <label className="w-32 font-medium text-gray-600">{`${key.charAt(0).toUpperCase() + key.slice(1)}:`}</label>
            <span className="text-gray-800">{value}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

// Navbar Component
const Navbar = ({ items, activeItem, onSelectItem }) => (
  <nav className="bg-black text-white h-full p-4">
    <ul className="space-y-2">
      <li className="p-2 font-bold">Admin Dashboard</li>
      {items.map((item) => (
        <li
          key={item}
          className={`p-2 rounded cursor-pointer ${activeItem === item ? 'bg-gray-700' : 'hover:bg-gray-600'}`}
          onClick={() => onSelectItem(item)}
        >
          {item}
        </li>
      ))}
    </ul>
  </nav>
);

// Main Dashboard Component
const Dashboard = () => {
  const [userRole, setUserRole] = useState('');
  const [activeSection, setActiveSection] = useState('Users');
  const [users, setUsers] = useState([]);
  const [cases, setCases] = useState([]);
  // const [documents, setDocuments] = useState([]);
  // const [messages, setMessages] = useState([]);
  const [schedules, setSchedules] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [billings, setBillings] = useState([]);
  const [profile, setProfile] = useState({});

  const adminSections = ['Users', 'Cases', 'Schedule', 'Contacts', 'Billings'];
  const lawyerSections = ['Assigned Cases', 'Schedule'];

  useEffect(() => {
    setUserRole('admin'); 

    if (userRole === 'admin') {
      fetchData(`${BASE_URL}/api/api/users/`, setUsers);
      fetchData(`${BASE_URL}/api/cases/`, setCases);
      fetchData(`${BASE_URL}/api/schedules/`, setSchedules);
      fetchData(`${BASE_URL}/api/contact/`, setContacts);
      fetchData(`${BASE_URL}/api/billings/`, setBillings);
    }

    // Fetch data for lawyer
    if (userRole === 'lawyer') {
      fetchData('http://127.0.0.1:8000/api/assigned_cases/', setCases);
      fetchData(`${BASE_URL}/api/schedules/`, setSchedules);
    }

    // Fetch data for client
    if (userRole === 'client') {
      fetchData(`${BASE_URL}/api/profile/`, setProfile);
    }
  }, [userRole]);

  const renderSection = () => {
    if (userRole === 'admin') {
      switch (activeSection) {
        case 'Users':
          return <UserList users={users} />;
        case 'Cases':
          return <Section title="Manage Cases" data={cases} columns={['ID', 'Title', 'Assigned Lawyer', 'Status']} />;
        // case 'Documents':
        //   return <Section title="Manage Documents" data={documents} columns={['ID', 'Name', 'Uploaded At', 'Case ID']} />;
        // case 'Messages':
        //   return <Section title="Client Messages" data={messages} columns={['ID', 'Content', 'Client ID']} />;
        case 'Schedule':
          return <Section title="Manage Schedule" data={schedules} columns={['ID', 'Event', 'Date', 'Description', 'Assigned_lawyer', 'case']} />;
        case 'Contacts':
          return <Section title="Manage Contacts" data={contacts} columns={['ID', 'Name', 'Email', 'Message']} />;
        case 'Billings':
          return <Section title="Manage Billings" data={billings} columns={['Invoice Number', 'Amount', 'Issue Date', 'Due Date', 'Case']} />;
        default:
          return null;
      }
    } else if (userRole === 'lawyer') {
      switch (activeSection) {
        case 'Assigned Cases':
          return <Section title="Assigned Cases" data={cases} columns={['ID', 'Title', 'Status']} />;
        case 'Schedule':
          return <Section title="Manage Schedule" data={schedules} columns={['Event', 'Date', 'Time', 'Description', 'Assigned_lawyer', 'case']} />;
        // case 'Messages':
        //   return <Section title="Communicate with Clients" data={messages} columns={['ID', 'Content', 'Client ID']} />;
        default:
          return null;
      }
    } else if (userRole === 'client') {
      return <ClientDashboard profile={profile} />;
    }
  };

  return (
    <div className="flex h-screen">
      <Navbar
        items={userRole === 'admin' ? adminSections : lawyerSections}
        activeItem={activeSection}
        onSelectItem={setActiveSection}
      />
      <div className="flex-1 p-6 overflow-auto">
        {renderSection()}
      </div>
    </div>
  );
};

export default Dashboard;
