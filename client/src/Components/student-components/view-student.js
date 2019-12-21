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
              {props.student.grades.map((subject) => {
                return (
                  <DropdownItem key={subject.title} id="view_subject" onClick={props.handleInputChange} value={subject.title}>{subject.title}</DropdownItem>
                )
              })}
            </DropdownMenu>
          </Dropdown>
        </ModalHeader>
        <Table className="table">
          <tr>
            <th>Assignment</th>
            <th>Grade</th>
          </tr>
          {
            props.student.grades.map((subject) => subject.title === props.view_subject && subject.assignments ? (
              <tr key={subject._id}>
                <td>
                  {subject.assignments.map((assignment) => <p>{ assignment.title }</p>)}
                </td>
                <td>
                  {subject.assignments.map((assignment) => <p>{ assignment.grade }</p>)}
                </td>
              </tr>
            ) : null
            )
          }
        </Table>
      </Modal>
    </>
  );
}



export default ViewStudent;
