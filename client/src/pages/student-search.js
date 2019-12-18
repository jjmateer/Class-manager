import React, { Component } from "react";
import StudentTable from "../Components/tables/student-table"
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { clearErrors } from "../actions/error-actions";
import { loadUser } from "../actions/auth-actions";



class StudentSearch extends Component {

    static propTypes = {
        isAuthenticated: PropTypes.bool,
        error: PropTypes.object.isRequired,
        loadUser: PropTypes.func.isRequired,
        clearErrors: PropTypes.func.isRequired
    }

    render() {
        return (
            <>
                {this.props.auth.token ? <h1>LOGGED IN</h1> : <h1>LOGGED OUT</h1>}
                <StudentTable/>
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