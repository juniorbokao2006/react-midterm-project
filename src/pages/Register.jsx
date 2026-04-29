import { registerUser } from '../services/api';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      // Sending formData which now correctly contains 'username'
      const data = await registerUser(formData);

      // Assuming registerUser returns the data if successful
      // If your api service throws an error on failure, the catch block will handle it
      alert('Registration successful! Please login.');
      navigate('/login'); 
      
    } catch (err) {
      // This catches 400, 404, and 500 errors from the server
      const errorMessage = err.response?.data?.message || 'Registration failed. Please try again.';
      setError(errorMessage);
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '50px auto', textAlign: 'center', backgroundColor: '#1a1a1a', padding: '20px', borderRadius: '8px', color: 'white' }}>
      <h2>CREATE ACCOUNT</h2>
      {error && (
        <div style={{ backgroundColor: '#ffe6e6', color: '#cc0000', padding: '10px', marginBottom: '15px', borderRadius: '4px' }}>
          {error}
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '15px' }}>
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            required
            style={{ width: '100%', padding: '12px', boxSizing: 'border-box', borderRadius: '4px', border: '1px solid #333', backgroundColor: '#2d2d2d', color: 'white' }}
          />
        </div>
        <div style={{ marginBottom: '15px' }}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
            style={{ width: '100%', padding: '12px', boxSizing: 'border-box', borderRadius: '4px', border: '1px solid #333', backgroundColor: '#2d2d2d', color: 'white' }}
          />
        </div>
        <div style={{ marginBottom: '15px' }}>
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            style={{ width: '100%', padding: '12px', boxSizing: 'border-box', borderRadius: '4px', border: '1px solid #333', backgroundColor: '#2d2d2d', color: 'white' }}
          />
        </div>
        <button 
          type="submit" 
          style={{ width: '100%', padding: '12px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}
        >
          Register
        </button>
      </form>
      <p style={{ marginTop: '15px' }}>
        Already have an account? <span onClick={() => navigate('/login')} style={{ color: '#007bff', cursor: 'pointer' }}>Login here</span>
      </p>
    </div>
  );
};

export default Register;