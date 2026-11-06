// API Base URL - proxied through Vite to http://localhost:8080 or direct fallback
const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';

const DEFAULT_MOCK_TASKS = [
  { id: 1, title: 'Complete React assignment', description: 'Finish the React project', dueDate: new Date().toISOString().split('T')[0], priority: 'HIGH', status: 'PENDING' },
  { id: 2, title: 'Learn Spring Boot', description: 'Go through Spring Boot docs', dueDate: new Date(Date.now() + 86400000).toISOString().split('T')[0], priority: 'MEDIUM', status: 'PENDING' },
  { id: 3, title: 'Prepare presentation', description: 'Prepare project PPT', dueDate: new Date(Date.now() + 86400000 * 4).toISOString().split('T')[0], priority: 'LOW', status: 'COMPLETED' },
  { id: 4, title: 'Complete database integration', description: 'Integrate MySQL database', dueDate: new Date(Date.now() + 86400000 * 6).toISOString().split('T')[0], priority: 'MEDIUM', status: 'PENDING' },
  { id: 5, title: 'Review project documentation', description: 'Review final report', dueDate: new Date(Date.now() + 86400000 * 8).toISOString().split('T')[0], priority: 'LOW', status: 'PENDING' },
];

const DEFAULT_PROFILE = {
  name: 'Priya Sharma',
  email: 'priya@example.com',
  role: 'Task Manager',
  avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=256&auto=format&fit=crop',
  theme: 'Light',
  defaultPriorityFilter: 'All Priorities',
  itemsPerPage: 10,
  dateFormat: 'DD/MM/YYYY',
  taskReminders: true,
  overdueAlerts: true,
  dailySummary: false,
};

// Local storage helpers for standalone mode
function getLocalTasks() {
  try {
    const saved = localStorage.getItem('virtusa_taskflow_tasks');
    return saved ? JSON.parse(saved) : DEFAULT_MOCK_TASKS;
  } catch (e) {
    return DEFAULT_MOCK_TASKS;
  }
}

function saveLocalTasks(tasks) {
  try {
    localStorage.setItem('virtusa_taskflow_tasks', JSON.stringify(tasks));
  } catch (e) {
    console.error('Failed to save to localStorage', e);
  }
}

function getLocalProfile() {
  try {
    const saved = localStorage.getItem('virtusa_taskflow_profile');
    return saved ? JSON.parse(saved) : DEFAULT_PROFILE;
  } catch (e) {
    return DEFAULT_PROFILE;
  }
}

function saveLocalProfile(profile) {
  try {
    localStorage.setItem('virtusa_taskflow_profile', JSON.stringify(profile));
  } catch (e) {
    console.error('Failed to save to localStorage', e);
  }
}

async function request(endpoint, options = {}) {
  const url = `${API_BASE_URL}${endpoint}`;
  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  };

  const response = await fetch(url, config);
  if (!response.ok) {
    const errorBody = await response.text();
    let errorJson;
    try {
      errorJson = JSON.parse(errorBody);
    } catch (e) {
      errorJson = { message: errorBody || `HTTP error ${response.status}` };
    }
    throw new Error(errorJson.message || `Request failed with status ${response.status}`);
  }
  
  if (response.status === 204) return {};
  return await response.json();
}

