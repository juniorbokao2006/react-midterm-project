import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Home = () => {
  const [tasks, setTasks] = useState([]);
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const API_URL = 'https://midterm-backend-iif7.onrender.com/api/items';

  // Fetch tasks
  const fetchTasks = async () => {
    try {
      const res = await axios.get(API_URL, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setTasks(res.data);
    } catch (err) {
      console.error("Fetch error:", err);
      if (err.response?.status === 401) navigate('/login');
    }
  };

  useEffect(() => {
    if (token) fetchTasks();
    else navigate('/login');
  }, [token]);

  // --- THE MISSING DELETE LOGIC ---
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this objective?")) {
      try {
        await axios.delete(`${API_URL}/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        // Remove from local state so it disappears instantly
        setTasks(tasks.filter(task => task.id !== id));
      } catch (err) {
        console.error("Delete error:", err);
        alert("Failed to delete task.");
      }
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div style={styles.container}>
      <nav style={styles.navbar}>
        <h2 style={styles.logo} onClick={() => navigate('/')}>COMMAND YOUR DAY</h2>
        <div style={styles.navLinks}>
          <button onClick={() => navigate('/add')} style={styles.navBtn}>+ Add Task</button>
          <button onClick={handleLogout} style={styles.logoutBtn}>Logout</button>
        </div>
      </nav>

      <div style={styles.hero}>
        <h1>Dashboard</h1>
        <p>A sophisticated workspace to organize objectives.</p>
      </div>

      <div style={styles.taskSection}>
        {tasks.length > 0 ? (
          <div style={styles.taskGrid}>
            {tasks.map(task => (
              <div key={task.id} style={styles.taskCard}>
                <div>
                  <h4>{task.title}</h4>
                  <p style={styles.taskDesc}>{task.description}</p>
                </div>
                <div style={styles.cardActions}>
                  <button 
                    onClick={() => navigate(`/edit/${task.id}`)} 
                    style={styles.editBtn}
                  >
                    Edit
                  </button>
                  {/* DELETE BUTTON */}
                  <button 
                    onClick={() => handleDelete(task.id)} 
                    style={styles.deleteBtn}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div style={styles.emptyState}>
            <p>No active objectives.</p>
            <button onClick={() => navigate('/add')} style={styles.primaryBtn}>Create Task</button>
          </div>
        )}
      </div>
    </div>
  );
};

const styles = {
  container: { backgroundColor: '#000', color: '#fff', minHeight: '100vh', fontFamily: 'sans-serif' },
  navbar: { display: 'flex', justifyContent: 'space-between', padding: '20px 50px', borderBottom: '1px solid #222', alignItems: 'center' },
  logo: { fontSize: '1.1rem', letterSpacing: '3px', cursor: 'pointer' },
  navLinks: { display: 'flex', gap: '20px' },
  navBtn: { color: '#fff', background: 'none', border: '1px solid #fff', padding: '8px 18px', borderRadius: '4px', cursor: 'pointer' },
  logoutBtn: { background: 'none', border: 'none', color: '#ff4d4d', cursor: 'pointer' },
  hero: { textAlign: 'center', padding: '60px 20px' },
  taskSection: { maxWidth: '1200px', margin: '0 auto', padding: '20px' },
  taskGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' },
  taskCard: { backgroundColor: '#0a0a0a', padding: '20px', borderRadius: '8px', border: '1px solid #1a1a1a', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: '150px' },
  taskDesc: { color: '#888', fontSize: '0.9rem', margin: '10px 0' },
  cardActions: { marginTop: '15px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #1a1a1a', paddingTop: '10px' },
  editBtn: { background: 'none', border: 'none', color: '#4facfe', cursor: 'pointer', fontSize: '0.85rem' },
  deleteBtn: { background: 'none', border: 'none', color: '#ff4d4d', cursor: 'pointer', fontSize: '0.85rem' },
  emptyState: { textAlign: 'center', padding: '80px', border: '1px dashed #222', borderRadius: '12px' },
  primaryBtn: { marginTop: '20px', backgroundColor: '#fff', color: '#000', border: 'none', padding: '12px 30px', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }
};

export default Home;