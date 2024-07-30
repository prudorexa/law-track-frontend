import React, { useState, useEffect } from 'react';
import { Container, Paper, Typography, TextField, Button, Grid, MenuItem, Select, FormControl, InputLabel } from '@mui/material';
import axios from 'axios';
import lawFirmImage from '../assets/laww.webp';
import BASE_URL from '../../config';

// Configure Axios instance for API requests
axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';
axios.defaults.withCredentials = true;

const client = axios.create({
  baseURL: BASE_URL
});

const Billing = ({ onSuccess }) => {
  const [formData, setFormData] = useState({
    invoiceNumber: '',
    amount: '',
    issueDate: '',
    dueDate: '',
    caseId: '',
  });
  const [cases, setCases] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const generateInvoiceNumber = () => {
      return `INV-${Math.floor(Math.random() * 1000000)}`;
    };

    setFormData({
      invoiceNumber: generateInvoiceNumber(),
      amount: '',
      issueDate: new Date().toISOString().split('T')[0], 
      caseId: '',
    });

    const fetchCases = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/cases/`);
        setCases(response.data);
      } catch (error) {
        console.error('Error fetching cases:', error);
        setError('Failed to fetch cases. Please try again.');
      }
    };

    fetchCases();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await client.post(`${BASE_URL}/api/billings/`, {
        invoice_number: formData.invoiceNumber,
        amount: formData.amount,
        issue_date: formData.issueDate,
        due_date: formData.dueDate,
        case: formData.caseId, 
      });
      if (onSuccess) onSuccess(response.data); 
      console.log('Billing submitted:', response.data);
    } catch (error) {
      console.error('Error submitting billing:', error);
      if (error.response) {
        console.error('Error response data:', error.response.data);
      }
      setError('Failed to submit billing information. Please try again.');
    }
  };

  return (
    <Container maxWidth="lg" sx={{ marginTop: 4 }}>
      <Paper sx={{ padding: 4 }}>
        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} md={6}>
            <img src={lawFirmImage} alt="Law Firm" style={{ width: '100%', height: 'auto' }} />
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="h5" gutterBottom>
              Add New Billing
            </Typography>
            <form onSubmit={handleSubmit}>
              <TextField
                fullWidth
                required
                label="Invoice Number"
                name="invoiceNumber"
                value={formData.invoiceNumber}
                onChange={handleChange}
                sx={{ marginBottom: 2 }}
                InputProps={{
                  readOnly: true,
                }}
              />
              <TextField
                fullWidth
                required
                type="number"
                label="Amount"
                name="amount"
                value={formData.amount}
                onChange={handleChange}
                sx={{ marginBottom: 2 }}
              />
              <TextField
                fullWidth
                required
                type="date"
                label="Issue Date"
                name="issueDate"
                value={formData.issueDate}
                onChange={handleChange}
                sx={{ marginBottom: 2 }}
                InputLabelProps={{
                  shrink: true,
                }}
                InputProps={{
                  readOnly: true,
                }}
              />
              <TextField
                fullWidth
                required
                type="date"
                label="Due Date"
                name="dueDate"
                value={formData.dueDate}
                onChange={handleChange}
                sx={{ marginBottom: 2 }}
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <FormControl fullWidth required sx={{ marginBottom: 2 }}>
                <InputLabel id="case-select-label">Select Case</InputLabel>
                <Select
                  labelId="case-select-label"
                  id="case-select"
                  name="caseId"
                  value={formData.caseId}
                  onChange={handleChange}
                  label="Select Case"
                >
                  {cases.map((caseItem) => (
                    <MenuItem key={caseItem.id} value={caseItem.id}>
                      {caseItem.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              {error && (
                <Typography variant="body2" color="error" sx={{ marginBottom: 2 }}>
                  {error}
                </Typography>
              )}
              <Button type="submit" variant="contained" color="primary">
                Submit
              </Button>
            </form>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default Billing;
