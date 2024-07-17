import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/laww firm.png';

const Navbar = ({ userRole, setUserRole }) => {
  const [dropdown, setDropdown] = useState(null);

  const handleDropdown = (menu) => {
    setDropdown(dropdown === menu ? null : menu);
  };

  return (
    <nav className="bg-gray-800 p-4 flex items-center">
      <div className="flex items-center">
        <img src={logo} alt="Law Firm Logo" className="h-14 w-auto mr-4" />
        <span className="text-xl text-white font-semibold">Law Firm</span>
      </div>
      <ul className="flex space-x-6 ml-auto text-xl"> {/* Increased font size to text-xl */}
        <li><Link to="/home" className="text-white hover:text-gray-300">Home</Link></li>
        <li><Link to="/about" className="text-white hover:text-gray-300">About</Link></li>
        <li><Link to="/services" className="text-white hover:text-gray-300">Services</Link></li>
        <li><Link to="/contact" className="text-white hover:text-gray-300">Contact</Link></li>
        <li className="relative">
          <button
            className="text-white hover:text-gray-300"
            onClick={() => handleDropdown('documents')}
          >
            Documents
          </button>
          {dropdown === 'documents' && (
            <ul className="absolute bg-gray-800 p-2 mt-2 space-y-2">
              <li><Link to="/documents" className="text-white hover:text-gray-300">Documents</Link></li>
              <li><Link to="/billing" className="text-white hover:text-gray-300">Billing</Link></li>
              <li><Link to="/schedule" className="text-white hover:text-gray-300">Schedule</Link></li>
              <li><Link to="/communication" className="text-white hover:text-gray-300">Communication</Link></li>
              <li><Link to="/cases" className="text-white hover:text-gray-300">Cases</Link></li>
              <li><Link to="/casemanagement" className="text-white hover:text-gray-300">Case Management</Link></li>
            </ul>
          )}
        </li>
        <li><Link to="/login" className="text-white hover:text-gray-300">Login</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
