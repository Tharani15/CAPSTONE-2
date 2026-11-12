import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import TaskItem from '../components/TaskItem';
import TaskForm from '../components/TaskForm';
import ConfirmModal from '../components/ConfirmModal';
import { getTasks, createTask, updateTask, deleteTask } from '../services/api';
import './Tasks.css';

/**
 * Tasks Page Component
 * Full list of tasks displayed as a clean table with Create, Edit, and Delete actions.
 * Demonstrates component communication via props with TaskItem, TaskForm, and ConfirmModal.
 */
export default function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Modal states for Create / Edit
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  // Modal state for Delete confirmation
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deletingTask, setDeletingTask] = useState(null);

  // Fetch all tasks on component mount
  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      setError('');
      const data = await getTasks();
      setTasks(data);
    } catch (err) {
      setError('Failed to fetch tasks. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Open modal to create a new task
  const handleOpenCreateModal = () => {
    setEditingTask(null);
    setIsFormOpen(true);
  };

  // Open modal to edit an existing task
  const handleOpenEditModal = (task) => {
    setEditingTask(task);
    setIsFormOpen(true);
  };

  // Close create/edit modal
  const handleCloseFormModal = () => {
    setIsFormOpen(false);
    setEditingTask(null);
  };

  // Submit Create or Edit form
  const handleFormSubmit = async (formData) => {
    try {
      if (editingTask) {
        // Update existing task
        const updated = await updateTask(editingTask.id, formData);
        setTasks((prevTasks) =>
          prevTasks.map((t) => (t.id === editingTask.id ? updated : t))
        );
      } else {
        // Create new task
        const created = await createTask(formData);
        setTasks((prevTasks) => [created, ...prevTasks]);
      }
      handleCloseFormModal();
    } catch (err) {
      alert(err.message || 'Operation failed. Please try again.');
    }
  };

  // Open delete confirmation modal
  const handleOpenDeleteModal = (task) => {
    setDeletingTask(task);
    setIsDeleteModalOpen(true);
  };

  // Close delete confirmation modal
  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setDeletingTask(null);
  };

  // Execute deletion after user confirmation
  const handleConfirmDelete = async () => {
    if (!deletingTask) return;
    try {
      await deleteTask(deletingTask.id);
      setTasks((prevTasks) => prevTasks.filter((t) => t.id !== deletingTask.id));
      handleCloseDeleteModal();
    } catch (err) {
      alert(err.message || 'Failed to delete task.');
    }
  };

  return (
    <div className="tasks-page">
      <Navbar />

      <main className="page-container">
        {/* Page Header */}
        <div className="tasks-header">
          <h1 className="tasks-title">Tasks</h1>
          <button
            type="button"
            className="add-task-btn"
            onClick={handleOpenCreateModal}
          >
            Add task
          </button>
        </div>

        {error && <div className="error-banner">{error}</div>}

        {/* Tasks Table */}
        <div className="tasks-card">
          {loading ? (
            <div className="loading-indicator">Loading tasks...</div>
          ) : tasks.length === 0 ? (
            <div className="empty-tasks-message">
              No tasks found. Click "Add task" to create your first task!
            </div>
          ) : (
            <div className="table-responsive">
              <table className="tasks-table">
                <thead>
                  <tr>
                    <th className="th-title">Title</th>
                    <th className="th-desc">Description</th>
                    <th className="th-status">Status</th>
                    <th className="th-actions">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {tasks.map((task) => (
                    <TaskItem
                      key={task.id}
                      task={task}
                      onEdit={handleOpenEditModal}
                      onDelete={handleOpenDeleteModal}
                    />
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>

      {/* Modal for Create / Edit */}
      <TaskForm
        isOpen={isFormOpen}
        onClose={handleCloseFormModal}
        onSubmit={handleFormSubmit}
        initialData={editingTask}
      />

      {/* Confirmation Modal for Delete */}
      <ConfirmModal
        isOpen={isDeleteModalOpen}
        title="Delete Task"
        message={
          deletingTask
            ? `Are you sure you want to delete "${deletingTask.title}"? This action cannot be undone.`
            : 'Are you sure you want to delete this task?'
        }
        onConfirm={handleConfirmDelete}
        onCancel={handleCloseDeleteModal}
      />
    </div>
  );
}

