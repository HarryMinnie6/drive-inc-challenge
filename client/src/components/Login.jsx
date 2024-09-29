// // src/Login.js
// import React, { useState } from 'react';

// const Login = ({ onLogin }) => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');

//   const handleLogin = async () => {
//     try {
//       const response = await fetch('http://localhost:3000/users/login', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ email, password }),
//       });

//       if (!response.ok) {
//         throw new Error('Login failed');
//       }

//       const data = await response.json();
//       const token = data.token;
//       const userEmail = JSON.stringify(data.email.email);

//       // Store the token in localStorage
//       localStorage.setItem('token', token);
//       localStorage.setItem('email', userEmail);

//       // Call the onLogin prop to update parent component state
//       onLogin(token, userEmail)
//       console.log('User logged in successfully:', token);
//     } catch (err) {
//       setError(err.message || 'Login failed');
//       console.error('Login error:', err);
//     }
//   };

//   return (
//     <div>
//       <h2>Login</h2>
//       {error && <p style={{ color: 'red' }}>{error}</p>}
//       <input
//         type="email"
//         placeholder="Email"
//         value={email}
//         onChange={(e) => setEmail(e.target.value)}
//       />
//       <input
//         type="password"
//         placeholder="Password"
//         value={password}
//         onChange={(e) => setPassword(e.target.value)}
//       />
//       <button onClick={handleLogin}>Login</button>
//     </div>
//   );
// };

// export default Login;
