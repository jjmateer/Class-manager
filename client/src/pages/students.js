import React, { Component } from "react";
import StudentTable from "../Components/student-components/student-table";
import AddStudent from "../Components/student-components/add-student";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { clearErrors } from "../actions/error-actions";
import { loadUser } from "../actions/auth-actions";
import { addStudent, getStudents } from "../actions/student-actions";



class StudentSearch extends Component {
    state = {
        firstName: "",
        lastName: "",
        birthday: "",
        errors: {}
    };
    static propTypes = {
        isAuthenticated: PropTypes.bool,
        error: PropTypes.object.isRequired,
        loadUser: PropTypes.func.isRequired,
        clearErrors: PropTypes.func.isRequired,
        addStudent: PropTypes.func.isRequired,
        getStudents: PropTypes.func.isRequired
    }
    componentDidMount = () => {
        this.props.clearErrors();
        this.props.loadUser();
        this.props.getStudents();
    }
    handleInputChange = event => {
        this.setState({ [event.target.id]: event.target.value });
    };

    handleFormSubmit = event => {
        event.preventDefault();
        var newStudent = {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            birthday: this.state.birthday
        };

        this.props.addStudent(newStudent);
    };
    render() {
        return (
            <>
                <h1 className="page-header">Students</h1>
                <AddStudent
                    handleInputChange={this.handleInputChange}
                    handleFormSubmit={this.handleFormSubmit}
                />
                <StudentTable
                    students={this.props.student.students}
                />
            </>
        );
    }
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    user: state.auth.user,
    auth: state.auth,
    student: state.student,
    error: state.error
})

export default connect(
    mapStateToProps,
    { clearErrors, loadUser, addStudent, getStudents }
)(StudentSearch);