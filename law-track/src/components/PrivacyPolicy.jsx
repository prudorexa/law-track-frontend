import React from 'react';

// Privacy Policy Component
const PrivacyPolicy = () => {
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-3xl font-bold mb-4 text-gray-800">Privacy Policy</h1>
      
      <section className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-700 mb-2">Introduction</h2>
        <p className="text-gray-600">
          Welcome to [Legal Track] (our). We are committed to protecting and respecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website [Your Website URL] or use our services.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-700 mb-2">Information We Collect</h2>
        <p className="text-gray-600">
          We may collect personal information that you provide to us directly, such as:
        </p>
        <ul className="list-disc list-inside text-gray-600 mb-4">
          <li>Contact information (e.g., name, email address, phone number)</li>
          <li>Legal case details and documents</li>
          <li>Payment information</li>
        </ul>
        <p className="text-gray-600">
          We may also collect information automatically, including:
        </p>
        <ul className="list-disc list-inside text-gray-600 mb-4">
          <li>Usage data (e.g., IP address, browser type, pages visited)</li>
          <li>Cookies and similar technologies</li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-700 mb-2">How We Use Your Information</h2>
        <p className="text-gray-600">
          We use your information to:
        </p>
        <ul className="list-disc list-inside text-gray-600 mb-4">
          <li>Provide and improve our services</li>
          <li>Process transactions and send billing information</li>
          <li>Communicate with you regarding your legal matters</li>
          <li>Enhance user experience and analyze usage</li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-700 mb-2">How We Share Your Information</h2>
        <p className="text-gray-600">
          We do not sell or rent your personal information. We may share your information with:
        </p>
        <ul className="list-disc list-inside text-gray-600 mb-4">
          <li>Service providers who assist us in operating our business</li>
          <li>Legal authorities, if required by law or to protect our rights</li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-700 mb-2">Data Security</h2>
        <p className="text-gray-600">
          We implement reasonable security measures to protect your personal information from unauthorized access, alteration, or disclosure. However, no method of transmission over the Internet or electronic storage is 100% secure.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-700 mb-2">Your Rights</h2>
        <p className="text-gray-600">
          You have the right to:
        </p>
        <ul className="list-disc list-inside text-gray-600 mb-4">
          <li>Access and correct your personal information</li>
          <li>Request deletion of your information</li>
          <li>Opt-out of receiving promotional communications</li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-700 mb-2">Changes to This Privacy Policy</h2>
        <p className="text-gray-600">
          We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new policy on our website. You are advised to review this Privacy Policy periodically for any changes.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold text-gray-700 mb-2">Contact Us</h2>
        <p className="text-gray-600">
          If you have any questions about this Privacy Policy or our data practices, please contact us at:
        </p>
        <p className="text-gray-600">
          [Legal Track] <br />
          [Nairobi] <br />
          [+254723831464] <br />
          [mathuprudence24@gmail.com]
        </p>
      </section>
    </div>
  );
};

export default PrivacyPolicy;
