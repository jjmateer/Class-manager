import React, { Component } from "react";
import './App.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navigation from "./Components/nav";
import Home from "./pages/home";
import Register from "./Components/auth/Register";
import { connect } from "react-redux";
import { loadUser, loginAdmin } from "./actions/auth-actions";
import { clearErrors } from "./actions/error-actions";

class App extends Component {
  state = {
    user: "",
    password: ""
  };
  componentDidMount() {
    clearErrors();
    if (localStorage.getItem("token")) {
      loadUser(this.props.auth.token);
    }
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
        <div>
          <Navigation handleInputChange={this.handleInputChange} loginSubmit={this.loginSubmit} />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/register" component={Register} />
            {/* <Route component={ErrorC} /> */}
          </Switch>
        </div>
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
