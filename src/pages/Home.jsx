import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Home = () => {
  const [tasks, setTasks] = useState([]);
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  // 1. Fetch real tasks from your backend
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await axios.get('https://midterm-backend-iif7.onrender.com/api/items', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setTasks(res.data);
      } catch (err) {
        console.error("Error fetching tasks:", err);
      }
    };
    fetchTasks();
  }, [token]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div style={styles.container}>
      {/* Navigation Bar */}
      <nav style={styles.navbar}>
        <h2 style={styles.logo}>COMMAND YOUR DAY</h2>
        <div style={styles.navLinks}>
          <Link to="/add" style={styles.navBtn}>+ Add Task</Link>
          <button onClick={handleLogout} style={styles.logoutBtn}>Logout</button>
        </div>
      </nav>

      {/* Hero Section */}
      <div style={styles.hero}>
        <h1>Welcome Back</h1>
        <p>A sophisticated workspace to organize objectives and master your time.</p>
      </div>

      {/* Task List Section */}
      <div style={styles.taskSection}>
        <h3>Your Current Objectives</h3>
        {tasks.length > 0 ? (
          <div style={styles.taskGrid}>
            {tasks.map(task => (
              <div key={task.id} style={styles.taskCard}>
                <h4>{task.title}</h4>
                <p>{task.description}</p>
                <Link to={`/edit/${task.id}`} style={styles.editLink}>Edit</Link>
              </div>
            ))}
          </div>
        ) : (
          <div style={styles.emptyState}>
            <p>No objectives found. Start by adding your first task!</p>
            <Link to="/add" style={styles.primaryBtn}>Create Task</Link>
          </div>
        )}
      </div>
    </div>
  );
};

const styles = {
  container: { backgroundColor: '#000', color: '#fff', minHeight: '100vh', fontFamily: 'sans-serif' },
  navbar: { display: 'flex', justifyContent: 'space-between', padding: '20px 50px', borderBottom: '1px solid #222' },
  logo: { fontSize: '1.2rem', letterSpacing: '2px' },
  navLinks: { display: 'flex', gap: '20px', alignItems: 'center' },
  navBtn: { color: '#fff', textDecoration: 'none', border: '1px solid #fff', padding: '8px 15px', borderRadius: '4px' },
  logoutBtn: { background: 'none', border: 'none', color: '#ff4d4d', cursor: 'pointer' },
  hero: { textAlign: 'center', padding: '100px 20px' },
  taskSection: { maxWidth: '1000px', margin: '0 auto', padding: '20px' },
  taskGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '20px' },
  taskCard: { backgroundColor: '#111', padding: '20px', borderRadius: '8px', border: '1px solid #333' },
  editLink: { color: '#4facfe', textDecoration: 'none', fontSize: '0.9rem' },
  emptyState: { textAlign: 'center', padding: '40px', border: '1px dashed #444', borderRadius: '8px' },
  primaryBtn: { display: 'inline-block', marginTop: '10px', backgroundColor: '#fff', color: '#000', padding: '10px 20px', textDecoration: 'none', borderRadius: '4px', fontWeight: 'bold' }
};

export default Home;