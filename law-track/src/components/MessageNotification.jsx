// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const MessageNotificationComponent = () => {
//   const [messages, setMessages] = useState([]);
//   const [notifications, setNotifications] = useState([]);

//   useEffect(() => {
//     // Fetch messages
//     axios.get('/api/messages/')
//       .then(response => {
//         setMessages(response.data);
//       })
//       .catch(error => {
//         console.error('Error fetching messages:', error);
//       });

//     // Fetch notifications
//     axios.get('/api/notifications/')
//       .then(response => {
//         setNotifications(response.data);
//       })
//       .catch(error => {
//         console.error('Error fetching notifications:', error);
//       });
//   }, []);

//   return (
//     <div>
//       <h2>Messages</h2>
//       <ul>
//         {messages.map(message => (
//           <li key={message.id}>
//             <strong>From: {message.sender.username}</strong>
//             <p>Subject: {message.subject}</p>
//             <p>Content: {message.content}</p>
//           </li>
//         ))}
//       </ul>

//       <h2>Notifications</h2>
//       <ul>
//         {notifications.map(notification => (
//           <li key={notification.id}>
//             <p>User: {notification.user.username}</p>
//             <p>Message: {notification.message.subject}</p>
//             <p>Read: {notification.is_read ? 'Yes' : 'No'}</p>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default MessageNotificationComponent;
