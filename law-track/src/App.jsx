import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import Login from "./components/LoginForm";
import MessageNotification from "./components/MessageNotification";
import Services from "./components/Services";
import ContactUs from './components/ContactUs';
// import Register from "./components/RegistrationForm";
import UserDashboard from './components/UserDashboard';
// import AdminDashboard from './components/AdminDashboard';
import LawyerDashboard from './components/LawyerDashboard';
import ClientDashboard from './components/ClientDashboard';
import Cases from "./components/Cases"; 
import Schedule from './components/Schedule'; 
import Communication from './components/Communication';
import Documents from './components/Documents';
import Billing from './components/Billing';
import CaseManagement from './components/CaseManagement';
import Footer from './components/Footer';

const Dashboard = ({ userRole }) => {
  switch (userRole) {
    case 'admin':
      return <AdminDashboard />;
    case 'lawyer':
      return <LawyerDashboard />;
    case 'client':
      return <ClientDashboard />;
    default:
      return <UserDashboard />;
  }
};

const App = () => {
  const [userRole, setUserRole] = useState('');

  useEffect(() => {
    // Simulated fetch. Replace with actual fetch from your service.
    const fetchUserRole = async () => {
      const role = await new Promise(resolve => setTimeout(() => resolve('lawyer'), 1000)); // Change 'lawyer' to simulate different roles
      setUserRole(role);
    };

    fetchUserRole();
  }, []);

  return (
    <Router>
      <Navbar userRole={userRole} setUserRole={setUserRole} />
      <Routes>
        <Route path='/dashboard' element={<Dashboard userRole={userRole} />} />
        {/* <Route path='/admindashboard' element={<AdminDashboard />} /> */}
        <Route path='/lawyerdashboard' element={<LawyerDashboard />} />
        <Route path='/clientdashboard' element={<ClientDashboard />} />
        <Route path='/home' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/services' element={<Services />} />
        <Route path='/contact' element={<ContactUs />} />
        <Route path='/login' element={<Login setUserRole={setUserRole} />} />
        <Route path='/cases' element={<Cases />} />
        <Route path='/message' element={<MessageNotification />} />
        <Route path='/schedule' element={<Schedule />} />
        <Route path='/documents' element={<Documents />} />
        <Route path='/billing' element={<Billing />} />
        <Route path='/casemanagement' element={<CaseManagement />} />
        <Route path='/communication' element={<Communication />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
