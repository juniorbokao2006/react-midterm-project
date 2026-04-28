import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getTaskById, updateTask } from '../services/api';

const EditItem = () => {
  const { id } = useParams(); // Get the ID from the URL
  const navigate = useNavigate();
  
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  // When the page loads, fetch the existing task and fill the input boxes
  useEffect(() => {
    const task = getTaskById(id);
    if (task) {
      setTitle(task.title);
      setDescription(task.description);
    } else {
      navigate('/list'); // If task doesn't exist, send them away
    }
  }, [id, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !description) {
      alert("Please enter both a title and a description!");
      return;
    }

    // Send the updated info to our API
    updateTask(id, { title, description });
    
    // Go back to the tasks list
    navigate('/list');
  };

  return (
    <div className="container mt-4">
      <div className="card shadow-sm p-4">
        <h2>Edit Task</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Task Title</label>
            <input 
              type="text" 
              className="form-control" 
              value={title} 
              onChange={(e) => setTitle(e.target.value)} 
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Description</label>
            <textarea 
              className="form-control" 
              rows="3"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>
          <button type="submit" className="btn btn-warning w-100 fw-bold">Update Task</button>
        </form>
      </div>
    </div>
  );
};

export default EditItem;