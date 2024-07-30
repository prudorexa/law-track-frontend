// import React, { useState, useEffect } from 'react';
// import axios from '../utils/axios';
// import {
//   Container,
//   Paper,
//   Typography,
//   TextField,
//   Button,
//   Grid,
//   List,
//   ListItem,
//   ListItemText,
//   Divider,
//   Snackbar,
//   Alert,
// } from '@mui/material';
// import lawFirmImage from '../assets/negotiation.webp';

// const Communication = () => {
//   const [messages, setMessages] = useState([]);
//   const [newMessage, setNewMessage] = useState({ receiver: '', subject: '', content: '' });
//   const [notifications, setNotifications] = useState([]);
//   const [error, setError] = useState(null);
//   const [snackbarOpen, setSnackbarOpen] = useState(false);

//   useEffect(() => {
//     fetchMessages();
//     fetchNotifications();
//   }, []);

//   const fetchMessages = async () => {
//     try {
//       const response = await axios.get('http://127.0.0.1:8000/api/messages/');
//       setMessages(response.data); // Assuming response.data is an array of messages
//     } catch (error) {
//       console.error('Error fetching messages:', error);
//       setError('Failed to fetch messages. Please try again.');
//     }
//   };

//   const fetchNotifications = async () => {
//     try {
//       const response = await axios.get('https://law-track-backend-1.onrender.com/apinotifications/');
//       setNotifications(response.data); // Assuming response.data is an array of notifications
//     } catch (error) {
//       console.error('Error fetching notifications:', error);
//       setError('Failed to fetch notifications. Please try again.');
//     }
//   };

//   const handleSendMessage = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post('https://law-track-backend-1.onrender.com/apimessages/', newMessage);
//       const sentMessage = response.data;

//       setNewMessage({ receiver: '', subject: '', content: '' });
//       setMessages((prevMessages) => [sentMessage, ...prevMessages]); // Add new message to the top of the list
//       fetchNotifications(); // Fetch notifications again after sending new message
//       setSnackbarOpen(true);
//       console.log('Message sent:', sentMessage);
//     } catch (error) {
//       console.error('Error sending message:', error);
//       setError('Failed to send message. Please try again.');
//     }
//   };

//   const handleSnackbarClose = () => {
//     setSnackbarOpen(false);
//   };

//   return (
//     <Container maxWidth="lg" style={{ marginTop: '20px' }}>
//       <Snackbar
//         anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
//         open={snackbarOpen}
//         autoHideDuration={6000}
//         onClose={handleSnackbarClose}
//       >
//         <Alert onClose={handleSnackbarClose} severity="success">
//           Message sent successfully!
//         </Alert>
//       </Snackbar>
//       <Paper style={{ padding: '20px' }}>
//         <Grid container spacing={4}>
//           <Grid item xs={12} md={6}>
//             <img src={lawFirmImage} alt="Law Firm" style={{ width: '100%', height: 'auto', borderRadius: '8px' }} />
//           </Grid>
//           <Grid item xs={12} md={6}>
//             <Typography variant="h5" gutterBottom>
//               Communication
//             </Typography>
//             <form onSubmit={handleSendMessage}>
//               <TextField
//                 fullWidth
//                 required
//                 label="Receiver"
//                 value={newMessage.receiver}
//                 onChange={(e) => setNewMessage({ ...newMessage, receiver: e.target.value })}
//                 style={{ marginBottom: '20px' }}
//               />
//               <TextField
//                 fullWidth
//                 required
//                 label="Subject"
//                 value={newMessage.subject}
//                 onChange={(e) => setNewMessage({ ...newMessage, subject: e.target.value })}
//                 style={{ marginBottom: '20px' }}
//               />
//               <TextField
//                 fullWidth
//                 required
//                 label="Content"
//                 multiline
//                 rows={4}
//                 value={newMessage.content}
//                 onChange={(e) => setNewMessage({ ...newMessage, content: e.target.value })}
//                 style={{ marginBottom: '20px' }}
//               />
//               <Button type="submit" variant="contained" color="primary">
//                 Send Message
//               </Button>
//             </form>
//             <Typography variant="h6" style={{ marginTop: '20px' }}>
//               Messages
//             </Typography>
//             <List>
//               {messages.length > 0 ? (
//                 messages.map((message) => (
//                   <React.Fragment key={message.id}>
//                     <ListItem>
//                       <ListItemText
//                         primary={`${message.sender} to ${message.receiver} - ${message.subject}`}
//                         secondary={new Date(message.timestamp).toLocaleString()}
//                       />
//                     </ListItem>
//                     <Divider />
//                   </React.Fragment>
//                 ))
//               ) : (
//                 <Typography variant="body2" color="textSecondary" style={{ marginTop: '10px' }}>
//                   No messages available.
//                 </Typography>
//               )}
//             </List>
//             <Typography variant="h6" style={{ marginTop: '20px' }}>
//               Notifications
//             </Typography>
//             <List>
//               {notifications.length > 0 ? (
//                 notifications.map((notification) => (
//                   <React.Fragment key={notification.id}>
//                     <ListItem>
//                       <ListItemText
//                         primary={notification.message.subject}
//                         secondary={new Date(notification.timestamp).toLocaleString()}
//                       />
//                     </ListItem>
//                     <Divider />
//                   </React.Fragment>
//                 ))
//               ) : (
//                 <Typography variant="body2" color="textSecondary" style={{ marginTop: '10px' }}>
//                   No notifications available.
//                 </Typography>
//               )}
//             </List>
//             {error && <Typography variant="body2" color="error" style={{ marginTop: '10px' }}>{error}</Typography>}
//           </Grid>
//         </Grid>
//       </Paper>
//     </Container>
//   );
// };

// export default Communication;
