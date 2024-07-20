import React, { useState } from 'react';
import { Container, Paper, Typography, TextField, Button, Grid } from '@mui/material';
import axios from 'axios';
import lawFirmImage from '../assets/laww.webp';

// Configure Axios instance for API requests
axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';
axios.defaults.withCredentials = true;

const client = axios.create({
  baseURL: 'http://127.0.0.1:8000/api/',
});

const Billing = ({ onSuccess }) => {
  const [invoiceNumber, setInvoiceNumber] = useState('');
  const [amount, setAmount] = useState('');
  const [issueDate, setIssueDate] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await client.post('billings/', {
        invoice_number: invoiceNumber,
        amount: amount,
        issue_date: issueDate,
        due_date: dueDate,
        case: 1, // Replace with the actual case ID you want to associate with
      });
      if (onSuccess) onSuccess(); // Optional: Callback to handle success, like clearing form or updating data
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
                value={invoiceNumber}
                onChange={(e) => setInvoiceNumber(e.target.value)}
                sx={{ marginBottom: 2 }}
              />
              <TextField
                fullWidth
                required
                type="number"
                label="Amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                sx={{ marginBottom: 2 }}
              />
              <TextField
                fullWidth
                required
                type="date"
                label="Issue Date"
                value={issueDate}
                onChange={(e) => setIssueDate(e.target.value)}
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
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                sx={{ marginBottom: 2 }}
                InputLabelProps={{
                  shrink: true,
                }}
              />
              {error && <Typography variant="body2" color="error" sx={{ marginBottom: 2 }}>{error}</Typography>}
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
