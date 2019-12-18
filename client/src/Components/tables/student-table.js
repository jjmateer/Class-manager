import React from "react";
import { Table } from "reactstrap"



const StudentTable = () => {
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
                </thead>
            </Table>
        </>
    );
}

export default StudentTable;