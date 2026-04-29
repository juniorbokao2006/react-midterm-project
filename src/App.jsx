import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import List from './pages/List';
import AddItem from './pages/AddItem';
import EditItem from './pages/Edititem';
import Login from './pages/login';
import Register from './pages/Register';

function App() {
  // A simple check to see if the user is logged in
  const isAuthenticated = !!localStorage.getItem('token');

  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected Routes: Redirect to login if not authenticated */}
        <Route 
          path="/" 
          element={isAuthenticated ? <Home /> : <Navigate to="/login" />} 
        />
        <Route 
          path="/tasks" 
          element={isAuthenticated ? <List /> : <Navigate to="/login" />} 
        />
        <Route 
          path="/add" 
          element={isAuthenticated ? <AddItem /> : <Navigate to="/login" />} 
        />
        <Route 
          path="/edit/:id" 
          element={isAuthenticated ? <EditItem /> : <Navigate to="/login" />} 
        />
      </Routes>
    </Router>
  );
}

export default App;