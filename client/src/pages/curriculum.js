import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { clearErrors } from "../actions/error-actions";
import { loadUser } from "../actions/auth-actions";
import { createCurriculum } from "../actions/curriculum-actions";
import { Spinner, Button } from "reactstrap";
import CreateCirriculum from "../Components/curriculum-components/create-curriculum-form";



class Curriculum extends Component {
    state = {
        title:""
    };
    static propTypes = {
        isAuthenticated: PropTypes.bool,
        error: PropTypes.object.isRequired,
        loadUser: PropTypes.func.isRequired,
        clearErrors: PropTypes.func.isRequired,
        createCurriculum: PropTypes.func.isRequired
    }
    componentDidMount = () => {
        this.props.clearErrors();
    }
    handleInputChange = event => {
        this.setState({ [event.target.id]: event.target.value });
    };
    createCurriculum = event => {
        event.preventDefault();
        console.log('firing')
        this.props.createCurriculum(this.state.title);
    }

    render() {
        return (
            <>
                <h1 className="page-header">Curriculum</h1>
                <CreateCirriculum
                    createCurriculum={this.createCurriculum}
                    handleInputChange={this.handleInputChange}
                    error={this.props.error}
                />
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
    { clearErrors, loadUser, createCurriculum }
)(Curriculum);