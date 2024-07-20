import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/laww firm.png'; 

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        <div className="footer-section flex flex-col items-start">
          <img src={logo} alt="Law Firm Logo" className="w-25 h-auto mb-3" />
          {/* <h1 className="text-2xl font-bold mb-5">LAWTRACK</h1> */}
        </div>
        <div className="footer-section">
          <h6 className="text-xl font-bold mb-4">Company</h6>
          <ul className="space-y-2">
            <li><Link to="/about" className="text-gray-400 hover:text-white">About Us</Link></li>
            <li><Link to="/contact" className="text-gray-400 hover:text-white">Contact Us</Link></li>
            <li><Link to="/privacy-policy" className="text-gray-400 hover:text-white">Privacy Policy</Link></li>
            <li><Link to="/terms-condition" className="text-gray-400 hover:text-white">Terms & Condition</Link></li>
            <li><Link to="/support" className="text-gray-400 hover:text-white">Support</Link></li>
          </ul>
        </div>
        <div className="footer-section">
          <h6 className="text-xl font-bold mb-4">Services</h6>
          <ul className="space-y-2">
            <li><Link to="/case-management" className="text-gray-400 hover:text-white">Case Management</Link></li>
            <li><Link to="/lawyers" className="text-gray-400 hover:text-white">Our Lawyers</Link></li>
            <li><Link to="/documents" className="text-gray-400 hover:text-white">Documents</Link></li>
            <li><Link to="/communication" className="text-gray-400 hover:text-white">Communication</Link></li>
            <li><Link to="/billing" className="text-gray-400 hover:text-white">Billing</Link></li>
          </ul>
        </div>
        <div className="footer-section">
          <h6 className="text-xl font-bold mb-4">Contact</h6>
          <p className="flex items-center"><i className="fa fa-map-marker-alt mr-3"></i>Nairobi, Kenya</p>
          <p className="flex items-center"><i className="fa fa-phone-alt mr-3"></i>+254 723 831 464</p>
          <p className="flex items-center"><i className="fa fa-envelope mr-3"></i>mathuprudence24@gmail.com</p>
        </div>
      </div>
    </footer>
  );
}
