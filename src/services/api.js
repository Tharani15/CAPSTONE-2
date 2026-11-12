/**
 * API Service Layer for Task Manager
 *
 * NOTE FOR BACKEND TEAMMATES (Spring Boot):
 * =========================================================================
 * BASE_URL is set to 'http://localhost:8080/api'.
 * Currently, all functions simulate network delays and store data in localStorage.
 * To integrate with your Spring Boot REST APIs, uncomment the fetch/axios calls
 * inside each function and remove the localStorage fallback code.
 * =========================================================================
 */

const BASE_URL = 'http://localhost:8080/api';

// Initial mock tasks matching the project mockup
const INITIAL_MOCK_TASKS = [
  {
    id: 1,
    title: 'Finish login page UI',
    description: 'Form and validation',
    status: 'Pending'
  },
  {
    id: 2,
    title: 'Connect tasks page to API',
    description: 'Replace mock data',
    status: 'Pending'
  },
  {
    id: 3,
    title: 'Set up React project',
    description: 'Vite and router',
    status: 'Completed'
  },
  {
    id: 4,
    title: 'Prepare team presentation',
    description: 'Slides and demo',
    status: 'Pending'
  }
];

// Helper: initialize localStorage mock storage if empty
const initStorage = () => {
  if (!localStorage.getItem('mock_tasks')) {
    localStorage.setItem('mock_tasks', JSON.stringify(INITIAL_MOCK_TASKS));
  }
  if (!localStorage.getItem('mock_users')) {
    const defaultUser = {
      name: 'Priya',
      email: 'priya@virtusa.com',
      password: 'password123'
    };
    localStorage.setItem('mock_users', JSON.stringify([defaultUser]));
  }
};

initStorage();

/**
 * 1. User Signup
 * Expected payload: { name, email, password }
 */
export const signup = async (userData) => {
  // =======================================================================
  // TODO: Replace with real Spring Boot API call:
  // const response = await fetch(`${BASE_URL}/auth/signup`, {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify(userData)
  // });
  // if (!response.ok) throw new Error('Signup failed');
  // return await response.json();
  // =======================================================================

  // Mock implementation using localStorage
  await new Promise((resolve) => setTimeout(resolve, 300)); // simulate network delay

  const users = JSON.parse(localStorage.getItem('mock_users') || '[]');
  const existingUser = users.find((u) => u.email.toLowerCase() === userData.email.toLowerCase());

  if (existingUser) {
    throw new Error('An account with this email already exists.');
  }

  const newUser = {
    name: userData.name.trim(),
    email: userData.email.trim(),
    password: userData.password
  };

  users.push(newUser);
  localStorage.setItem('mock_users', JSON.stringify(users));

  return {
    success: true,
    user: {
      name: newUser.name,
      email: newUser.email
    },
    token: 'mock-jwt-token-' + Date.now()
  };
};

/**
 * 2. User Login
 * Expected payload: { email, password }
 */
export const login = async (credentials) => {
  // =======================================================================
  // TODO: Replace with real Spring Boot API call:
  // const response = await fetch(`${BASE_URL}/auth/login`, {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify(credentials)
  // });
  // if (!response.ok) throw new Error('Invalid email or password');
  // return await response.json();
  // =======================================================================

  // Mock implementation using localStorage
  await new Promise((resolve) => setTimeout(resolve, 300));

  const users = JSON.parse(localStorage.getItem('mock_users') || '[]');
  const matchedUser = users.find(
    (u) =>
      u.email.toLowerCase() === credentials.email.trim().toLowerCase() &&
      u.password === credentials.password
  );

  if (!matchedUser) {
    throw new Error('Invalid email or password.');
  }

  return {
    success: true,
    user: {
      name: matchedUser.name,
      email: matchedUser.email
    },
    token: 'mock-jwt-token-' + Date.now()
  };
};

/**
 * 3. Get all tasks
 */
