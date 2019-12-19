import React, {useState} from "react";
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
import "./student.css";



const EditStudentModal = (props) => {
    const togglemodal = () => setModal(!modal);
    const [modal, setModal] = useState(false);
    return (
        <>
            <Button onClick={togglemodal}>Edit</Button>
            <Modal isOpen={modal} toggle={togglemodal}>
                <ModalHeader toggle={togglemodal}></ModalHeader>
                <Form id="editForm" id={props.id} onSubmit={props.updateStudentInfo}>
                    {props.error.msg.msg ? <Alert color="danger">{props.error.msg.msg}</Alert> : null}
                    <Label for="firstName">First name</Label>
                    <Input className="editInputs" onChange={props.handleInputChange} id="firstName" required />
                    <Label for="lastName">Last name</Label>
                    <Input className="editInputs" onChange={props.handleInputChange} id="lastName" required />
                    <Label for="Birthday">Birthday</Label>
                    <Input className="editInputs" onChange={props.handleInputChange} id="birthday" required />
                    <FormGroup>
                        <Button to="/" style={{ marginTop: 20 }} id={props.id}>Submit</Button>
                    </FormGroup>
                </Form>
            </Modal>
        </>
    );
}

export default EditStudentModal;