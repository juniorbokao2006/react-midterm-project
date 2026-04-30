import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Home = () => {
  const [tasks, setTasks] = useState([]);
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  // Fetching data from your Aiven MySQL via Render Backend
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await axios.get('https://midterm-backend-iif7.onrender.com/api/items', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setTasks(res.data);
      } catch (err) {
        console.error("Error fetching tasks:", err);
        // If token is expired or invalid, send back to login
        if (err.response?.status === 401) navigate('/login');
      }
    };
    if (token) {
      fetchTasks();
    } else {
      navigate('/login');
    }
  }, [token, navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div style={styles.container}>
      {/* 1. TOP NAVBAR BUTTONS */}
      <nav style={styles.navbar}>
        <h2 style={styles.logo} onClick={() => navigate('/')}>COMMAND YOUR DAY</h2>
        <div style={styles.navLinks}>
          <button onClick={() => navigate('/tasks')} style={styles.textBtn}>My Tasks</button>
          <button onClick={() => navigate('/add')} style={styles.navBtn}>+ Add Task</button>
          <button onClick={handleLogout} style={styles.logoutBtn}>Logout</button>
        </div>
      </nav>

      {/* 2. HERO SECTION */}
      <div style={styles.hero}>
        <h1>Dashboard</h1>
        <p>A sophisticated workspace to organize objectives and master your time.</p>
      </div>

      {/* 3. TASK GRID & ACTION BUTTONS */}
      <div style={styles.taskSection}>
        <div style={styles.sectionHeader}>
          <h3>Active Objectives</h3>
          <button onClick={() => navigate('/add')} style={styles.secondaryBtn}>New Entry</button>
        </div>

        {tasks.length > 0 ? (
          <div style={styles.taskGrid}>
            {tasks.map(task => (
              <div key={task.id} style={styles.taskCard}>
                <h4>{task.title}</h4>
                <p style={styles.taskDesc}>{task.description}</p>
                <div style={styles.cardActions}>
                  {/* EDIT BUTTON */}
                  <button 
                    onClick={() => navigate(`/edit/${task.id}`)} 
                    style={styles.actionLink}
                  >
                    Edit Task
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div style={styles.emptyState}>
            <p>Your workspace is currently clear.</p>
            <button onClick={() => navigate('/add')} style={styles.primaryBtn}>Create Your First Task</button>
          </div>
        )}
      </div>
    </div>
  );
};

const styles = {
  container: { backgroundColor: '#000', color: '#fff', minHeight: '100vh', fontFamily: 'Inter, sans-serif' },
  navbar: { display: 'flex', justifyContent: 'space-between', padding: '20px 50px', borderBottom: '1px solid #222', alignItems: 'center' },
  logo: { fontSize: '1.1rem', letterSpacing: '3px', cursor: 'pointer', fontWeight: 'bold' },
  navLinks: { display: 'flex', gap: '25px', alignItems: 'center' },
  textBtn: { background: 'none', border: 'none', color: '#888', cursor: 'pointer', fontSize: '14px' },
  navBtn: { color: '#fff', background: 'none', border: '1px solid #fff', padding: '8px 18px', borderRadius: '4px', cursor: 'pointer' },
  logoutBtn: { background: 'none', border: 'none', color: '#ff4d4d', cursor: 'pointer', fontSize: '14px' },
  hero: { textAlign: 'center', padding: '90px 20px' },
  taskSection: { maxWidth: '1200px', margin: '0 auto', padding: '20px' },
  sectionHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' },
  secondaryBtn: { background: 'none', border: '1px solid #333', color: '#666', padding: '6px 12px', borderRadius: '4px', cursor: 'pointer' },
  taskGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' },
  taskCard: { backgroundColor: '#0a0a0a', padding: '20px', borderRadius: '8px', border: '1px solid #1a1a1a', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' },
  taskDesc: { color: '#888', fontSize: '0.9rem', margin: '10px 0' },
  cardActions: { marginTop: '15px', borderTop: '1px solid #1a1a1a', paddingTop: '10px' },
  actionLink: { background: 'none', border: 'none', color: '#4facfe', cursor: 'pointer', fontSize: '0.85rem', padding: '0' },
  emptyState: { textAlign: 'center', padding: '80px', border: '1px dashed #222', borderRadius: '12px' },
  primaryBtn: { marginTop: '20px', backgroundColor: '#fff', color: '#000', border: 'none', padding: '12px 30px', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }
};

export default Home;