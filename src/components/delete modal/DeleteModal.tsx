import React from "react";
import { Modal, Button } from "react-bootstrap";
import { FaTrash } from "react-icons/fa";
import "./DeleteModal.css";

interface DeleteModalProps {
  show: boolean;
  onClose: () => void;
  onConfirm: () => void;
  loading?: boolean;
  title?: string;
  message?: string;
}

const DeleteModal: React.FC<DeleteModalProps> = ({
  show,
  onClose,
  onConfirm,
  loading = false,
  title = "Delete",
  message = "Are you sure you want to delete this item?",
}) => {
  return (
    <Modal
      show={show}
      onHide={onClose}
      centered
      size="sm"
      className="delete-modal"
    >
      <div className="delete-modal-body">
        <div className="icon-wrapper">
          <FaTrash />
        </div>

        <h5 className="title">{title}</h5>
        <p className="message">{message}</p>

        <div className="actions">
          <button className="cancel-btn" onClick={onClose}>
            Cancel
          </button>

          <button
            className="delete-btn"
            onClick={onConfirm}
            disabled={loading}
          >
            {loading ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default DeleteModal;