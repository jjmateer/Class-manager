import React, { useState } from 'react';
import { Link } from "react-router-dom";
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
    Input
} from 'reactstrap';
import "./style.css";
import { connect } from "react-redux";
import { logout } from "../../actions/auth-actions";



const Navigation = (props) => {
    const togglemodal = () => setModal(!modal);
    const [modal, setModal] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const togglenav = () => setIsOpen(!isOpen);
    return (
        <>
            <Navbar className="navbar-right" color="light" light expand="md">
                <NavbarBrand tag={Link} to="/">Class Manager</NavbarBrand>
                <NavbarToggler onClick={togglenav} />
                <Collapse isOpen={isOpen} navbar>
                    {!props.isAuthenticated ?
                        <Nav className="ml-auto" navbar>
                            <NavLink tag={Link} to="#" onClick={togglemodal}>Login</NavLink>
                            <NavLink tag={Link} to="/register">Register</NavLink>
                            <NavLink tag={Link} to="/students">Students</NavLink>
                        </Nav>
                        :
                        <Nav className="ml-auto" navbar>
                            <NavLink tag={Link} to="#">Hello, {props.auth.user.name} </NavLink>
                            <NavLink tag={Link} to="/students">Students</NavLink>
                            <NavLink tag={Link} to="/" onClick={props.logout}>Logout</NavLink>
                        </Nav>
                    }
                </Collapse>
            </Navbar>
            <Modal isOpen={!props.isAuthenticated ? modal : false} toggle={togglemodal}>
                <ModalHeader toggle={togglemodal}>Login</ModalHeader>
                <Form id="loginForm" onSubmit={props.loginSubmit}>
                    {props.error.msg ? <p className="auth-error-message">{props.error.msg.msg}</p> : null}
                    <Label for="Username">Username</Label>
                    <Input className="loginInputs" onChange={props.handleInputChange} type="username" id="user" required />
                    <Label for="Password">Password</Label>
                    <Input className="loginInputs" id="password" onChange={props.handleInputChange} type="password" required />
                    <FormGroup>
                        <Button to="/" style={{ marginTop: 20 }} type="submit">Submit</Button>
                    </FormGroup>
                </Form>
                <ModalFooter>
                    <p>
                        Don't have an account? <Link to="/register">Register</Link>
                    </p>
                </ModalFooter>
            </Modal>
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
    { logout }
)(Navigation);