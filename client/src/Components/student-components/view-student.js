import React, { useState } from "react";
import {
  Button,
  ButtonGroup,
  Modal,
  ModalHeader,
  Table,
  Dropdown, DropdownToggle, DropdownMenu, DropdownItem
} from 'reactstrap';
import './student.css';

const ViewStudent = (props) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggle = () => setDropdownOpen(prevState => !prevState);
  const togglemodal = () => setModal(!modal);
  const [modal, setModal] = useState(false);
  return (
    <>
    <Button color="info" id={props.id} onClick={togglemodal}>Grades</Button>
    <Modal isOpen={modal} toggle={togglemodal}>
      <ModalHeader toggle={togglemodal}>{props.student.firstName} {props.student.lastName}</ModalHeader>
      <ModalHeader>
        <Dropdown isOpen={dropdownOpen} toggle={toggle}>
          <DropdownToggle caret>
            {props.view_subject ? props.view_subject : "Subjects"}
          </DropdownToggle>
          <DropdownMenu>
            {props.student.grades.map((subject) => {
              return (
                <DropdownItem key={subject.title} id="view_subject" onClick={props.handleInputChange} value={subject.title}>{subject.title}</DropdownItem>
              )
            })}
          </DropdownMenu>
        </Dropdown>
      </ModalHeader>
      {
        props.student.grades.map((subject) => subject.title === props.view_subject && subject.assignments ? (
          <Table className="table">
            <thead>
              <tr>
                <th>Assignment</th>
                <th>Grade</th>
              </tr>
            </thead>
            <tbody>
              {subject.assignments.map((assignment) =>
                <tr key={subject.title}>
                  <td key={assignment.title}>{assignment.title}</td>
                  <td>
                    <ButtonGroup key={assignment.title}>
                      <Button>L</Button>
                      <Button>P</Button>
                      <Button>M</Button>
                    </ButtonGroup>
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        ) : null
        )
      }
    </Modal>
    </>
  );
}



export default ViewStudent;
