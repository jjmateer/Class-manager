import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { clearErrors } from "../actions/error-actions";
import { loadUser } from "../actions/auth-actions";
import { Spinner } from "reactstrap"



class Curriculum extends Component {
    state = {

    };
    static propTypes = {
        isAuthenticated: PropTypes.bool,
        error: PropTypes.object.isRequired,
        loadUser: PropTypes.func.isRequired,
        clearErrors: PropTypes.func.isRequired,
    }
    componentDidMount = () => {
        this.props.clearErrors();
    }
    handleInputChange = event => {
        this.setState({ [event.target.id]: event.target.value });
    };

    render() {
        return (
            <>
                <h1 className="page-header">Curriculum</h1>
            
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
    { clearErrors, loadUser }
)(Curriculum);