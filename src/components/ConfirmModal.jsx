import './ConfirmModal.css';

/**
 * ConfirmModal Component
 * Reusable modal for confirming destructive actions like Task Deletion.
 */
export default function ConfirmModal({ isOpen, title, message, onConfirm, onCancel }) {
  if (!isOpen) return null;

  return (
    <div className="modal-backdrop" onClick={onCancel}>
      <div
        className="modal-card confirm-card"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="confirm-title">{title || 'Confirm Action'}</h3>
        <p className="confirm-message">{message || 'Are you sure you want to proceed?'}</p>

        <div className="modal-actions confirm-actions">
          <button
            type="button"
            className="btn btn-secondary"
            onClick={onCancel}
          >
            Cancel
          </button>
          <button
            type="button"
            className="btn btn-danger"
            onClick={onConfirm}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

