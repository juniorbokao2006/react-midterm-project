import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import List from './pages/List';
import AddItem from './pages/AddItem';
import EditItem from './pages/EditItem';
import Login from './pages/login';
import Register from './pages/Register';

// A small helper component to protect routes properly
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  return token ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected Routes */}
        {/* We map BOTH "/" and "/home" to the Home component */}
        <Route 
          path="/" 
          element={<ProtectedRoute><Home /></ProtectedRoute>} 
        />
        <Route 
          path="/home" 
          element={<ProtectedRoute><Home /></ProtectedRoute>} 
        />
        
        <Route 
          path="/tasks" 
          element={<ProtectedRoute><List /></ProtectedRoute>} 
        />
        <Route 
          path="/add" 
          element={<ProtectedRoute><AddItem /></ProtectedRoute>} 
        />
        <Route 
          path="/edit/:id" 
          element={<ProtectedRoute><EditItem /></ProtectedRoute>} 
        />

        {/* Catch-all: If user goes to a random URL, send them home */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;