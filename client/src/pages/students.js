import React, { Component } from "react";
import StudentTable from "../Components/student-components/student-table";
import AddStudent from "../Components/student-components/add-student";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { clearErrors } from "../actions/error-actions";
import { loadUser } from "../actions/auth-actions";
import {
    addStudent,
    getStudents,
    deleteStudent,
    updateStudentInfo,
    viewStudent,
    gradeStudentN,
    gradeStudentM,
    viewStudentRC
} from "../actions/student-actions";
import { Spinner } from "reactstrap"



class StudentSearch extends Component {
    state = {
        firstName: "",
        lastName: "",
        birthday: "",
        view_subject: "",
        errors: {}
    };
    static propTypes = {
        isAuthenticated: PropTypes.bool,
        error: PropTypes.object.isRequired,
        loadUser: PropTypes.func.isRequired,
        clearErrors: PropTypes.func.isRequired,
        addStudent: PropTypes.func.isRequired,
        getStudents: PropTypes.func.isRequired,
        deleteStudent: PropTypes.func.isRequired,
        updateStudentInfo: PropTypes.func.isRequired,
        viewStudent: PropTypes.func.isRequired,
        viewStudentRC: PropTypes.func.isRequired,
        gradeStudentN: PropTypes.func.isRequired,
        gradeStudentM: PropTypes.func.isRequired
    }
    componentDidMount = () => {
        this.props.clearErrors();
        this.props.getStudents();
    }

    getStudentsAndUpdate = () => {
        setTimeout(
            function () {
                this.props.getStudents();
                this.forceUpdate();
            }
                .bind(this),
            10
        );
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
        this.getStudentsAndUpdate();
    };
    deleteStudent = event => {
        this.props.deleteStudent(event.target.id);
        this.getStudentsAndUpdate()
    }
    viewStudent = event => {
        event.preventDefault();
        this.props.viewStudent(event.target.id, event.target.name);
        this.props.history.push("/print-chart");
    }
    viewStudentRC = event => {
        event.preventDefault();
        this.props.viewStudentRC(event.target.id);
        this.props.history.push("/print-chart-rc");
    }
    gradeStudentN = event => {
        event.preventDefault();
        this.props.gradeStudentN(event.target.id, event.target.name, event.target.value, event.target.getAttribute("subject"));
        alert(`${event.target.name} grade changed to: ${event.target.value}.`)
        this.getStudentsAndUpdate()
    }
    gradeStudentM = event => {
        event.preventDefault();
        this.props.gradeStudentM(event.target.id, event.target.name, event.target.value, event.target.getAttribute("subject"));
        alert(`${event.target.name} grade changed to: ${event.target.value}.`)
        this.getStudentsAndUpdate()
    }
    updateStudentInfo = event => {
        event.preventDefault();
        var updatedStudent = {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            birthday: this.state.birthday
        };
        this.props.updateStudentInfo(event.target.id, updatedStudent)
        this.getStudentsAndUpdate();
    }
    render() {
        return (
            <>
                <h1 className="page-header">Students</h1>
                <AddStudent
                    handleInputChange={this.handleInputChange}
                    handleFormSubmit={this.handleFormSubmit}
                    student={this.props.student}
                />
                {!this.props.student.isLoading ?
                    <StudentTable
                        students={this.props.student.students}
                        deleteStudent={this.deleteStudent}
                        handleInputChange={this.handleInputChange}
                        updateStudentInfo={this.updateStudentInfo}
                        gradeStudentN={this.gradeStudentN}
                        gradeStudentM={this.gradeStudentM}
                        view_subject={this.state.view_subject}
                        viewStudent={this.viewStudent}
                        viewStudentRC={this.viewStudentRC}
                        error={this.props.error}
                    />
                    : <div style={{ margin: "auto", width: 50 }}><Spinner type="grow" color="primary" /></div>}
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
    { clearErrors, loadUser, addStudent, getStudents, deleteStudent, updateStudentInfo, viewStudent, gradeStudentN, gradeStudentM, viewStudentRC }
)(StudentSearch);