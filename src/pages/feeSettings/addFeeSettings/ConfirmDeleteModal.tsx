import { Modal, Button, Spinner } from "react-bootstrap";
import styled from "styled-components";
import { GoTrash } from "react-icons/go";

interface ConfirmDeleteModalProps {
  open: boolean;
  title?: string;
  message?: string;
  onCancel: () => void;
  onConfirm: () => void;
  loading?: boolean;
}

export function ConfirmDeleteModal({
  open,
  title = "Delete Confirmation",
  message = "Are you sure you want to delete this item?",
  onCancel,
  onConfirm,
  loading = false,
}: ConfirmDeleteModalProps) {
  return (
    <StyledModal
      show={open}
      onHide={onCancel}
      centered
      backdrop="static"
      keyboard={!loading}
    >
      <StyledHeader closeButton={!loading}>
        <Modal.Title className="d-flex align-items-center gap-2 text-danger">
          <GoTrash size={20} />
          {title}
        </Modal.Title>
      </StyledHeader>

      <StyledBody>{message}</StyledBody>

      <StyledFooter>
        <CancelButton
          variant="outline-secondary"
          onClick={onCancel}
          disabled={loading}
        >
          Cancel
        </CancelButton>

        <DeleteButton variant="danger" onClick={onConfirm} disabled={loading}>
          {loading ? (
            <>
              <Spinner
                as="span"
                animation="border"
                size="sm"
                className="me-2"
              />
              Deleting...
            </>
          ) : (
            "Delete"
          )}
        </DeleteButton>
      </StyledFooter>
    </StyledModal>
  );
}
export const CancelButton = styled(Button)`
  min-width: 110px;
  border-radius: 8px;
  font-weight: 500;
`;

export const DeleteButton = styled(Button)`
  min-width: 110px;
  border-radius: 8px;
  font-weight: 600;
  background-color: #dc2626;
  border-color: #dc2626;

  &:hover {
    background-color: #b91c1c;
    border-color: #b91c1c;
  }

  &:disabled {
    background-color: #fca5a5;
    border-color: #fca5a5;
  }
`;

export const StyledModal = styled(Modal)`
  .modal-content {
    border: none;
    border-radius: 14px;
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
    padding: 8px;
  }
`;

export const StyledHeader = styled(Modal.Header)`
  border-bottom: none;
  padding: 16px 20px;

  .modal-title {
    font-weight: 600;
    font-size: 18px;
  }

  .btn-close {
    opacity: 0.6;
    box-shadow: none;

    &:hover {
      opacity: 1;
    }
  }
`;

export const StyledBody = styled(Modal.Body)`
  padding: 8px 20px 24px;
  font-size: 15px;
  color: #6b7280;
`;

export const StyledFooter = styled(Modal.Footer)`
  border-top: none;
  padding: 0 20px 20px;
  display: flex;
  justify-content: center;
  gap: 12px;
`;
