import { useState, useEffect } from 'react';
import { getTasks, saveTasks } from '../services/api';
import ItemCard from '../components/ItemCard';

const List = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    setTasks(getTasks()); 
  }, []);

  // Function to delete a task
  const deleteTask = (id) => {
    const updated = tasks.filter(t => t.id !== id);
    setTasks(updated);
    saveTasks(updated);
  };

  // NEW: Function to toggle the completion status
  const toggleComplete = (id) => {
    const updated = tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    setTasks(updated);
    saveTasks(updated);
  };

  return (
    <div className="container mt-4">
      <h2>Your Tasks</h2>
      <div className="row">
        {tasks.map(task => (
          <div key={task.id} className="col-md-4">
            {/* Added onToggle prop here so the card can talk to the list */}
            <ItemCard 
              task={task} 
              onDelete={deleteTask} 
              onToggle={toggleComplete} 
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default List;