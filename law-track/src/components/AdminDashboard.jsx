// import React, { useState } from 'react';
// import { BrowserRouter as Router, Route, Switch, Redirect, Link } from 'react-router-dom';
// import Dashboard from './Dashboard';

// // Example Admin Dashboard component
// const AdminDashboard = () => {
//   const [dropdown, setDropdown] = useState('');

//   const handleDropdown = (item) => {
//     setDropdown(dropdown === item ? '' : item);
//   };

//   return (
//     <div className="p-4">
//       <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
//       <ul className="space-y-2">
//         <li>
//           <button
//             className="text-white hover:text-gray-300"
//             onClick={() => handleDropdown('documents')}
//           >
//             Documents
//           </button>
//           {dropdown === 'documents' && (
//             <ul className="absolute bg-gray-800 p-2 mt-2 space-y-2">
//               <li><Link to="/documents" className="text-white hover:text-gray-300">Documents</Link></li>
//               <li><Link to="/billing" className="text-white hover:text-gray-300">Billing</Link></li>
//               <li><Link to="/schedule" className="text-white hover:text-gray-300">Schedule</Link></li>
//               <li><Link to="/communication" className="text-white hover:text-gray-300">Communication</Link></li>
//               <li><Link to="/cases" className="text-white hover:text-gray-300">Cases</Link></li>
//               <li><Link to="/casemanagement" className="text-white hover:text-gray-300">Case Management</Link></li>
//             </ul>
//           )}
//         </li>
//       </ul>
//     </div>
//   );
// };

// // Example PrivateRoute component for authentication
// const PrivateRoute = ({ component: Component, isLoggedIn, ...rest }) => (
//   <Route
//     {...rest}
//     render={(props) =>
//       isLoggedIn ? (
//         <Component {...props} />
//       ) : (
//         <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
//       )
//     }
//   />
// );

// // Example App component with authentication and routing
// const App = () => {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);

//   const handleLogin = () => {
//     // Simulating login, set isLoggedIn to true
//     setIsLoggedIn(true);
//   };

//   return (
//     <Router>
//       <div>
//         <nav className="bg-gray-900 text-white p-4">
//           <h1 className="text-xl font-bold">Admin Panel</h1>
//           {isLoggedIn ? (
//             <button className="ml-auto" onClick={() => setIsLoggedIn(false)}>Logout</button>
//           ) : (
//             <button className="ml-auto" onClick={handleLogin}>Login</button>
//           )}
//         </nav>
//         <Switch>
//           <PrivateRoute path="/admin" component={AdminDashboard} isLoggedIn={isLoggedIn} />
//           <Route path="/login">
//             {isLoggedIn ? <Redirect to="/admin" /> : <div>Login Page</div>}
//           </Route>
//           <Route path="/">
//             <div>Home Page</div>
//           </Route>
//         </Switch>
//       </div>
//     </Router>
//   );
// };

// export default AdminDashboard;
