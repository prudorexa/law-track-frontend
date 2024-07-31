import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'; 
import logo from '../assets/laww firm.png';

const Navbar = ({ userRole, setUserRole }) => {
  const [dropdown, setDropdown] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const handleDropdown = (menu) => {
    setDropdown(dropdown === menu ? null : menu);
  };

  const handleLinkClick = () => {
    setDropdown(null);
    setIsOpen(false);
  };

  return (
    <nav className="bg-black p-4">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center">
          <img src={logo} alt="Law Firm Logo" className="h-14 w-auto mr-4" />
          <span className="text-xl text-white font-semibold">Law Firm</span>
        </div>
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? (
              <XMarkIcon className="h-6 w-6 text-white" />
            ) : (
              <Bars3Icon className="h-6 w-6 text-white" />
            )}
          </button>
        </div>
        <ul className={`md:flex md:space-x-6 text-xl ${isOpen ? 'block' : 'hidden'} md:block`}>
          <li>
            <Link to="/home" className="text-white hover:text-gray-300" onClick={handleLinkClick}>
              Home
            </Link>
          </li>
          <li>
            <Link to="/about" className="text-white hover:text-gray-300" onClick={handleLinkClick}>
              About
            </Link>
          </li>
          <li>
            <Link to="/services" className="text-white hover:text-gray-300" onClick={handleLinkClick}>
              Services
            </Link>
          </li>
          <li>
            <Link to="/contact" className="text-white hover:text-gray-300" onClick={handleLinkClick}>
              Contact
            </Link>
          </li>
          <li className="relative">
            <button
              className="text-white hover:text-gray-300"
              onClick={() => handleDropdown('documents')}
            >
              Documents
            </button>
            {dropdown === 'documents' && (
              <ul className="text-sm absolute bg-black p-2 mt-2 space-y-2">
                <li>
                  <Link to="/documents" className="text-white hover:text-gray-300" onClick={handleLinkClick}>
                    Documents
                  </Link>
                </li>
                <li>
                  <Link to="/billing" className="text-white hover:text-gray-300" onClick={handleLinkClick}>
                    Billing
                  </Link>
                </li>
                <li>
                  <Link to="/schedule" className="text-white hover:text-gray-300" onClick={handleLinkClick}>
                    Schedule
                  </Link>
                </li>
                {/* <li>
                  <Link to="/communication" className="text-white hover:text-gray-300" onClick={handleLinkClick}>
                    Communication
                  </Link>
                </li> */}
                <li>
                  <Link to="/cases" className="text-white hover:text-gray-300" onClick={handleLinkClick}>
                    Cases
                  </Link>
                </li>
                <li>
                  <Link to="/casemanagement" className="text-white hover:text-gray-300" onClick={handleLinkClick}>
                    Case Management
                  </Link>
                </li>
              </ul>
            )}
          </li>
          <li className="relative">
            <button
              className="text-white hover:text-gray-300"
              onClick={() => handleDropdown('login')}
            >
              Login
            </button>
            {dropdown === 'login' && (
              <ul className="text-sm absolute bg-black p-2 mt-2 space-y-2">
                <li>
                  <Link to="/login" className="text-white hover:text-gray-300" onClick={handleLinkClick}>
                    Login
                  </Link>
                </li>
                <li>
                  <Link to="/admin-login" className="text-white hover:text-gray-300" onClick={handleLinkClick}>
                    Admin Login
                  </Link>
                </li>
              </ul>
            )}
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
