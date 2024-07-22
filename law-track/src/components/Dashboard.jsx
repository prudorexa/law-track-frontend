import React, { useEffect, useState } from 'react';
import { Container, Grid, Paper, Typography, Button, List, ListItem, ListItemText, CircularProgress } from '@mui/material';
import axios from 'axios';
import { Link } from 'react-router-dom';
const Dashboard = () => {
  const [cases, setCases] = useState([]);
  const [documents, setDocuments] = useState([]);
  const [schedule, setSchedule] = useState([]);
  const [billing, setBilling] = useState([]);
  const [communication, setCommunication] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [
          casesResponse,
          documentsResponse,
          scheduleResponse,
          billingResponse,
          communicationResponse
        ] = await axios.all([
          axios.get('/api/lawyer/cases/'),
          axios.get('/api/admin/reports/'),
          axios.get('/api/lawyer/schedules/'),
          axios.get('/api/admin/users/'),
          axios.get('/api/client/communications/')
        ]);
        setCases(Array.isArray(casesResponse.data) ? casesResponse.data : []);
        setDocuments(Array.isArray(documentsResponse.data) ? documentsResponse.data : []);
        setSchedule(Array.isArray(scheduleResponse.data) ? scheduleResponse.data : []);
        setBilling(Array.isArray(billingResponse.data) ? billingResponse.data : []);
        setCommunication(Array.isArray(communicationResponse.data) ? communicationResponse.data : []);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Failed to fetch data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);
  if (loading) {
    return (
      <Container maxWidth="lg" style={{ marginTop: '20px', textAlign: 'center' }}>
        <CircularProgress />
      </Container>
    );
  }
  if (error) {
    return (
      <Container maxWidth="lg" style={{ marginTop: '20px', textAlign: 'center' }}>
        <Typography variant="h6" color="error">{error}</Typography>
      </Container>
    );
  }
  return (
    <Container
      maxWidth="lg"
      style={{ marginTop: '20px', background: 'linear-gradient(to right, #2B5876, #4E4376)', padding: '20px', borderRadius: '10px' }}
    >
      <Typography variant="h4" gutterBottom style={{ color: '#fff', textAlign: 'center' }}>
        Dashboard
      </Typography>
      <Grid container spacing={3}>
        {/* Cases Section */}
        <Grid item xs={12} md={6}>
          <Paper style={{ padding: '20px', background: 'rgba(255, 255, 255, 0.8)' }}>
            <Typography variant="h6" gutterBottom>
              Cases
            </Typography>
            <List>
              {Array.isArray(cases) && cases.map((caseItem) => (
                <ListItem key={caseItem.id}>
                  <ListItemText primary={caseItem.name} secondary={caseItem.description} />
                </ListItem>
              ))}
            </List>
            <Button component={Link} to="/cases" variant="contained" style={{ marginTop: '10px' }}>
              View All Cases
            </Button>
          </Paper>
        </Grid>
        {/* Documents Section */}
        <Grid item xs={12} md={6}>
          <Paper style={{ padding: '20px', background: 'rgba(255, 255, 255, 0.8)' }}>
            <Typography variant="h6" gutterBottom>
              Documents
            </Typography>
            <List>
              {Array.isArray(documents) && documents.map((document) => (
                <ListItem key={document.id}>
                  <ListItemText primary={document.title} secondary={document.category} />
                </ListItem>
              ))}
            </List>
            <Button component={Link} to="/documents" variant="contained" style={{ marginTop: '10px' }}>
              View All Documents
            </Button>
          </Paper>
        </Grid>
        {/* Schedule Section */}
        <Grid item xs={12} md={6}>
          <Paper style={{ padding: '20px', background: 'rgba(255, 255, 255, 0.8)' }}>
            <Typography variant="h6" gutterBottom>
              Schedule
            </Typography>
            <List>
              {Array.isArray(schedule) && schedule.map((event) => (
                <ListItem key={event.id}>
                  <ListItemText primary={event.title} secondary={event.date} />
                </ListItem>
              ))}
            </List>
            <Button component={Link} to="/schedule" variant="contained" style={{ marginTop: '10px' }}>
              View Schedule
            </Button>
          </Paper>
        </Grid>
        {/* Billing Section */}
        <Grid item xs={12} md={6}>
          <Paper style={{ padding: '20px', background: 'rgba(255, 255, 255, 0.8)' }}>
            <Typography variant="h6" gutterBottom>
              Billing
            </Typography>
            <List>
              {Array.isArray(billing) && billing.map((invoice) => (
                <ListItem key={invoice.id}>
                  <ListItemText primary={`Invoice #${invoice.id}`} secondary={`Amount: $${invoice.amount}`} />
                </ListItem>
              ))}
            </List>
            <Button component={Link} to="/billing" variant="contained" style={{ marginTop: '10px' }}>
              View Billing
            </Button>
          </Paper>
        </Grid>
        {/* Communication Section */}
        <Grid item xs={12}>
          <Paper style={{ padding: '20px', background: 'rgba(255, 255, 255, 0.8)' }}>
            <Typography variant="h6" gutterBottom>
              Communication
            </Typography>
            <List>
              {Array.isArray(communication) && communication.map((message) => (
                <ListItem key={message.id}>
                  <ListItemText primary={message.subject} secondary={message.sender} />
                </ListItem>
              ))}
            </List>
            <Button component={Link} to="/communication" variant="contained" style={{ marginTop: '10px' }}>
              View Communication
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};
export default Dashboard;
