import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { clearErrors } from "../actions/error-actions";
import { loadUser } from "../actions/auth-actions";
import { createCurriculum, getSubjects, addAssignment } from "../actions/curriculum-actions";
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
        addAssignment: PropTypes.func.isRequired
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
        this.props.addAssignment(this.state.titleAdd)
    }

    render() {
        const { subjects } = this.props.curriculum;
        console.log(subjects)
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
                                addAssignment={this.props.addAssignment}
                                />
                                <Button id={subject._id}>Delete</Button>
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
    { clearErrors, loadUser, createCurriculum, getSubjects, addAssignment }
)(Curriculum);