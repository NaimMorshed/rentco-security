import React from "react";
import axios from "axios";
import { Button, Modal } from "react-bootstrap";

export default function DeleteUser({ handleClose, id }) {
  const handleDelete = async () => {
    try {
      const response = await axios.delete(`http://localhost:5000/users/${id}`);
      alert(response.data.message);
      handleClose();
    } catch (error) {
      alert("Error");
      console.log("Error: ", error.message);
    }
  };

  return (
    <>
      <p>
        This action will permanently delete your account and all associated
        data. There is no way to recover this information. Are you sure you want
        to proceed with the deletion?
      </p>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button onClick={handleDelete} variant="primary">
          Delete
        </Button>
      </Modal.Footer>
    </>
  );
}
