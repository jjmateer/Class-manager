import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { clearErrors } from "../actions/error-actions";
import { loadUser } from "../actions/auth-actions";
import { createCurriculum, getSubjects, addAssignment, deleteSubject } from "../actions/curriculum-actions";
import AddAssignment from "../Components/curriculum-components/add-assignment-form";
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button
} from 'reactstrap';
import CreateCirriculum from "../Components/curriculum-components/create-curriculum-form";



class Curriculum extends Component {
    state = {
        title: "",
        titleAdd: ""
    };
    static propTypes = {
        isAuthenticated: PropTypes.bool,
        error: PropTypes.object.isRequired,
        loadUser: PropTypes.func.isRequired,
        clearErrors: PropTypes.func.isRequired,
        createCurriculum: PropTypes.func.isRequired,
        getSubjects: PropTypes.func.isRequired,
        curriculum: PropTypes.object.isRequired,
        addAssignment: PropTypes.func.isRequired,
        deleteSubject: PropTypes.func.isRequired
    }
    componentDidMount = () => {
        this.props.clearErrors();
        this.props.getSubjects();
    }
    handleInputChange = event => {
        this.setState({ [event.target.id]: event.target.value });
    };

    createCurriculum = event => {
        event.preventDefault();
        this.props.createCurriculum(this.state.title);
        this.props.getSubjects();
    }

    addAssignment = event => {
        event.preventDefault();
        this.props.addAssignment(event.target.id, this.state.titleAdd)
        this.props.getSubjects();
    }

    deleteSubject = event => {
        event.preventDefault();
        this.props.deleteSubject(event.target.id)
        this.props.getSubjects();
    }

    render() {
        const { subjects } = this.props.curriculum;
        return (
            <>
                <h1 className="page-header">Curriculum</h1>
                <CreateCirriculum
                    createCurriculum={this.createCurriculum}
                    handleInputChange={this.handleInputChange}
                    error={this.props.error}
                />
                {subjects.length >= 1 ?

                    subjects.map((subject) => (
                        <Card key={subject._id}>
                            <CardBody>
                                <CardTitle>{subject.title}</CardTitle>
                                <Button id={subject._id}>View</Button>
                                <AddAssignment
                                    title={subject.title}
                                    addAssignment={this.addAssignment}
                                    handleInputChange={this.handleInputChange}
                                />
                                <Button id={subject._id} onClick={this.deleteSubject}>Delete</Button>
                            </CardBody>
                        </Card>
                    ))

                    : null}
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
    { clearErrors, loadUser, createCurriculum, getSubjects, addAssignment, deleteSubject }
)(Curriculum);