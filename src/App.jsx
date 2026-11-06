import React, { useState, useEffect, useCallback } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import DashboardPage from './pages/DashboardPage';
import AllTasksPage from './pages/AllTasksPage';
import PendingTasksPage from './pages/PendingTasksPage';
import CompletedTasksPage from './pages/CompletedTasksPage';
import SettingsPage from './pages/SettingsPage';
import TaskModal from './components/TaskModal';
import DeleteConfirmModal from './components/DeleteConfirmModal';
import { taskApi } from './api/taskApi';
import { CheckCircle2, AlertCircle } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [tasks, setTasks] = useState([]);
  const [stats, setStats] = useState(null);
  const [userProfile, setUserProfile] = useState({
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
  });

  // Filter & Search state
  const [filters, setFilters] = useState({
    search: '',
    priority: 'ALL',
    status: 'ALL',
    sortBy: 'dueDate',
    sortDir: 'asc',
  });
  const [globalSearch, setGlobalSearch] = useState('');

  // Modals state
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deletingTask, setDeletingTask] = useState(null);

  // Notification Toast state
  const [toast, setToast] = useState(null);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3500);
  };

  // Load Data
  const loadData = useCallback(async () => {
    try {
      // 1. Fetch tasks
      const fetchedTasks = await taskApi.getTasks(filters);
      if (Array.isArray(fetchedTasks)) {
        setTasks(fetchedTasks);
      }

      // 2. Fetch stats
      const fetchedStats = await taskApi.getDashboardStats();
      if (fetchedStats) {
        setStats(fetchedStats);
      }

      // 3. Fetch user profile
      const fetchedProfile = await taskApi.getUserProfile();
      if (fetchedProfile) {
        setUserProfile(fetchedProfile);
      }
    } catch (err) {
      console.warn('Error loading tasks:', err);
    }
  }, [filters]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  // Synchronize global search with filter search
  const handleGlobalSearchSubmit = (searchTerm) => {
    setFilters((prev) => ({ ...prev, search: searchTerm }));
    setActiveTab('all-tasks');
  };

  // Create or Update Task
  const handleSaveTask = async (taskData) => {
    try {
      if (editingTask) {
        await taskApi.updateTask(editingTask.id, taskData);
        showToast('Task updated successfully!');
      } else {
        await taskApi.createTask(taskData);
        showToast('New task added successfully!');
      }
      setIsTaskModalOpen(false);
      setEditingTask(null);
      loadData();
    } catch (err) {
      console.error('Error saving task:', err);
      showToast('Error saving task', 'error');
    }
  };

  // Delete Task
  const handleDeleteTask = async () => {
    if (!deletingTask) return;
    try {
      await taskApi.deleteTask(deletingTask.id);
      showToast('Task deleted successfully');
      setIsDeleteModalOpen(false);
      setDeletingTask(null);
      loadData();
    } catch (err) {
      console.error('Error deleting task:', err);
      showToast('Error deleting task', 'error');
    }
  };

  // Toggle Task Status (Pending <-> Completed)
  const handleToggleStatus = async (taskId) => {
    try {
      await taskApi.toggleTaskStatus(taskId);
      loadData();
    } catch (err) {
      console.error('Error toggling status:', err);
    }
  };

  // Save Settings & Preferences
  const handleSaveProfile = async (updatedData) => {
    try {
      const saved = await taskApi.updateUserProfile(updatedData);
      setUserProfile(saved);
      showToast('Settings saved successfully!');
    } catch (err) {
      console.error('Error updating settings:', err);
      showToast('Error saving settings', 'error');
    }
  };

  // Count pending tasks for notification badge
  const pendingCount = tasks.filter((t) => t.status === 'PENDING').length;

  return (
    <div className="app-container">
      {/* 1. Deep Indigo Sidebar */}
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        userProfile={userProfile}
      />

      {/* 2. Main Layout Area */}
      <div className="main-wrapper">
        <Header
          globalSearch={globalSearch}
          setGlobalSearch={setGlobalSearch}
          onSearchSubmit={handleGlobalSearchSubmit}
          userProfile={userProfile}
          onProfileClick={() => setActiveTab('settings')}
          pendingCount={pendingCount}
        />

        {/* View Routing */}
        <main>
          {activeTab === 'dashboard' && (
            <DashboardPage
              stats={stats}
              onNavigateTab={setActiveTab}
              onToggleTask={handleToggleStatus}
              userProfile={userProfile}
            />
          )}

          {activeTab === 'all-tasks' && (
            <AllTasksPage
              tasks={tasks}
              onOpenCreateModal={() => {
                setEditingTask(null);
                setIsTaskModalOpen(true);
              }}
              onOpenEditModal={(task) => {
                setEditingTask(task);
                setIsTaskModalOpen(true);
              }}
              onOpenDeleteModal={(task) => {
                setDeletingTask(task);
                setIsDeleteModalOpen(true);
              }}
              onToggleStatus={handleToggleStatus}
              filters={filters}
              setFilters={setFilters}
              onRefresh={loadData}
            />
          )}

          {activeTab === 'pending-tasks' && (
            <PendingTasksPage
              tasks={tasks}
              onNavigateTab={setActiveTab}
              onOpenCreateModal={() => {
                setEditingTask(null);
                setIsTaskModalOpen(true);
              }}
              onOpenEditModal={(task) => {
                setEditingTask(task);
                setIsTaskModalOpen(true);
              }}
              onOpenDeleteModal={(task) => {
                setDeletingTask(task);
                setIsDeleteModalOpen(true);
              }}
              onToggleStatus={handleToggleStatus}
            />
          )}

          {activeTab === 'completed-tasks' && (
            <CompletedTasksPage
              tasks={tasks}
              onNavigateTab={setActiveTab}
              onToggleStatus={handleToggleStatus}
            />
          )}

          {activeTab === 'settings' && (
            <SettingsPage
              userProfile={userProfile}
              onSaveProfile={handleSaveProfile}
              onShowToast={showToast}
            />
          )}
        </main>
      </div>

      {/* 3. Modals */}
      <TaskModal
        isOpen={isTaskModalOpen}
        onClose={() => {
          setIsTaskModalOpen(false);
          setEditingTask(null);
        }}
        onSave={handleSaveTask}
        task={editingTask}
      />

      <DeleteConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setDeletingTask(null);
        }}
        onConfirm={handleDeleteTask}
        taskTitle={deletingTask?.title || ''}
      />

      {/* 4. Toast Notification */}
      {toast && (
        <div className="toast-banner">
          {toast.type === 'success' ? (
            <CheckCircle2 size={18} color="#22c55e" />
          ) : (
            <AlertCircle size={18} color="#ef4444" />
          )}
          <span>{toast.message}</span>
        </div>
      )}
    </div>
  );
}

