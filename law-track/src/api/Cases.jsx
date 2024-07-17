import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000/api/api/lawyers/';
const API_URL2 = 'http://127.0.0.1:8000/api/api/cases/';

export const getCases = async () => {
    const response = await axios.get(`${API_URL}cases/`);
    return response.data;
};

export const getLawyers = async () => {
    const response = await axios.get(`${API_URL}lawyers/`);
    return response.data;
};

export const createCase = async (caseData) => {
    const response = await axios.post(`${API_URL}cases/`, caseData);
    return response.data;
};

export const updateCase = async (id, caseData) => {
    const response = await axios.put(`${API_URL}cases/${id}/`, caseData);
    return response.data;
};

export const deleteCase = async (id) => {
    const response = await axios.delete(`${API_URL}cases/${id}/`);
    return response.data;
};
