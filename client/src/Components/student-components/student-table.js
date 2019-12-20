import React, { useState } from "react";
import {
    ButtonGroup,
    Table
} from 'reactstrap';
import EditStudentModal from "./edit-student-modal";
import "./student.css";
import VerifyDeleteModal from "./verify-delete-modal";
import ViewStudent from "./view-student";



const StudentTable = (props) => {
    const togglemodal = () => setModal(!modal);
    const [modal, setModal] = useState(false);
    return (
        <div className="table-responsive">
            <Table className="table">
                <thead>
                    <tr>
                        <th>Last Name</th>
                        <th>First Name</th>
                        <th>Birthday</th>
                        <th>Grade</th>
                        <th>Options</th>
                    </tr>
                    {props.students.map((student) => (
                        <tr key={student._id}>
                            <td>{student.lastName}</td>
                            <td>{student.firstName}</td>
                            <td>{student.birthday}</td>
                            <td>{student.grade}</td>
                            <td>
                                <ButtonGroup>
                                    <ViewStudent
                                        viewStudent={props.viewstudent}
                                        student={student}
                                    />
                                    <EditStudentModal
                                        id={student._id}
                                        handleInputChange={props.handleInputChange}
                                        updateStudentInfo={props.updateStudentInfo}
                                        error={props.error}
                                    />
                                    <VerifyDeleteModal
                                        id={student._id}
                                        handleInputChange={props.handleInputChange}
                                        deleteStudent={props.deleteStudent}
                                        error={props.error}
                                    />
                                </ButtonGroup>
                            </td>
                        </tr>
                    ))}
                </thead>
            </Table>
        </div>
    );
}

export default StudentTable;