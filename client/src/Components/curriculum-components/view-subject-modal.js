import React, { useState } from 'react';
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
                <ModalHeader toggle={togglemodal}>{props.subjectinfo.title}</ModalHeader>
                <div className="table-responsive">
                    <Table className="table">
                        <thead>
                            <tr>
                                <th>Assignment</th>
                            </tr>
                            {assignments.length ?
                                assignments.map((subject) => {
                                    return <tr key={subject._id}>
                                        <td>{subject.title}</td>
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