import React, { useState } from 'react';
import { Link } from "react-router-dom";
import {
    Button,
    Modal,
    ModalHeader,
    ModalFooter,
    Table
} from 'reactstrap';



const ViewSubject = (props) => {
    const togglemodal = () => setModal(!modal);
    const [modal, setModal] = useState(false);
    const { assignments } = props.subjectinfo
    return (
        <>
            <Button color="info" onClick={togglemodal}>View</Button>
            <Modal isOpen={modal} toggle={togglemodal}>
                <ModalHeader toggle={togglemodal}>{props.subjecttitle}</ModalHeader>
                <Link to="/print-chart-all" id={props.subjecttitle} onClick={props.viewSubject} style={{ textAlign:"center" }}>Spreadsheet</Link>
                <div className="table-responsive">
                    <Table key={props.subjecttitle}>
                        <thead>
                            <tr>
                                <th>Assignment</th>
                            </tr>
                            {assignments.length ?
                                assignments.map((assignment) => {
                                    return <tr key={assignment.title}>
                                        <td>
                                            <p>{assignment.title}</p>
                                            <Button color="danger" id={props.subjectinfo._id} name={assignment.title} onClick={props.deleteAssignment}>X</Button>
                                        </td>
                                    </tr>
                                }) : null}
                        </thead>
                    </Table>
                </div>
                <ModalFooter>
                </ModalFooter>
            </Modal>
        </>
    );
}

export default ViewSubject;