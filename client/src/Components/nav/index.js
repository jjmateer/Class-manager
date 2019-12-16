import React, { useState } from 'react';
import {Link} from "react-router-dom";
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
import {logout, loginAdmin } from "../../actions/auth-actions";
import { clearErrors } from "../../actions/error-actions";

const handleInputChange = event => {
    this.setState({ [event.target.id]: event.target.value });
};
const loginSubmit = event => {
    event.preventDefault();
    const userData = {
        username: this.state.Username,
        password: this.state.password
    };

    this.props.loginAdmin(userData);
};


const Navigation = () => {
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
                        <Input className="loginInputs" onChange={handleInputChange} id="username" required />
                    </FormGroup>
                    <FormGroup>
                        <Label for="Password">Password</Label>
                        <Input className="loginInputs" id="password" onChange={handleInputChange} required />
                    </FormGroup>
                </Form>
                <ModalFooter>
                    <Button onClick={loginSubmit}>Submit</Button>
                </ModalFooter>
            </Modal>

          <Link
            to="/"
            onClick={this.props.logout()}
          >
            Logout
          </Link>
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
    { loginAdmin, logout, clearErrors }
)(Navigation);