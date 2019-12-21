import React, { useState } from "react";
import {
  Button,
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
        <Table className="table">
          <thead>
            <tr>
              <th>Assignment</th>
              <th>Grade</th>
            </tr>
          </thead>
          <tbody>
            {
              props.student.grades.map((subject) => subject.title === props.view_subject && subject.assignments ? (
                <tr key={subject.title}>
                  <td>
                    {subject.assignments.map((assignment) => <p key={assignment.title}>{assignment.title}</p>)}
                  </td>
                  <td>
                    {subject.assignments.map((assignment) => <p key={assignment.title}>{assignment.grade}</p>)}
                  </td>
                </tr>
              ) : null
              )
            }
          </tbody>
        </Table>
      </Modal>
    </>
  );
}



export default ViewStudent;
