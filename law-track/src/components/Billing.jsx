import React, { useState } from 'react';
import { Container, Paper, Typography, TextField, Button, Grid } from '@mui/material';
import axios from 'axios';
import lawFirmImage from '../assets/laww.webp';

// Configure Axios instance for API requests
axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';
axios.defaults.withCredentials = true;

const client = axios.create({
  baseURL: 'https://law-track-backend-1.onrender.com/api/billings/',
});

const Billing = ({ onSuccess }) => {
  const [formData, setFormData] = useState({
    invoiceNumber: '',
    amount: '',
    issueDate: '',
    dueDate: '',
  });
  const [error, setError] = useState(null);

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
      const response = await client.post('https://law-track-backend-1.onrender.com/api/billings/', {
        invoice_number: formData.invoiceNumber,
        amount: formData.amount,
        issue_date: formData.issueDate,
        due_date: formData.dueDate,
        case: 1, // Replace with the actual case ID you want to associate with
      });
      if (onSuccess) onSuccess(response.data); // Pass the new billing data to onSuccess
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
