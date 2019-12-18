import React, { useState } from 'react';
// import { Link } from "react-router-dom";
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavLink,
    Button,
    Modal,
    ModalHeader,
    ModalFooter,
    Form,
    FormGroup,
    Label,
    Input
} from 'reactstrap';
import "./style.css";
import { connect } from "react-redux";
import { logout } from "../../actions/auth-actions";
import { clearErrors } from "../../actions/error-actions";



const Navigation = (props) => {
    const togglemodal = () => setModal(!modal);
    const [modal, setModal] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const togglenav = () => setIsOpen(!isOpen);
    return (
        <>
            <Navbar className="navbar-right" color="light" light expand="md">
                <NavbarBrand href="/">Stir The Pot</NavbarBrand>
                <NavbarToggler onClick={togglenav} />
                <Collapse isOpen={isOpen} navbar>
                    <Nav className="ml-auto" navbar>

                        <NavLink href="#" onClick={togglemodal}>Login</NavLink>
                        <NavLink href="/register">Register</NavLink>

                    </Nav>
                </Collapse>
            </Navbar>
            <Modal isOpen={modal} toggle={togglemodal}>
                <ModalHeader toggle={togglemodal}>Login</ModalHeader>
                <Form id="loginForm">
                    <FormGroup>
                        <Label for="Username">Username</Label>
                        <Input className="loginInputs" onChange={props.handleInputChange} id="user" required />
                    </FormGroup>
                    <FormGroup>
                        <Label for="Password">Password</Label>
                        <Input className="loginInputs" id="password" onChange={props.handleInputChange} required />
                    </FormGroup>
                </Form>
                <ModalFooter>
                    <Button onClick={props.loginSubmit}>Submit</Button>
                </ModalFooter>
            </Modal>

            <a href="/" onClick={logout()} >Logout</a>
        </>
    );
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    auth: state.auth,
    error: state.error
})

export default connect(
    mapStateToProps,
    { logout, clearErrors }
)(Navigation);