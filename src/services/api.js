const API_URL = "https://midterm-backend-iif7.onrender.com/api" 

// Helper to get the Authorization header with your JWT token
const getAuthHeaders = () => ({
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${localStorage.getItem('token')}`
});

// --- AUTHENTICATION API ---

export const loginUser = async (credentials) => {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials)
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.message || 'Login failed');
  return data;
};

export const registerUser = async (userData) => {
  const response = await fetch(`${API_URL}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData)
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.message || 'Registration failed');
  return data;
};

// --- ITEMS/TASKS API ---

// 1. GET ALL TASKS
export const getTasks = async () => {
  const response = await fetch(`${API_URL}/items`, {
    method: 'GET',
    headers: getAuthHeaders()
  });
  if (!response.ok) throw new Error('Failed to fetch tasks');
  return await response.json();
};

// 2. SAVE NEW TASK (Renamed to saveTasks to fix your build error)
export const saveTasks = async (taskData) => {
  const response = await fetch(`${API_URL}/items`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify(taskData)
  });
  if (!response.ok) throw new Error('Failed to save task');
  return await response.json();
};

// 3. GET TASK BY ID
export const getTaskById = async (id) => {
  const response = await fetch(`${API_URL}/items/${id}`, {
    method: 'GET',
    headers: getAuthHeaders()
  });
  if (!response.ok) throw new Error('Task not found');
  return await response.json();
};

// 4. UPDATE TASK
export const updateTask = async (id, updatedData) => {
  const response = await fetch(`${API_URL}/items/${id}`, {
    method: 'PUT',
    headers: getAuthHeaders(),
    body: JSON.stringify(updatedData)
  });
  if (!response.ok) throw new Error('Failed to update task');
  return await response.json();
};

// 5. DELETE TASK
export const deleteTask = async (id) => {
  const response = await fetch(`${API_URL}/items/${id}`, {
    method: 'DELETE',
    headers: getAuthHeaders()
  });
  if (!response.ok) throw new Error('Failed to delete task');
  return await response.json();
};