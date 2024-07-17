import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserDashboard = () => {
  const [userData, setUserData] = useState(null);
  const [cases, setCases] = useState([]); // Initialize cases as an empty array

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userResponse = await axios.get('/api/user/profile'); // Replace with your API endpoint for user data
        setUserData(userResponse.data);

        const casesResponse = await axios.get('/api/user/cases'); // Replace with your API endpoint for cases data
        setCases(casesResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
        setCases([]); // Set cases to an empty array in case of error to prevent map function error
      }
    };

    fetchData();
  }, []);

  if (!userData) {
    return <div>Loading...</div>; // Render a loading indicator while data is being fetched
  }

  return (
    <div>
      <h1>Welcome, {userData.name}!</h1>
      <h2>Your Cases:</h2>
      <ul>
        {cases.length === 0 ? (
          <li>No cases found.</li>
        ) : (
          cases.map((caseItem) => (
            <li key={caseItem.id}>
              <div>Case ID: {caseItem.id}</div>
              <div>Status: {caseItem.status}</div>
              {/* Add more case details as needed */}
            </li>
          ))
        )}
      </ul>
      {/* Add more components and features */}
    </div>
  );
};

export default UserDashboard;