export const getTasks = async () => {
  // =======================================================================
  // TODO: Replace with real Spring Boot API call:
  // const token = localStorage.getItem('token');
  // const response = await fetch(`${BASE_URL}/tasks`, {
  //   headers: {
  //     'Authorization': `Bearer ${token}`
  //   }
  // });
  // if (!response.ok) throw new Error('Failed to fetch tasks');
  // return await response.json();
  // =======================================================================

  // Mock implementation using localStorage
  await new Promise((resolve) => setTimeout(resolve, 200));
  const tasks = JSON.parse(localStorage.getItem('mock_tasks') || '[]');
  return tasks;
};

/**
 * 4. Create a new task
 * Expected payload: { title, description, status }
 */
export const createTask = async (taskData) => {
  // =======================================================================
  // TODO: Replace with real Spring Boot API call:
  // const token = localStorage.getItem('token');
  // const response = await fetch(`${BASE_URL}/tasks`, {
  //   method: 'POST',
  //   headers: {
  //     'Content-Type': 'application/json',
  //     'Authorization': `Bearer ${token}`
  //   },
  //   body: JSON.stringify(taskData)
  // });
  // if (!response.ok) throw new Error('Failed to create task');
  // return await response.json();
  // =======================================================================

  // Mock implementation using localStorage
  await new Promise((resolve) => setTimeout(resolve, 200));
  const tasks = JSON.parse(localStorage.getItem('mock_tasks') || '[]');

  const newTask = {
    id: Date.now(),
    title: taskData.title.trim(),
    description: taskData.description ? taskData.description.trim() : '',
    status: taskData.status || 'Pending'
  };

  tasks.unshift(newTask);
  localStorage.setItem('mock_tasks', JSON.stringify(tasks));
  return newTask;
};

/**
 * 5. Update an existing task
 * Expected payload: id, { title, description, status }
 */
export const updateTask = async (id, updatedFields) => {
  // =======================================================================
  // TODO: Replace with real Spring Boot API call:
  // const token = localStorage.getItem('token');
  // const response = await fetch(`${BASE_URL}/tasks/${id}`, {
  //   method: 'PUT',
  //   headers: {
  //     'Content-Type': 'application/json',
  //     'Authorization': `Bearer ${token}`
  //   },
  //   body: JSON.stringify(updatedFields)
  // });
  // if (!response.ok) throw new Error('Failed to update task');
  // return await response.json();
  // =======================================================================

  // Mock implementation using localStorage
  await new Promise((resolve) => setTimeout(resolve, 200));
  const tasks = JSON.parse(localStorage.getItem('mock_tasks') || '[]');
  const taskIndex = tasks.findIndex((t) => t.id === Number(id));

  if (taskIndex === -1) {
    throw new Error('Task not found');
  }

  tasks[taskIndex] = {
    ...tasks[taskIndex],
    ...updatedFields,
    title: updatedFields.title ? updatedFields.title.trim() : tasks[taskIndex].title,
    description:
      updatedFields.description !== undefined
        ? updatedFields.description.trim()
        : tasks[taskIndex].description
  };

  localStorage.setItem('mock_tasks', JSON.stringify(tasks));
  return tasks[taskIndex];
};

/**
 * 6. Delete a task by ID
 */
export const deleteTask = async (id) => {
  // =======================================================================
  // TODO: Replace with real Spring Boot API call:
  // const token = localStorage.getItem('token');
  // const response = await fetch(`${BASE_URL}/tasks/${id}`, {
  //   method: 'DELETE',
  //   headers: {
  //     'Authorization': `Bearer ${token}`
  //   }
  // });
  // if (!response.ok) throw new Error('Failed to delete task');
  // return { success: true };
  // =======================================================================

  // Mock implementation using localStorage
  await new Promise((resolve) => setTimeout(resolve, 200));
  const tasks = JSON.parse(localStorage.getItem('mock_tasks') || '[]');
  const filtered = tasks.filter((t) => t.id !== Number(id));
  localStorage.setItem('mock_tasks', JSON.stringify(filtered));
  return { success: true };
};

