import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AddItem = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const token = localStorage.getItem('token');

    try {
      // Sending the task to your Aiven MySQL database via Render Backend
      await axios.post(
        'https://midterm-backend-iif7.onrender.com/api/items', 
        { title, description },
        { 
          headers: { 
            Authorization: `Bearer ${token}` 
          } 
        }
      );

      // Successfully added! Navigate back to the dashboard
      navigate('/home');
    } catch (error) {
      console.error("Failed to add task:", error.response?.data || error.message);
      alert("Error adding task. Your session might have expired. Please log in again.");
      if (error.response?.status === 401) navigate('/login');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>New Objective</h2>
        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Task Title</label>
            <input 
              type="text" 
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="What needs to be done?"
              style={styles.input}
              required
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Description</label>
            <textarea 
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Add details about this objective..."
              style={styles.textarea}
              required
            />
          </div>

          <div style={styles.buttonGroup}>
            <button 
              type="button" 
              onClick={() => navigate('/home')} 
              style={styles.cancelBtn}
            >
              Cancel
            </button>
            <button 
              type="submit" 
              disabled={loading}
              style={styles.submitBtn}
            >
              {loading ? 'Initializing...' : 'Add Objective'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const styles = {
  container: { 
    backgroundColor: '#000', 
    minHeight: '100vh', 
    display: 'flex', 
    justifyContent: 'center', 
    alignItems: 'center', 
    padding: '20px' 
  },
  card: { 
    backgroundColor: '#0a0a0a', 
    border: '1px solid #222', 
    padding: '40px', 
    borderRadius: '12px', 
    width: '100%', 
    maxWidth: '500px' 
  },
  title: { 
    color: '#fff', 
    marginBottom: '30px', 
    letterSpacing: '2px', 
    textAlign: 'center', 
    textTransform: 'uppercase',
    fontSize: '1.2rem'
  },
  form: { display: 'flex', flexDirection: 'column', gap: '20px' },
  inputGroup: { display: 'flex', flexDirection: 'column', gap: '8px' },
  label: { color: '#666', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '1px' },
  input: { 
    backgroundColor: '#111', 
    border: '1px solid #333', 
    color: '#fff', 
    padding: '12px', 
    borderRadius: '4px', 
    outline: 'none',
    fontSize: '16px'
  },
  textarea: { 
    backgroundColor: '#111', 
    border: '1px solid #333', 
    color: '#fff', 
    padding: '12px', 
    borderRadius: '4px', 
    outline: 'none', 
    minHeight: '120px', 
    resize: 'vertical',
    fontSize: '16px'
  },
  buttonGroup: { display: 'flex', gap: '15px', marginTop: '10px' },
  cancelBtn: { 
    flex: 1, 
    backgroundColor: 'transparent', 
    border: '1px solid #444', 
    color: '#888', 
    padding: '14px', 
    borderRadius: '4px', 
    cursor: 'pointer',
    transition: '0.3s'
  },
  submitBtn: { 
    flex: 1, 
    backgroundColor: '#fff', 
    border: 'none', 
    color: '#000', 
    padding: '14px', 
    borderRadius: '4px', 
    cursor: 'pointer', 
    fontWeight: 'bold',
    transition: '0.3s'
  }
};

export default AddItem;