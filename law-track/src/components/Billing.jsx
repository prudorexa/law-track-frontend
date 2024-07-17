import React, { useState } from 'react';
import { Container, Paper, Typography, TextField, Button, Grid } from '@mui/material';
import axios from 'axios';
import lawFirmImage from '../assets/laww.webp';

const Billing = ({ onSuccess }) => {
  const [invoiceNumber, setInvoiceNumber] = useState('');
  const [amount, setAmount] = useState('');
  const [issueDate, setIssueDate] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://127.0.0.1:8000/api/billings/', {
        invoice_number: invoiceNumber,
        amount: amount,
        issue_date: issueDate,
        due_date: dueDate,
        case: 1,  // Replace with the actual case ID you want to associate with
      });
      onSuccess(); // Optional: Callback to handle success, like clearing form or updating data
      console.log('Billing submitted:', response.data);
    } catch (error) {
      console.error('Error submitting billing:', error);
      setError('Failed to submit billing information. Please try again.');
    }
  };

  return (
    <Container maxWidth="lg" style={{ marginTop: '20px' }}>
      <Paper style={{ padding: '20px' }}>
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
                style={{ marginBottom: '20px' }}
              />
              <TextField
                fullWidth
                required
                type="number"
                label="Amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                style={{ marginBottom: '20px' }}
              />
              <TextField
                fullWidth
                required
                type="date"
                label="Issue Date"
                value={issueDate}
                onChange={(e) => setIssueDate(e.target.value)}
                style={{ marginBottom: '20px' }}
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
                style={{ marginBottom: '20px' }}
                InputLabelProps={{
                  shrink: true,
                }}
              />
              {error && <Typography variant="body2" color="error" style={{ marginBottom: '20px' }}>{error}</Typography>}
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
