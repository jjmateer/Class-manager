import React, { useState } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalFooter,
  Table
} from 'reactstrap';
import './student.css';

const ViewStudent = (props) => {
  const togglemodal = () => setModal(!modal);
  const [modal, setModal] = useState(false);
  return (
    <>
      <Button color="info" id={props.id} onClick={togglemodal}>View</Button>
      <Modal isOpen={modal} toggle={togglemodal}>
        <ModalHeader toggle={togglemodal}>{props.student.firstName} {props.student.lastName}</ModalHeader>
        <ModalHeader>Grades</ModalHeader>
          
         <ModalFooter/>
      </Modal>
    </>
  );
}



export default ViewStudent;
