import React from "react";
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    FormGroup,
    Nav,
    NavLink,
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
    const [isOpen, setIsOpen] = useState(false);
    return (
        <Modal isOpen={!props.isAuthenticated ? modal : false} toggle={togglemodal}>
            <ModalHeader toggle={togglemodal}>Login</ModalHeader>
            <Form id="loginForm" onSubmit={props.loginSubmit}>
                {props.error.msg.msg ? <Alert color="danger">{props.error.msg.msg}</Alert> : null}
                <Label for="Username">Username</Label>
                <Input className="loginInputs" onChange={props.handleInputChange} type="username" id="user" required />
                <Label for="Password">Password</Label>
                <Input className="loginInputs" id="password" onChange={props.handleInputChange} type="password" required />
                <FormGroup>
                    <Button to="/" style={{ marginTop: 20 }} type="submit">Submit</Button>
                </FormGroup>
            </Form>
        </Modal>
    );
}

export default EditStudentModal;