import { Link } from 'react-router-dom';

// This is a reusable component that receives a 'task' object as a prop
const ItemCard = ({ task, onDelete, onToggle }) => {
  return (
    <div className="card mb-3 shadow-sm">
      <div className="card-body">
        {/* Requirement: Mark tasks as complete [cite: 29] */}
        <h5 className={task.completed ? "text-decoration-line-through text-muted" : ""}>
          {task.title}
        </h5>
        <p className="card-text text-truncate">{task.description}</p>
        
        {/* New Edit Button */}
<Link to={`/edit/${task.id}`} className="btn btn-sm btn-warning text-dark">
  Edit
</Link>
        
        <div className="d-flex gap-2 mt-3">
          {/* Requirement: Navigation to Details [cite: 65, 92] */}
          <Link to={`/details/${task.id}`} className="btn btn-sm btn-info text-white">
            View Details
          </Link>
          
          <button 
            onClick={() => onToggle(task.id)} 
            className={`btn btn-sm ${task.completed ? 'btn-secondary' : 'btn-success'}`}
          >
            {task.completed ? 'Undo' : 'Complete'}
          </button>
          
          {/* Requirement: Delete tasks [cite: 28] */}
          <button onClick={() => onDelete(task.id)} className="btn btn-sm btn-danger">
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default ItemCard;