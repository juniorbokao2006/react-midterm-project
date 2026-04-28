import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getTasks, saveTasks } from '../services/api';

const AddItem = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validation: Ensures the user doesn't submit empty tasks
    if (!title || !description) {
      alert("Please enter both a title and a description!");
      return;
    }

    const newTask = {
      id: Date.now(), // Unique ID based on time
      title,
      description,
      completed: false
    };

    const currentTasks = getTasks();
    saveTasks([...currentTasks, newTask]);
    
    // After saving, this line sends you back to the List page
    navigate('/list');
  };

  return (
    <div className="container mt-4">
      <div className="card shadow-sm p-4">
        <h2>Add New Task</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Task Title</label>
            <input 
              type="text" 
              className="form-control" 
              placeholder="What needs to be done?"
              value={title} 
              onChange={(e) => setTitle(e.target.value)} 
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Description</label>
            <textarea 
              className="form-control" 
              rows="3"
              placeholder="Add some details..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>
          <button type="submit" className="btn btn-danger">Add Task</button>
        </form>
      </div>
    </div>
  );
};

export default AddItem;