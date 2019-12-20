import React, { Component } from "react";
import './App.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navigation from "./Components/nav";
import Home from "./pages/home";
import Register from "./pages/Register";
import { connect } from "react-redux";
import { loadUser, loginAdmin } from "./actions/auth-actions";
import { clearErrors } from "./actions/error-actions";
import StudentSearch from "./pages/students";
import PropTypes from "prop-types";
import PrivateRoute from "./Components/routing-components/private-route";
import PublicRoute from "./Components/routing-components/public-route";
import Curriculum from "./pages/curriculum";

class App extends Component {
  state = {
    user: "",
    password: ""
  };
  static propTypes = {
    isAuthenticated: PropTypes.bool,
    error: PropTypes.object.isRequired,
    loadUser: PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired
  }
  componentDidMount() {
    this.props.loadUser();
  }
  handleInputChange = event => {
    this.setState({ [event.target.id]: event.target.value });
  };
  loginSubmit = event => {
    event.preventDefault();
    const userData = {
      user: this.state.user,
      password: this.state.password
    };

    this.props.loginAdmin(userData);
  };
  render() {
    return (
      <Router>
        <>
          <Navigation handleInputChange={this.handleInputChange}
            loginSubmit={this.loginSubmit}
            clearErrors={this.props.clearErrors}
            user={this.props.auth.user}
            isAuthenticated={this.props.isAuthenticated}
            isLoading={this.props.auth.isLoading}
          />
          <Switch>
            <PublicRoute exact path="/" component={Home} />
            <PublicRoute exact path="/register" component={Register} />
            <PrivateRoute exact path="/students" component={StudentSearch} />
            <Route exact path="/curriculum" component={Curriculum} />
            {/* <Route component={ErrorC} /> */}
          </Switch>
        </>
      </Router>
    );
  }
}
const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  auth: state.auth,
  error: state.error
})
export default connect(mapStateToProps,
  { clearErrors, loginAdmin, loadUser }
)(App);
