import { Button, Modal } from "react-bootstrap";

type DeleteProps = {
  isShow: boolean;
  onOk: () => void;
  onClose: () => void;
};

function Delete({ isShow, onOk, onClose }: DeleteProps) {
  return (
    <Modal show={isShow} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Modal heading</Modal.Title>
      </Modal.Header>
      <Modal.Body>Delete?</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Cancel
        </Button>
        <Button variant="danger" onClick={onOk}>
          Ok
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default Delete;
