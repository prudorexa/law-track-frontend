import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import Login from "./components/LoginForm";
import MessageNotification from "./components/MessageNotification";
import Services from "./components/Services";
import ContactUs from './components/ContactUs';
import Dashboard from './components/Dashboard';
import Cases from "./components/Cases"; 
import Schedule from './components/Schedule'; 
import Communication from './components/Communication';
import Documents from './components/Documents';
import Billing from './components/Billing';
import Payment from './components/payment';
import CaseManagement from './components/CaseManagement';
import Footer from './components/Footer';

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
        <Route path='/' element={<Login setUserRole={setUserRole} />} />
        <Route path='/dashboard' element={<Dashboard userRole={userRole} />} />
        <Route path='/home' element={<Home />} />
        <Route path='/payment' element={<Payment />} />
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
