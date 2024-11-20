import React, { useState, useEffect } from 'react';
import './RegisterPage.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const RegisterPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [user, setUser] = useState(null); // Store the logged-in user data
  const [showDialog, setShowDialog] = useState(false); // Control popup dialog visibility
  const navigate = useNavigate(); // React Router's navigate function

  // Check if the user is already logged in by looking at localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setShowDialog(true); // Show dialog if user is logged in
    }
  }, []);

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await axios.post('http://localhost:5000/api/register', {
        name,
        email,
        password,
      });

      alert('User registered successfully!');
      setName('');
      setEmail('');
      setPassword('');
    } catch (err) {
      console.error('Registration error:', err.response ? err.response.data.message : err.message);
      setError(err.response ? err.response.data.message : 'Something went wrong. Please try again.');
    }
  };

  const handleDialogClose = () => {
    setShowDialog(false);
    navigate('/login'); // Redirect to the login page after closing the dialog
  };

  if (showDialog) {
    return (
      <div className="dialog-overlay">
        <div className="dialog">
          <h3>You are already logged in as {user?.name}.</h3> 
          <h3>Please log out to register a new account.</h3>
          <button onClick={handleDialogClose}>Okay</button>
        </div>
      </div>
    );
  }

  return (
    <div className="register-page">
      <h2>Register</h2>
      <form onSubmit={handleRegister}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Register</button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </form>
    </div>
  );
};

export default RegisterPage;
