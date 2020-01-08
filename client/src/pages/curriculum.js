import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { clearErrors } from "../actions/error-actions";
import { loadUser } from "../actions/auth-actions";
import {
    createCurriculum,
    getSubjects,
    addAssignment,
    deleteSubject,
    viewSubject,
    deleteAssignment
} from "../actions/curriculum-actions";
import { getStudents, viewStudent } from "../actions/student-actions";
import AddAssignment from "../Components/curriculum-components/add-assignment-form";
import {
    Card, CardBody,
    CardTitle, ButtonGroup, Spinner
} from 'reactstrap';
import CreateCirriculum from "../Components/curriculum-components/create-curriculum-form";
import ViewSubject from "../Components/curriculum-components/view-subject-modal";
import VerifyDeleteModal from "../Components/curriculum-components/verify-delete-modal";



class Curriculum extends Component {
    state = {
        title: "",
        titleAdd: ""
    };
    static propTypes = {
        isAuthenticated: PropTypes.bool,
        error: PropTypes.object.isRequired,
        loadUser: PropTypes.func.isRequired,
        student: PropTypes.object.isRequired,
        clearErrors: PropTypes.func.isRequired,
        createCurriculum: PropTypes.func.isRequired,
        getSubjects: PropTypes.func.isRequired,
        curriculum: PropTypes.object.isRequired,
        deleteAssignment: PropTypes.func.isRequired,
        addAssignment: PropTypes.func.isRequired,
        deleteSubject: PropTypes.func.isRequired,
        getStudents: PropTypes.func.isRequired,
        viewStudent: PropTypes.func.isRequired
    }
    componentDidMount = () => {
        this.props.clearErrors();
        this.props.getSubjects();
    }

    getSubjectsAndUpdate = () => {
        setTimeout(
            function () {
                this.props.getSubjects();
                this.forceUpdate();
            }
                .bind(this),
            10
        );
    }
    handleInputChange = event => {
        this.setState({ [event.target.id]: event.target.value });
    };

    createCurriculum = event => {
        event.preventDefault();
        this.props.createCurriculum(this.state.title);
        this.getSubjectsAndUpdate();
        console.log(`Adding subject: ${this.state.title}`)

    }

    addAssignment = event => {
        event.preventDefault();
        this.props.addAssignment(event.target.id, this.state.titleAdd)
        this.getSubjectsAndUpdate();
    }

    deleteSubject = event => {
        event.preventDefault();
        this.props.deleteSubject(event.target.id, event.target.value)
        this.getSubjectsAndUpdate();
    }

    deleteAssignment = event => {
        event.preventDefault();
        this.props.deleteAssignment(event.target.id, event.target.name);
        this.getSubjectsAndUpdate();
    }

    viewSubject = event => {
        event.preventDefault();
        this.props.viewSubject(event.target.id);
        this.props.history.push("/print-chart-all");
    }

    render() {
        const { subjects } = this.props.curriculum;
        return (
            <>
                <h1 className="page-header" style={{ marginBottom: 100 }}>Subjects</h1>
                <CreateCirriculum
                    createCurriculum={this.createCurriculum}
                    handleInputChange={this.handleInputChange}
                    error={this.props.error}
                />
                {!this.props.curriculum.isLoading ?
                    <>
                        {subjects.length ?

                            subjects.map((subject, index) => (
                                <Card key={`${subject._id}${index}`}>
                                    <CardBody>
                                        <CardTitle>{subject.title}</CardTitle>
                                        <ButtonGroup style={{ float: "right" }}>
                                            <ViewSubject
                                                subjectinfo={subject}
                                                getSubjects={this.props.getSubjects}
                                                viewStudent={this.props.viewStudent}
                                                student={this.props.student}
                                                subjecttitle={subject.title}
                                                subjectinfo={subject}
                                                viewSubject={this.viewSubject}
                                                deleteAssignment={this.deleteAssignment}
                                            />
                                            <AddAssignment
                                                title={subject.title}
                                                addAssignment={this.addAssignment}
                                                handleInputChange={this.handleInputChange}
                                                subjectinfo={subject}
                                            />
                                            <VerifyDeleteModal
                                                subject={subject}
                                                deleteSubject={this.deleteSubject}
                                            />
                                        </ButtonGroup>
                                    </CardBody>
                                </Card>
                            ))

                            : null}
                    </>
                    : <div style={{ margin: "auto", width: 50 }}><Spinner type="grow" color="primary" /></div>}
            </>
        );
    }
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    user: state.auth.user,
    auth: state.auth,
    curriculum: state.curriculum,
    student: state.student,
    error: state.error
})

export default connect(
    mapStateToProps,
    {
        clearErrors,
        loadUser,
        createCurriculum,
        getSubjects,
        addAssignment,
        deleteSubject,
        getStudents,
        viewStudent,
        viewSubject,
        deleteAssignment
    }
)(Curriculum);