import React, { useState } from 'react';
import { loginUser } from '../services/api'; // Use the helper we already fixed
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false); // NEW: Loading state
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true); // Start loading spinner/text

    try {
      // 1. Call the function from api.js (Uses the Render URL)
      const data = await loginUser(credentials);
      
      // 2. CRITICAL: Save the token for all future API calls
      localStorage.setItem('token', data.token);
      
      // 3. Take the user to the home/dashboard page
      navigate('/home'); 
    } catch (err) {
      // Catches "Invalid credentials" or "Could not connect"
      setError(err.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false); // Stop loading regardless of result
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '50px auto', textAlign: 'center', fontFamily: 'Arial' }}>
      <h2>Login to Your Account</h2>
      
      {/* Error Message Display */}
      {error && (
        <div style={{ backgroundColor: '#ffebee', color: '#c62828', padding: '10px', borderRadius: '4px', marginBottom: '15px' }}>
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '15px' }}>
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={credentials.email}
            onChange={handleChange}
            required
            style={{ width: '100%', padding: '12px', boxSizing: 'border-box' }}
          />
        </div>
        <div style={{ marginBottom: '15px' }}>
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={credentials.password}
            onChange={handleChange}
            required
            style={{ width: '100%', padding: '12px', boxSizing: 'border-box' }}
          />
        </div>

        <button 
          type="submit" 
          disabled={loading}
          style={{ 
            width: '100%', 
            padding: '12px', 
            backgroundColor: loading ? '#ccc' : '#28a745', // Green for login
            color: 'white', 
            border: 'none', 
            borderRadius: '4px',
            cursor: loading ? 'not-allowed' : 'pointer',
            fontWeight: 'bold'
          }}
        >
          {loading ? 'Logging in (Waking server)...' : 'Login'}
        </button>
      </form>

      <p style={{ marginTop: '15px' }}>
        Don't have an account? <span onClick={() => navigate('/register')} style={{ color: 'blue', cursor: 'pointer', fontWeight: 'bold' }}>Register here</span>
      </p>
    </div>
  );
};

export default Login;