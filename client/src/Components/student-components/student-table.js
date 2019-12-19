import React from "react";
import { Table, ButtonGroup, Button } from "reactstrap";
import "./student.css";



const StudentTable = (props) => {
    return (
        <div className="table-responsive">
            <Table className="table">
                <thead>
                    <tr>
                        <th>Last Name</th>
                        <th>First Name</th>
                        <th>Birthday</th>
                        <th>Options</th>
                    </tr>
                    {props.students.map((student) => (
                        <tr key={student._id}>
                            <td>{student.lastName}</td>
                            <td>{student.firstName}</td>
                            <td>{student.birthday}</td>
                            <td>
                                <ButtonGroup>
                                    <Button>Edit</Button>
                                    <Button onClick={props.deleteStudent} id={student._id}>Delete</Button>
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