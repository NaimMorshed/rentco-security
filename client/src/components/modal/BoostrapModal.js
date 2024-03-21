import { Modal } from "react-bootstrap";
import NewUser from "./NewUser";
import DeleteUser from "./DeleteUser";
import DetailView from "./DetailView";
import UpdateUser from "./UpdateUser";

export default function BootstrapModal({ showModal, handleClose, options }) {
  const { title, data } = options;

  return (
    <>
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{data.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {title === "Create new user" && <NewUser handleClose={handleClose} />}
          {title === "Delete user" && <DeleteUser handleClose={handleClose} id={data} />}
          {title === "Detail view" && <DetailView handleClose={handleClose} id={data} />}
          {title === "Update user" && <UpdateUser handleClose={handleClose} id={data} />}
        </Modal.Body>

        {/* <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Create
          </Button>
        </Modal.Footer> */}
      </Modal>
    </>
  );
}
