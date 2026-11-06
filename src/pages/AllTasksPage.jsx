import React, { useState } from 'react';
import {
  ListFilter,
  Plus,
  Search,
  Pencil,
  Trash2,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  RotateCcw
} from 'lucide-react';

export default function AllTasksPage({
  tasks,
  onOpenCreateModal,
  onOpenEditModal,
  onOpenDeleteModal,
  onToggleStatus,
  filters,
  setFilters,
  onRefresh
}) {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  const formatDueDate = (dateStr) => {
    if (!dateStr) return 'No Date';
    const today = new Date().toISOString().split('T')[0];
    const tomorrow = new Date(Date.now() + 86400000).toISOString().split('T')[0];

    if (dateStr === today) return 'Today';
    if (dateStr === tomorrow) return 'Tomorrow';

    try {
      const d = new Date(dateStr);
      return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    } catch (e) {
      return dateStr;
    }
  };

  // Filter tasks client-side to ensure smooth instant filtering in standalone mode
  let filteredTasks = [...tasks];
  if (filters.search && filters.search.trim() !== '') {
    const q = filters.search.toLowerCase();
    filteredTasks = filteredTasks.filter(
      (t) =>
        t.title.toLowerCase().includes(q) ||
        (t.description && t.description.toLowerCase().includes(q))
    );
  }
  if (filters.priority && filters.priority !== 'ALL') {
    filteredTasks = filteredTasks.filter((t) => t.priority === filters.priority);
  }
  if (filters.status && filters.status !== 'ALL') {
    filteredTasks = filteredTasks.filter((t) => t.status === filters.status);
  }

  // Sorting
  if (filters.sortBy) {
    filteredTasks.sort((a, b) => {
      let valA = a[filters.sortBy] || '';
      let valB = b[filters.sortBy] || '';
      if (valA < valB) return filters.sortDir === 'desc' ? 1 : -1;
      if (valA > valB) return filters.sortDir === 'desc' ? -1 : 1;
      return 0;
    });
  }

  // Pagination calculation
  const totalTasks = filteredTasks.length;
  const totalPages = Math.ceil(totalTasks / pageSize) || 1;
  const startIndex = (currentPage - 1) * pageSize;
  const currentTasks = filteredTasks.slice(startIndex, startIndex + pageSize);

  return (
    <div className="page-container">
      {/* 1. Header */}
      <div className="page-header">
        <div className="page-title-group">
          <div className="page-icon-badge" style={{ background: 'linear-gradient(135deg, #6366f1 0%, #4338ca 100%)' }}>
            <ListFilter size={24} />
          </div>
          <div className="page-title-text">
            <h1>All Tasks</h1>
            <p>Manage and organize all your tasks in one place.</p>
          </div>
        </div>

        <button className="btn-primary" onClick={onOpenCreateModal}>
          <Plus size={18} />
          <span>Add New Task</span>
        </button>
      </div>

      {/* 2. Filter & Search Toolbar */}
      <div className="toolbar-card">
        <div className="search-input-wrapper" style={{ width: '280px' }}>
          <Search size={16} />
          <input
            type="text"
            placeholder="Search tasks..."
            value={filters.search}
            onChange={(e) => setFilters({ ...filters, search: e.target.value })}
          />
        </div>

        <div className="toolbar-filters">
          <select
            className="select-filter"
            value={filters.priority}
            onChange={(e) => setFilters({ ...filters, priority: e.target.value })}
          >
            <option value="ALL">All Priority</option>
            <option value="HIGH">High</option>
            <option value="MEDIUM">Medium</option>
            <option value="LOW">Low</option>
          </select>

          <select
            className="select-filter"
            value={filters.status}
            onChange={(e) => setFilters({ ...filters, status: e.target.value })}
          >
            <option value="ALL">All Status</option>
            <option value="PENDING">Pending</option>
            <option value="COMPLETED">Completed</option>
          </select>

          <select
            className="select-filter"
            value={`${filters.sortBy}-${filters.sortDir}`}
            onChange={(e) => {
              const [sortBy, sortDir] = e.target.value.split('-');
              setFilters({ ...filters, sortBy, sortDir });
            }}
          >
            <option value="dueDate-asc">Sort by: Due Date ↑</option>
            <option value="dueDate-desc">Sort by: Due Date ↓</option>
            <option value="priority-desc">Sort by: Priority</option>
            <option value="title-asc">Sort by: Task Title</option>
            <option value="createdAt-desc">Sort by: Created Date</option>
          </select>
        </div>
      </div>

      {/* 3. Table */}
      <div className="table-wrapper">
        <table className="data-table">
          <thead>
            <tr>
              <th style={{ width: '50px' }}>#</th>
              <th>Task Title</th>
              <th>Description</th>
              <th>Due Date</th>
              <th>Priority</th>
              <th>Status</th>
              <th style={{ textAlign: 'center', width: '130px' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentTasks.length === 0 ? (
              <tr>
                <td colSpan={7} style={{ textAlign: 'center', padding: '48px 20px', color: 'var(--text-muted)' }}>
                  No tasks found matching your filters.
                </td>
              </tr>
            ) : (
              currentTasks.map((task, index) => (
                <tr key={task.id}>
                  <td style={{ color: 'var(--text-muted)', fontWeight: 600 }}>
                    {startIndex + index + 1}
                  </td>
                  <td style={{ fontWeight: 600, color: 'var(--text-main)' }}>
                    {task.title}
                  </td>
                  <td style={{ color: 'var(--text-muted)', maxWidth: '280px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {task.description || '—'}
                  </td>
                  <td style={{ color: 'var(--text-main)', fontWeight: 500 }}>
                    {formatDueDate(task.dueDate)}
                  </td>
                  <td>
                    <span className={`priority-tag priority-${task.priority?.toLowerCase()}`}>
                      {task.priority}
                    </span>
                  </td>
                  <td>
                    <span className={`status-tag status-${task.status?.toLowerCase()}`}>
                      {task.status === 'COMPLETED' ? 'Completed' : 'Pending'}
                    </span>
                  </td>
                  <td>
                    <div className="actions-cell" style={{ justifyContent: 'center' }}>
                      <button
                        className="action-icon-btn"
                        title="Edit Task"
                        onClick={() => onOpenEditModal(task)}
                      >
                        <Pencil size={16} />
                      </button>

                      <button
                        className="action-icon-btn delete"
                        title="Delete Task"
                        onClick={() => onOpenDeleteModal(task)}
                      >
                        <Trash2 size={16} />
                      </button>

                      <button
                        className="action-icon-btn toggle"
                        title={task.status === 'COMPLETED' ? 'Mark as Pending' : 'Mark as Completed'}
                        onClick={() => onToggleStatus(task.id)}
                      >
                        {task.status === 'COMPLETED' ? (
                          <RotateCcw size={16} color="#d97706" />
                        ) : (
                          <CheckCircle2 size={16} color="#16a34a" />
                        )}
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        {/* Table Footer */}
        <div className="table-footer">
          <span>
            Showing {totalTasks === 0 ? 0 : startIndex + 1}-{Math.min(startIndex + pageSize, totalTasks)} of {totalTasks} tasks
          </span>

          <div className="pagination-btn-group">
            <button
              className="page-btn"
              disabled={currentPage <= 1}
              onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            >
              <ChevronLeft size={16} />
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                className={`page-btn ${currentPage === page ? 'active' : ''}`}
                onClick={() => setCurrentPage(page)}
              >
                {page}
              </button>
            ))}

            <button
              className="page-btn"
              disabled={currentPage >= totalPages}
              onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

