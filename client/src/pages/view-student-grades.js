import React, { Component, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { clearErrors } from "../actions/error-actions";
import { loadUser } from "../actions/auth-actions";
import {
    Button,
    ButtonGroup,
    Modal,
    ModalHeader,
    Table,
    Dropdown, DropdownToggle, DropdownMenu, DropdownItem, Alert
} from 'reactstrap';
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
import ViewStudent from "../Components/student-components/view-student"
import { Link } from "react-router-dom";


class ViewStudentGrades extends Component {
    state = {
        firstName: "",
        lastName: "",
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
    gradeStudentN = event => {
        event.preventDefault();
        this.props.gradeStudentN(event.target.id, event.target.name, event.target.value, event.target.getAttribute("subject"));
        // alert(`${event.target.name} grade changed to: ${event.target.value}.`)
        this.getStudentsAndUpdate()
    }
    gradeStudentM = event => {
        event.preventDefault();
        this.props.gradeStudentM(event.target.id, event.target.name, event.target.value, event.target.getAttribute("subject"));
        // alert(`${event.target.name} grade changed to: ${event.target.value}.`)
        this.getStudentsAndUpdate()
    }
    render() {
        return (
            this.props.student.view_student.sdata ? 
            <>
                <div>{this.props.student.firstName} {this.props.student.lastName}</div>
                <div>
                    <Dropdown isOpen={true}>
                        <DropdownToggle color="info" caret>
                            {this.props.view_subject ? this.props.view_subject : "Subjects"}
                        </DropdownToggle>
                        <DropdownMenu>
                            {this.props.student.view_student.sdata.grades.map((subject, index) => {
                                return (
                                    <DropdownItem key={`subject.title${index}`} id="view_subject" onClick={this.handleInputChange} value={subject.title}>{subject.title}
                                    </DropdownItem>
                                )
                            })}
                        </DropdownMenu>
                    </Dropdown>
                    {/* <Link to="/print-chart-rc" key={this.props.student._id} onClick={this.props.viewStudentRC} id={this.props.student._id}>Report card</Link> */}
                </div>
                {
                    this.props.student.view_student.sdata.grades.map((subject, index) => subject.title === this.state.view_subject && subject.assignments ? (
                        <div style={{height:200}}className="table-responsive" key={`${subject.title}${index}`}>
                            <Link to="/print-chart" style={{ width: "100%", display: "block", textAlign: "center" }} key={this.props.student._id} name={subject.title} onClick={this.props.viewStudent} id={this.props.student._id}>Spreadsheet</Link>
                            <Table className="table">
                                <thead>
                                    <tr>
                                        <th style={{ padding: 0 }}>Assignment</th>
                                        <th style={{ padding: 0 }}>November grade</th>
                                        <th style={{ padding: 0 }}> May grade</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {subject.assignments.map((assignment, index) =>
                                        <tr key={`${assignment._id}${index}`}>
                                            <td>{assignment.title}</td>
                                            <td>
                                                <Alert color="info">November grade: {assignment.gradeN}</Alert>
                                                <ButtonGroup>
                                                    <Button color="info" onClick={this.gradeStudentN} id={this.props.student._id} subject={subject.title} type="button" name={assignment.title} value={"L"} >L</Button>
                                                    <Button color="info" onClick={this.gradeStudentN} id={this.props.student._id} subject={subject.title} type="button" name={assignment.title} value={"P"}>P</Button>
                                                    <Button color="info" onClick={this.gradeStudentN} id={this.props.student._id} subject={subject.title} type="button" name={assignment.title} value={"M"}>M</Button>
                                                </ButtonGroup>
                                            </td>
                                            <td>
                                                <Alert color="info">May grade: {assignment.gradeM}</Alert>
                                                <ButtonGroup>
                                                    <Button color="info" onClick={this.gradeStudentM} id={this.props.student._id} subject={subject.title} type="button" name={assignment.title} value={"L"} >L</Button>
                                                    <Button color="info" onClick={this.gradeStudentM} id={this.props.student._id} subject={subject.title} type="button" name={assignment.title} value={"P"}>P</Button>
                                                    <Button color="info" onClick={this.gradeStudentM} id={this.props.student._id} subject={subject.title} type="button" name={assignment.title} value={"M"}>M</Button>
                                                </ButtonGroup>
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </Table>
                        </div>
                    ) : null
                    )
                }
            </>
            : null
        )
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
)(ViewStudentGrades);