export const taskApi = {
  // Tasks CRUD with automatic LocalStorage fallback for standalone operation
  getTasks: async ({ status, priority, search, sortBy = 'dueDate', sortDir = 'asc' } = {}) => {
    try {
      const params = new URLSearchParams();
      if (status && status !== 'ALL') params.append('status', status);
      if (priority && priority !== 'ALL') params.append('priority', priority);
      if (search && search.trim() !== '') params.append('search', search.trim());
      if (sortBy) params.append('sortBy', sortBy);
      if (sortDir) params.append('sortDir', sortDir);

      const queryStr = params.toString() ? `?${params.toString()}` : '';
      const data = await request(`/tasks${queryStr}`);
      saveLocalTasks(data);
      return data;
    } catch (err) {
      let filtered = [...getLocalTasks()];
      if (status && status !== 'ALL') {
        filtered = filtered.filter((t) => t.status === status);
      }
      if (priority && priority !== 'ALL') {
        filtered = filtered.filter((t) => t.priority === priority);
      }
      if (search && search.trim() !== '') {
        const query = search.toLowerCase();
        filtered = filtered.filter(
          (t) =>
            t.title.toLowerCase().includes(query) ||
            (t.description && t.description.toLowerCase().includes(query))
        );
      }
      return filtered;
    }
  },

  getTaskById: async (id) => {
    try {
      return await request(`/tasks/${id}`);
    } catch (err) {
      const tasks = getLocalTasks();
      return tasks.find((t) => t.id === Number(id)) || null;
    }
  },

  createTask: async (taskData) => {
    try {
      const result = await request('/tasks', {
        method: 'POST',
        body: JSON.stringify(taskData),
      });
      return result;
    } catch (err) {
      const tasks = getLocalTasks();
      const newTask = {
        id: Date.now(),
        ...taskData,
        createdAt: new Date().toISOString(),
      };
      const updated = [newTask, ...tasks];
      saveLocalTasks(updated);
      return newTask;
    }
  },

  updateTask: async (id, taskData) => {
    try {
      const result = await request(`/tasks/${id}`, {
        method: 'PUT',
        body: JSON.stringify(taskData),
      });
      return result;
    } catch (err) {
      const tasks = getLocalTasks();
      const updated = tasks.map((t) => (t.id === Number(id) ? { ...t, ...taskData } : t));
      saveLocalTasks(updated);
      return { id, ...taskData };
    }
  },

  deleteTask: async (id) => {
    try {
      return await request(`/tasks/${id}`, {
        method: 'DELETE',
      });
    } catch (err) {
      const tasks = getLocalTasks();
      const updated = tasks.filter((t) => t.id !== Number(id));
      saveLocalTasks(updated);
      return { success: true };
    }
  },

  toggleTaskStatus: async (id) => {
    try {
      return await request(`/tasks/${id}/toggle`, {
        method: 'PATCH',
      });
    } catch (err) {
      const tasks = getLocalTasks();
      const updated = tasks.map((t) =>
        t.id === Number(id)
          ? { ...t, status: t.status === 'COMPLETED' ? 'PENDING' : 'COMPLETED' }
          : t
      );
      saveLocalTasks(updated);
      return updated.find((t) => t.id === Number(id));
    }
  },

  getPendingTasks: async () => {
    try {
      return await request('/tasks/pending');
    } catch (err) {
      return getLocalTasks().filter((t) => t.status === 'PENDING');
    }
  },

  getCompletedTasks: async () => {
    try {
      return await request('/tasks/completed');
    } catch (err) {
      return getLocalTasks().filter((t) => t.status === 'COMPLETED');
    }
  },

  // Dashboard Stats
  getDashboardStats: async () => {
    try {
      return await request('/dashboard/stats');
    } catch (err) {
      const currentTasks = getLocalTasks();
      const todayStr = new Date().toISOString().split('T')[0];
      const totalTasks = currentTasks.length;
      const completedTasks = currentTasks.filter((t) => t.status === 'COMPLETED').length;
      const pendingTasks = currentTasks.filter((t) => t.status === 'PENDING').length;
      const overdueTasks = currentTasks.filter((t) => t.status === 'PENDING' && t.dueDate < todayStr).length;
      const completionPercentage = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;
      const todayTasks = currentTasks.filter((t) => t.dueDate === todayStr);

      return {
        totalTasks,
        completedTasks,
        pendingTasks,
        overdueTasks,
        completionPercentage,
        todayTasksCount: todayTasks.length,
        recentTasks: currentTasks.slice(0, 5),
        todayTasks,
      };
    }
  },

  // User Profile & Settings
  getUserProfile: async () => {
    try {
      return await request('/user/profile');
    } catch (err) {
      return getLocalProfile();
    }
  },

  updateUserProfile: async (profileData) => {
    try {
      const saved = await request('/user/profile', {
        method: 'PUT',
        body: JSON.stringify(profileData),
      });
      saveLocalProfile(saved);
      return saved;
    } catch (err) {
      saveLocalProfile(profileData);
      return profileData;
    }
  },
};

