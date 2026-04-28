import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link className="navbar-brand" to="/home">Task Manager</Link>
        <div className="navbar-nav">
          <Link className="nav-link" to="/home">Home</Link>
          <Link className="nav-link" to="/list">Tasks</Link>
          <Link className="nav-link" to="/add">Add Task</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;