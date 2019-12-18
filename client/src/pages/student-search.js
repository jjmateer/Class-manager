import React, { Component } from "react";
import StudentTable from "../Components/student-components/student-table";
import AddStudent from "../Components/student-components/add-student";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { clearErrors } from "../actions/error-actions";
import { loadUser } from "../actions/auth-actions";



class StudentSearch extends Component {
    constructor() {
        super();
        this.state = {
            firstName: "",
            lastName: "",
            birthday: "",
            errors: {}
        };
    }
    static propTypes = {
        isAuthenticated: PropTypes.bool,
        error: PropTypes.object.isRequired,
        loadUser: PropTypes.func.isRequired,
        clearErrors: PropTypes.func.isRequired
    }
    handleInputChange = event => {
        this.setState({ [event.target.id]: event.target.value });
    };

    handleFormSubmit = event => {
        event.preventDefault();
        var newUser = {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            birthday: this.state.birthday
        };

        this.props.registerAdmin(newUser);
    };
    render() {
        return (
            <>
                <h1 className="page-header">Students</h1>
                <AddStudent
                    handleInputchange={this.handleInputchange}
                    handleFormSubmit={this.handleFormSubmit}
                />
                <StudentTable />
            </>
        );
    }
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    user: state.auth.user,
    auth: state.auth,
    error: state.error
})

export default connect(
    mapStateToProps,
    { clearErrors, loadUser }
)(StudentSearch);