import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const EditItem = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const token = localStorage.getItem('token');
  const API_URL = `https://midterm-backend-iif7.onrender.com/api/items/${id}`;

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const res = await axios.get(API_URL, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setTitle(res.data.title);
        setDescription(res.data.description);
      } catch (err) {
        console.error("Error loading task:", err);
      }
    };
    fetchTask();
  }, [id, token]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(API_URL, { title, description }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      navigate('/home');
    } catch (err) {
      alert("Failed to update task.");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Refine Objective</h2>
        <form onSubmit={handleUpdate} style={styles.form}>
          <input 
            style={styles.input}
            value={title} 
            onChange={(e) => setTitle(e.target.value)} 
            placeholder="Task Title"
            required 
          />
          <textarea 
            style={styles.textarea}
            value={description} 
            onChange={(e) => setDescription(e.target.value)} 
            placeholder="Description"
            required 
          />
          <div style={styles.btnGroup}>
            <button type="button" onClick={() => navigate('/home')} style={styles.cancelBtn}>Cancel</button>
            <button type="submit" style={styles.saveBtn}>Save Changes</button>
          </div>
        </form>
      </div>
    </div>
  );
};

const styles = {
  container: { backgroundColor: '#000', minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' },
  card: { backgroundColor: '#0a0a0a', border: '1px solid #222', padding: '40px', borderRadius: '12px', width: '400px' },
  title: { color: '#fff', textAlign: 'center', marginBottom: '20px', letterSpacing: '1px' },
  form: { display: 'flex', flexDirection: 'column', gap: '15px' },
  input: { backgroundColor: '#111', border: '1px solid #333', color: '#fff', padding: '12px', borderRadius: '4px' },
  textarea: { backgroundColor: '#111', border: '1px solid #333', color: '#fff', padding: '12px', borderRadius: '4px', minHeight: '80px' },
  btnGroup: { display: 'flex', gap: '10px' },
  cancelBtn: { flex: 1, padding: '10px', background: 'none', border: '1px solid #444', color: '#888', cursor: 'pointer' },
  saveBtn: { flex: 1, padding: '10px', backgroundColor: '#fff', color: '#000', border: 'none', fontWeight: 'bold', cursor: 'pointer' }
};

export default EditItem;