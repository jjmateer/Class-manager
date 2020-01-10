import React, { useState } from 'react';
import {
    Button,
    Modal,
    ModalHeader,
    ModalFooter,
    Form,
    Label,
    Input
} from 'reactstrap';



const AddAssignment = (props) => {
    const togglemodal = () => setModal(!modal);
    const [modal, setModal] = useState(false);
    return (
        <>
            <Button color="success" style={{padding:"auto"}} onClick={togglemodal}>Add</Button>
            <Modal isOpen={modal} toggle={togglemodal}>
                <ModalHeader toggle={togglemodal}>New assignment</ModalHeader>
                <Form style={{ padding: 20 }} id={props.title} onSubmit={props.addAssignment}>
                    <Label for="Title">Title</Label>
                    <Input onChange={props.handleInputChange} type="title" id="titleAdd" required />
                    <Button style={{ marginTop: 20 }} id={props.title} onClick={togglemodal} type="submit">Submit</Button>
                </Form>
                <ModalFooter>
                </ModalFooter>
            </Modal>
        </>
    );
}

export default AddAssignment;