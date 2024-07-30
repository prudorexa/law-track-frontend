import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Documents = () => {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchDocuments = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/api/documents/`);
      setDocuments(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching documents:', error); 
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDocuments();
  }, []);

  if (loading) {
    return <div className="text-center mt-8">Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl sm:text-4xl font-bold mb-8 text-center">Documents</h1>
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {documents.map((document) => (
          <li key={document.id} className="border p-4 rounded-lg shadow-lg bg-white">
            <div className="text-lg sm:text-xl md:text-2xl font-semibold mb-4">Name: {document.name}</div>
            <div className="text-sm sm:text-base md:text-lg text-gray-800 mb-4">Uploaded At: {document.uploaded_at}</div>
            <div className="text-sm sm:text-base md:text-lg text-gray-800 mb-4">Case: {document.case_id}</div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Documents;
