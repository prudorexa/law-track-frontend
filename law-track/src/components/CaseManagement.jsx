import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';
axios.defaults.withCredentials = true;

const client = axios.create({
  baseURL: "http://127.0.0.1:8000/api/"
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
        className="w-full px-4 py-2 border rounded-md"
      />
      <textarea
        name="description"
        placeholder="Description"
        value={form.description}
        onChange={handleInputChange}
        required
        className="w-full px-4 py-2 border rounded-md"
      />
      <select
        name="status"
        value={form.status}
        onChange={handleInputChange}
        required
        className="w-full px-4 py-2 border rounded-md"
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
        className="w-full px-4 py-2 border rounded-md"
      >
        {lawyers.map(lawyer => (
          <option key={lawyer.id} value={lawyer.id}>
            {lawyer.name}
          </option>
        ))}
      </select>
      <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-md">
        {loading ? 'Processing...' : 'Save'}
      </button>
    </form>
  );
};

const CaseList = ({ cases, onEdit, onDelete }) => {
  return (
    <ul className="space-y-4">
      {cases.map(caseItem => (
        <li key={caseItem.id} className="p-4 border rounded-md shadow-sm">
          <h2 className="text-xl font-semibold">{caseItem.title}</h2>
          <p className="text-gray-700">{caseItem.description}</p>
          <p className="text-gray-600">Status: {caseItem.status}</p>
          <p className="text-gray-600">Assigned Lawyers: {caseItem.assigned_lawyers.map(lawyer => lawyer.name).join(', ')}</p>
          <div className="space-x-2">
            <button onClick={() => onEdit(caseItem)} className="px-4 py-2 bg-yellow-500 text-white rounded-md">Edit</button>
            <button onClick={() => onDelete(caseItem.id)} className="px-4 py-2 bg-red-500 text-white rounded-md">Delete</button>
          </div>
        </li>
      ))}
    </ul>
  );
};

const CaseManagement = () => {
  const { data: cases, reload: reloadCases } = useData('/cases/');
  const { data: lawyers } = useData('/lawyers/');
  const [editCase, setEditCase] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleFormSubmit = async (form) => {
    setLoading(true);
    setMessage('');
    try {
      if (editCase) {
        await client.put(`/cases/${editCase.id}/`, form);
        setMessage('Case updated successfully!');
      } else {
        await client.post('/cases/', form);
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
      await client.delete(`/cases/${id}/`);
      setMessage('Case deleted successfully!');
      reloadCases();
    } catch (error) {
      setMessage('Failed to delete the case.');
    }
  };

  const handleViewDetails = (id) => {
    // Navigate to case details page
    // Example using react-router-dom
    navigate(`/cases/${id}`);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Case Management</h1>
      {message && <div className="message">{message}</div>}
      <CaseForm onSubmit={handleFormSubmit} editCase={editCase} lawyers={lawyers} loading={loading} />
      <CaseList cases={cases} onEdit={handleEdit} onDelete={handleDelete} onViewDetails={handleViewDetails} />
    </div>
  );
};

export default CaseManagement;
