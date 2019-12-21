import React, { useState } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalFooter,
  Table,
  Dropdown, DropdownToggle, DropdownMenu, DropdownItem
} from 'reactstrap';
import './student.css';

const ViewStudent = (props) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggle = () => setDropdownOpen(prevState => !prevState);
  const togglemodal = () => setModal(!modal);
  const [modal, setModal] = useState(false);
  console.log(props.student.grades)
  return (
    <>
      <Button color="info" id={props.id} onClick={togglemodal}>Grades</Button>
      <Modal isOpen={modal} toggle={togglemodal}>
        <ModalHeader toggle={togglemodal}>{props.student.firstName} {props.student.lastName}</ModalHeader>
        <ModalHeader>
          <Dropdown isOpen={dropdownOpen} toggle={toggle}>
            <DropdownToggle caret>
              Subjects
        </DropdownToggle>
            <DropdownMenu>
              {props.student.grades.map((sdt) => {
                return <DropdownItem key={sdt.title}>{sdt.title}</DropdownItem>
              })}
            </DropdownMenu>
          </Dropdown>
        </ModalHeader>
      </Modal>
    </>
  );
}



export default ViewStudent;
