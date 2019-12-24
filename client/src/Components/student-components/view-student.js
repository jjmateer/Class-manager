import React, { useState } from "react";
import {
  Button,
  ButtonGroup,
  Modal,
  ModalHeader,
  Table,
  Dropdown, DropdownToggle, DropdownMenu, DropdownItem, Alert
} from 'reactstrap';
import { Link } from "react-router-dom";
import './student.css';

const ViewStudent = (props) => {
  let trigger = false;
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggle = () => setDropdownOpen(prevState => !prevState);
  const togglemodal = () => setModal(!modal); trigger = true;
  const [modal, setModal] = useState(false);

  return (
    <>
      <Button color="info" id={props.id} onClick={togglemodal}>Grades</Button>
      <Modal isOpen={modal} toggle={togglemodal}>
        <ModalHeader toggle={togglemodal}>{props.student.firstName} {props.student.lastName}</ModalHeader>
        <ModalHeader>
          <Dropdown isOpen={dropdownOpen} toggle={toggle}>
            <DropdownToggle color="info" caret>
              {props.view_subject ? props.view_subject : "Subjects"}
            </DropdownToggle>
            <DropdownMenu>
              {props.student.grades.map((subject, index) => {
                return (
                  <DropdownItem style={{ width: 300 }} key={`subject.title${index}`} id="view_subject" onClick={props.handleInputChange} value={subject.title}>{subject.title}
                  </DropdownItem>
                )
              })}
            </DropdownMenu>
          </Dropdown>
        </ModalHeader>
        {
          props.student.grades.map((subject, index) => subject.title === props.view_subject && subject.assignments ? (
            <div className="table-responsive" key={`${subject.title}${index}`}>
            <Table className="table">
              <thead>
                <tr>
                  <th style={{padding:0}}>Assignment</th>
                  <th style={{padding:0}}>Grade</th>
                  <th style={{padding:0}}><Link to="/print-chart" key={props.student._id} name={subject.title} onClick={props.viewStudent} id={props.student._id}>Spreadsheet</Link></th>
                </tr>
              </thead>
              <tbody>
                {subject.assignments.map((assignment, index) =>
                  <tr key={`${assignment._id}${index}`}>
                    <td>{assignment.title}</td>
                    <td>
                      <Alert color="info">Current grade: {assignment.grade}</Alert>
                      <ButtonGroup>
                        <Button color="info" onClick={props.gradeStudent} id={props.student._id} subject={subject.title} name={assignment.title} value={"L"} >L</Button>
                        <Button color="info" onClick={props.gradeStudent} id={props.student._id} subject={subject.title} name={assignment.title} value={"P"}>P</Button>
                        <Button color="info" onClick={props.gradeStudent} id={props.student._id} subject={subject.title} name={assignment.title} value={"M"}>M</Button>
                      </ButtonGroup>
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>
            </div>
          ) : null
          )
        }
      </Modal>
    </>
  );
}



export default ViewStudent;
