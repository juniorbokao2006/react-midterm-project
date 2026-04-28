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
  const [loading, setLoading] = useState(false); // NEW: Loading state
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // --- FEATURE: Basic Client-side Validation ---
    if (formData.password.length < 6) {
      return setError('Password must be at least 6 characters long');
    }

    setLoading(true); // Start loading

    try {
      // Logic: registerUser in api.js already handles the .json() and the error check
      await registerUser(formData);
      
      alert('Registration successful! Redirecting to login...');
      navigate('/login');
    } catch (err) {
      // Logic: This catches the "Registration failed" error thrown by your api.js
      setError(err.message || 'Could not connect to the server.');
    } finally {
      setLoading(false); // Stop loading regardless of result
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '50px auto', textAlign: 'center', fontFamily: 'Arial' }}>
      <h2>Create Account</h2>
      
      {/* FEATURE: Improved Error Styling */}
      {error && (
        <div style={{ backgroundColor: '#ffebee', color: '#c62828', padding: '10px', borderRadius: '4px', marginBottom: '15px' }}>
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
            style={{ width: '100%', padding: '12px', boxSizing: 'border-box' }}
          />
        </div>
        <div style={{ marginBottom: '15px' }}>
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            required
            style={{ width: '100%', padding: '12px', boxSizing: 'border-box' }}
          />
        </div>
        <div style={{ marginBottom: '15px' }}>
          <input
            type="password"
            name="password"
            placeholder="Password (min 6 chars)"
            value={formData.password}
            onChange={handleChange}
            required
            style={{ width: '100%', padding: '12px', boxSizing: 'border-box' }}
          />
        </div>

        {/* FEATURE: Dynamic Button Text */}
        <button 
          type="submit" 
          disabled={loading}
          style={{ 
            width: '100%', 
            padding: '12px', 
            backgroundColor: loading ? '#ccc' : '#007bff', 
            color: 'white', 
            border: 'none', 
            borderRadius: '4px',
            cursor: loading ? 'not-allowed' : 'pointer' 
          }}
        >
          {loading ? 'Registering...' : 'Register'}
        </button>
      </form>

      <p style={{ marginTop: '15px' }}>
        Already have an account? <span onClick={() => navigate('/login')} style={{ color: 'blue', cursor: 'pointer', fontWeight: 'bold' }}>Login here</span>
      </p>
    </div>
  );
};

export default Register;