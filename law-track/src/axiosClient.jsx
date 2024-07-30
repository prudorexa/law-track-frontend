// src/api/axiosClient.js
import axios from 'axios';
import { API_BASE_URL } from '../config';

// Configure Axios instance for API requests
axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';
axios.defaults.withCredentials = true;

const client = axios.create({
  baseURL: API_BASE_URL,
});

export default client;
