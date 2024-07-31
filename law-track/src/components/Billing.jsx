import React, { useState, useEffect } from 'react';
import { Container, Paper, Typography, TextField, Button, Grid, MenuItem, Select, FormControl, InputLabel, Box } from '@mui/material';
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
    const generateInvoiceNumber = () => `INV-${Math.floor(Math.random() * 1000000)}`;

    setFormData({
      invoiceNumber: generateInvoiceNumber(),
      amount: '',
      issueDate: new Date().toISOString().split('T')[0],
      dueDate: '',
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
    setFormData(prevFormData => ({ ...prevFormData, [name]: value }));
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
      alert('Billing information submitted successfully!');
    } catch (error) {
      console.error('Error submitting billing:', error);
      setError('Failed to submit billing information. Please try again.');
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundImage: `url(${lawFirmImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        padding: 2,
      }}
    >
      <Container maxWidth="sm">
        <Paper sx={{ padding: 3, backgroundColor: 'rgba(255, 255, 255, 0.9)' }}>
          <Typography variant="h5" gutterBottom align="center">
            Add New Billing
          </Typography>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  required
                  label="Invoice Number"
                  name="invoiceNumber"
                  value={formData.invoiceNumber}
                  onChange={handleChange}
                  InputProps={{ readOnly: true }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  required
                  type="number"
                  label="Amount"
                  name="amount"
                  value={formData.amount}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  required
                  type="date"
                  label="Issue Date"
                  name="issueDate"
                  value={formData.issueDate}
                  onChange={handleChange}
                  InputLabelProps={{ shrink: true }}
                  InputProps={{ readOnly: true }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  required
                  type="date"
                  label="Due Date"
                  name="dueDate"
                  value={formData.dueDate}
                  onChange={handleChange}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth required>
                  <InputLabel id="case-select-label">Select Case</InputLabel>
                  <Select
                    labelId="case-select-label"
                    id="case-select"
                    name="caseId"
                    value={formData.caseId}
                    onChange={handleChange}
                    label="Select Case"
                  >
                    {cases.map(caseItem => (
                      <MenuItem key={caseItem.id} value={caseItem.id}>
                        {caseItem.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              {error && (
                <Grid item xs={12}>
                  <Typography variant="body2" color="error" align="center">
                    {error}
                  </Typography>
                </Grid>
              )}
              <Grid item xs={12}>
                <Button type="submit" variant="contained" color="primary" fullWidth>
                  Submit
                </Button>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Container>
    </Box>
  );
};

export default Billing;
