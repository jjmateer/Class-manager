import React from "react";
import { Table } from "reactstrap"



const StudentTable = (props) => {
    return (
        <>
            <Table>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Class</th>
                    </tr>
                    {props.students.map((student) => (
                        <tr key={student._id}>
                            <td>{student._id}</td>
                            <td>{student.firstName}</td>
                            <td>{student.lastName}</td>
                            <td>{student.birthday}</td>
                        </tr>
                    ))}
                </thead>
            </Table>
        </>
    );
}

export default StudentTable;