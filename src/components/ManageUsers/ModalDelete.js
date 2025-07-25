import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const ModalDelete = (props) => {
  return (
    <>
      <Modal {...props} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete A User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete this user: {props.dataModal.email} ?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={props.onHide}>
            Close
          </Button>
          <Button variant="danger" onClick={props.confirmDeleteUser}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalDelete;
