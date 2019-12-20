import React, { useState } from "react";
import {
  Button,
  Modal,
  ModalHeader,
} from 'reactstrap';

const ViewStudent = (props) => {
  const togglemodal = () => setModal(!modal);
  const [modal, setModal] = useState(false);
  return (
    <>
      <Button color="info" id={props.id} onClick={togglemodal}>View</Button>
      <Modal isOpen={modal} toggle={togglemodal}>
        <ModalHeader toggle={togglemodal}>{props.student.firstName} {props.student.lastName}</ModalHeader>
        <ul>Assignments
          <li></li>
        </ul>
      </Modal>
    </>
  );
}



export default ViewStudent;
