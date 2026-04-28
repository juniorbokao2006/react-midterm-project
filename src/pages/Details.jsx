import { useParams, Link } from 'react-router-dom';
import { getTaskById } from '../services/api';

const Details = () => {
  const { id } = useParams(); // Gets the ID from the URL
  const task = getTaskById(id);

  if (!task) {
    return (
      <div className="alert alert-danger mt-5">
        Task not found. <Link to="/list">Go back to list</Link>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <div className="card shadow">
        <div className="card-header bg-primary text-white">
          <h2 className="mb-0">Task Details</h2>
        </div>
        <div className="card-body">
          <h3 className="card-title">{task.title}</h3>
          <p className="badge bg-secondary mb-3">
            Status: {task.completed ? 'Completed' : 'Pending'}
          </p>
          <hr />
          <h5>Description:</h5>
          <p className="card-text lead">{task.description}</p>
          <hr />
          <Link to="/list" className="btn btn-outline-primary">Back to List</Link>
        </div>
      </div>
    </div>
  );
};

export default Details;