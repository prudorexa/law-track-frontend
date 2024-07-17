import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Grid,
  List,
  ListItem,
  ListItemText,
  Divider,
  Snackbar,
} from '@mui/material';
import lawFirmImage from '../assets/negotiation.webp';

const Communication = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [notifications, setNotifications] = useState([]);
  const [error, setError] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  useEffect(() => {
    fetchMessages();
    fetchNotifications();
  }, []);

  const fetchMessages = async () => {
    try {
      const response = await axios.get('/api/communication/messages/');
      setMessages(response.data); // Assuming response.data is an array of messages
    } catch (error) {
      console.error('Error fetching messages:', error);
      setError('Failed to fetch messages. Please try again.');
    }
  };

  const fetchNotifications = async () => {
    try {
      const response = await axios.get('/api/communication/notifications/');
      setNotifications(response.data); // Assuming response.data is an array of notifications
    } catch (error) {
      console.error('Error fetching notifications:', error);
      setError('Failed to fetch notifications. Please try again.');
    }
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/communication/messages/', {
        content: newMessage,
      });
      setNewMessage('');
      fetchMessages(); // Fetch messages again after sending new message
      setSnackbarOpen(true);
      console.log('Message sent:', response.data);
    } catch (error) {
      console.error('Error sending message:', error);
      setError('Failed to send message. Please try again.');
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <Container maxWidth="lg" style={{ marginTop: '20px' }}>
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        message="Message sent successfully!"
      />
      <Paper style={{ padding: '20px' }}>
        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} md={6}>
            <img src={lawFirmImage} alt="Law Firm" style={{ width: '100%', height: 'auto' }} />
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="h5" gutterBottom>
              Communication
            </Typography>
            <form onSubmit={handleSendMessage}>
              <TextField
                fullWidth
                required
                label="New Message"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                style={{ marginBottom: '20px' }}
              />
              <Button type="submit" variant="contained" color="primary">
                Send Message
              </Button>
            </form>
            <Typography variant="h6" style={{ marginTop: '20px' }}>
              Messages
            </Typography>
            <List>
              {Array.isArray(messages) && messages.length > 0 ? (
                messages.map((message) => (
                  <React.Fragment key={message.id}>
                    <ListItem>
                      <ListItemText primary={message.content} secondary={new Date(message.timestamp).toLocaleString()} />
                    </ListItem>
                    <Divider />
                  </React.Fragment>
                ))
              ) : (
                <Typography variant="body2" color="textSecondary" style={{ marginTop: '10px' }}>
                  No messages available.
                </Typography>
              )}
            </List>
            <Typography variant="h6" style={{ marginTop: '20px' }}>
              Notifications
            </Typography>
            <List>
              {Array.isArray(notifications) && notifications.length > 0 ? (
                notifications.map((notification) => (
                  <React.Fragment key={notification.id}>
                    <ListItem>
                      <ListItemText primary={notification.message} secondary={new Date(notification.timestamp).toLocaleString()} />
                    </ListItem>
                    <Divider />
                  </React.Fragment>
                ))
              ) : (
                <Typography variant="body2" color="textSecondary" style={{ marginTop: '10px' }}>
                  No notifications available.
                </Typography>
              )}
            </List>
            {error && <Typography variant="body2" color="error" style={{ marginTop: '10px' }}>{error}</Typography>}
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default Communication;
