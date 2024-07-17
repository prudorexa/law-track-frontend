import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Cases = () => {
  const [cases, setCases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedCases, setExpandedCases] = useState({});

  const fetchCases = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/cases/');
      console.log('Cases data:', response.data); // Log the response data
      setCases(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching cases:', error); // Log errors for debugging
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
    return <div>Loading...</div>;
  }

  return (
    <div className='grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-4 bg-white rounded-full text-gray-800 text-base lg:text-lg'>
      <h1>Cases</h1>
      {cases.map((caseItem) => (
        <div key={caseItem.id} className='border p-3 bg-neutral-400 mx-9 my-8 rounded-lg font-bold'>
          <p className='font-bold text-4xl text-black-500'>Case Number: {caseItem.case_number}</p>
          <p className='font-bold text-2xl text-black-500'>Case Name: {caseItem.case_name}</p>
          <p>
            {expandedCases[caseItem.id] ? caseItem.case_description : `${caseItem.case_description.slice(0, 100)}...`}
          </p>
          <button
            onClick={() => toggleReadMore(caseItem.id)}
            className='text-blue-500 underline'
          >
            {expandedCases[caseItem.id] ? 'Read Less' : 'Read More'}
          </button>
          <p className='font-bold text-xl text-blue-4900'>Assigned Lawyer ID: {caseItem.assigned_lawyer}</p>
          <p className='font-bold text-xl text-blue-4900'>Clients: {caseItem.clients.join(', ')}</p>
          <p className='font-bold text-xl text-blue-4900'>Created At: {caseItem.created_at}</p>
          <p className='font-bold text-xl text-blue-4900'>Updated At: {caseItem.updated_at}</p>
        </div>
      ))}
    </div>
  );
};

export default Cases;
