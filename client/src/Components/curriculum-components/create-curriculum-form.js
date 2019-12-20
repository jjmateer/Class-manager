import React, { useState } from 'react';
import { Link } from "react-router-dom";
import {
    FormGroup,
    Button,
    Modal,
    ModalHeader,
    ModalFooter,
    Form,
    Label,
    Input,
    Spinner,
    Alert
} from 'reactstrap';



const CreateCirriculum = (props) => {
    const togglemodal = () => setModal(!modal);
    const [modal, setModal] = useState(false);
    return (
        <>
            <Button color="success" style={{ marginRight: "2vw", marginBottom: "2vw", float: "right" }} onClick={togglemodal}>Create new curriculum</Button>
            <Modal isOpen={modal} toggle={togglemodal}>
                <ModalHeader toggle={togglemodal}>Create</ModalHeader>
                <Form onSubmit={props.createCurriculum}>
                    <Label for="Title">Title</Label>
                    <Input onChange={props.handleInputChange} type="title" id="title" required />
                        <Button style={{ marginTop: 20 }} type="submit" onClick={props.CreateCirriculum}>Submit</Button>
                </Form>
                <ModalFooter>
                </ModalFooter>
            </Modal>
        </>
    );
}

export default CreateCirriculum;