import React, { useEffect, useState } from 'react';
import axios from 'axios';
import BASE_URL from '../../config';

const Cases = () => {
  const [cases, setCases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedCases, setExpandedCases] = useState({});

  const fetchCases = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/api/cases/`);
      setCases(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching cases:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCases();
  }, []);

  const toggleReadMore = (id) => {
    setExpandedCases((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="loader"></div> {/* Optional: Add a spinner for loading state */}
      </div>
    );
  }

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-8">Cases</h1>
      <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-6">
        {cases.map((caseItem) => (
          <div
            key={caseItem.id}
            className="border border-gray-300 bg-white p-6 rounded-lg shadow-md"
          >
            <p className="font-bold text-xl text-gray-800 mb-2">Case Number: {caseItem.case_number}</p>
            <p className="font-bold text-lg text-gray-700 mb-2">Case Name: {caseItem.case_name}</p>
            {/* <p className="text-gray-600 mb-4">
              {expandedCases[caseItem.id] ? caseItem.case_description : `${caseItem.case_description.slice(0, 100)}...`}
            </p> */}
            <button
              onClick={() => toggleReadMore(caseItem.id)}
              className="text-blue-500 hover:underline mb-4"
            >
              {expandedCases[caseItem.id] ? 'Read Less' : 'Read More'}
            </button>
            <p className="font-semibold text-gray-700">Assigned Lawyer ID: {caseItem.assigned_lawyer}</p>
            {/* <p className="font-semibold text-gray-700">Clients: {caseItem.clients.join(', ')}</p> */}
            <p className="font-semibold text-gray-700">Created At: {new Date(caseItem.created_at).toLocaleDateString()}</p>
            <p className="font-semibold text-gray-700">Updated At: {new Date(caseItem.updated_at).toLocaleDateString()}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Cases;
