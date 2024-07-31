import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import BASE_URL from '../../config';

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';
axios.defaults.withCredentials = true;

const client = axios.create({
  baseURL: BASE_URL
});

const useData = (endpoint) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const loadData = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await client.get(endpoint);
      setData(response.data);
    } catch (err) {
      setError('Failed to load data.');
    }
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, [endpoint]);

  return { data, loading, error, reload: loadData };
};

const CaseForm = ({ onSubmit, editCase, lawyers, loading }) => {
  const [form, setForm] = useState({ title: '', description: '', status: 'open', assigned_lawyers: [] });

  useEffect(() => {
    if (editCase) {
      setForm({
        title: editCase.title,
        description: editCase.description,
        status: editCase.status,
        assigned_lawyers: editCase.assigned_lawyers.map(lawyer => lawyer.id),
      });
    } else {
      resetForm();
    }
  }, [editCase]);

  const handleInputChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLawyersChange = (e) => {
    const selectedLawyers = Array.from(e.target.selectedOptions, option => option.value);
    setForm({ ...form, assigned_lawyers: selectedLawyers });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  const resetForm = () => {
    setForm({ title: '', description: '', status: 'open', assigned_lawyers: [] });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 mb-8">
      <input
        type="text"
        name="title"
        placeholder="Title"
        value={form.title}
        onChange={handleInputChange}
        required
        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <textarea
        name="description"
        placeholder="Description"
        value={form.description}
        onChange={handleInputChange}
        required
        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <select
        name="status"
        value={form.status}
        onChange={handleInputChange}
        required
        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="open">Open</option>
        <option value="in_progress">In Progress</option>
        <option value="closed">Closed</option>
      </select>
      <select
        multiple
        name="assigned_lawyers"
        value={form.assigned_lawyers}
        onChange={handleLawyersChange}
        required
        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        {lawyers.map(lawyer => (
          <option key={lawyer.id} value={lawyer.id}>
            {lawyer.name}
          </option>
        ))}
      </select>
      <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
        {loading ? 'Processing...' : 'Save'}
      </button>
    </form>
  );
};

const CaseList = ({ cases, onEdit, onDelete, onViewDetails }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {cases.map(caseItem => (
        <div key={caseItem.id} className="p-4 border border-gray-300 bg-white rounded-md shadow-sm">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">{caseItem.title}</h2>
          <p className="text-gray-700 mb-2">{caseItem.description}</p>
          <p className="text-gray-600 mb-2">Status: {caseItem.status}</p>
          <p className="text-gray-600 mb-4">Assigned Lawyers: {caseItem.assigned_lawyers.map(lawyer => lawyer.name).join(', ')}</p>
          <div className="flex space-x-2">
            <button onClick={() => onEdit(caseItem)} className="px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500">Edit</button>
            <button onClick={() => onDelete(caseItem.id)} className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500">Delete</button>
            <button onClick={() => onViewDetails(caseItem.id)} className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500">View Details</button>
          </div>
        </div>
      ))}
    </div>
  );
};

const CaseManagement = () => {
  const { data: cases, reload: reloadCases } = useData(`${BASE_URL}/api/cases/`);
  const { data: lawyers } = useData(`${BASE_URL}/api/lawyers/`);
  const [editCase, setEditCase] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleFormSubmit = async (form) => {
    setLoading(true);
    setMessage('');
    try {
      if (editCase) {
        await client.put(`${BASE_URL}/api/cases/${editCase.id}/`, form);
        setMessage('Case updated successfully!');
      } else {
        await client.post(`${BASE_URL}/api/cases/`, form);
        setMessage('Case created successfully!');
      }
      setEditCase(null);
      reloadCases();
    } catch (error) {
      setMessage('Failed to save the case.');
    }
    setLoading(false);
  };

  const handleEdit = (caseItem) => {
    setEditCase(caseItem);
  };

  const handleDelete = async (id) => {
    try {
      await client.delete(`${BASE_URL}/api/cases/${id}/`);
      setMessage('Case deleted successfully!');
      reloadCases();
    } catch (error) {
      setMessage('Failed to delete the case.');
    }
  };

  const handleViewDetails = (id) => {
    navigate(`${BASE_URL}/api/cases/${id}`);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Case Management</h1>
      {message && <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 p-4 rounded-md mb-4">{message}</div>}
      
      {/* Button to toggle the form */}
      <button
        onClick={() => setEditCase(null)}
        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
      >
        Create New Case
      </button>
      
      {/* Conditionally render the form or case list */}
      {editCase === null ? (
        <CaseList cases={cases} onEdit={handleEdit} onDelete={handleDelete} onViewDetails={handleViewDetails} />
      ) : (
        <CaseForm onSubmit={handleFormSubmit} editCase={editCase} lawyers={lawyers} loading={loading} />
      )}
    </div>
  );
};

export default CaseManagement;
