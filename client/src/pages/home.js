import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { clearErrors } from "../actions/error-actions";
import { loadUser } from "../actions/auth-actions";
import { Jumbotron, Button} from "reactstrap";


class Home extends Component {

    static propTypes = {
        isAuthenticated: PropTypes.bool,
        error: PropTypes.object.isRequired,
        loadUser: PropTypes.func.isRequired,
        clearErrors: PropTypes.func.isRequired,
        user: PropTypes.object
    }

    render() {
        return (
            <>
                <Jumbotron><h1 className="display-3">Hello, {this.props.user ? this.props.user.name : null}</h1>
                <hr className="my-10" />
                    <Button tag={Link} to="/students">View Students</Button>
                    <Button tag={Link}>Edit login info</Button>
                </Jumbotron>
                <div className="home-menu">

                </div>
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
)(Home);