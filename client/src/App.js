import React, { Component } from "react";
import './App.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import store from "./store.js";
import Navigation from "./Components/nav";
import Home from "./pages/home";
import Register from "./Components/auth/Register";
import { connect } from "react-redux";
import { loadUser } from "./actions/auth-actions";
import { clearErrors } from "./actions/error-actions";

class App extends Component {
  state = {
    username: "",
    password: ""
  };
  componentDidMount() {
    clearErrors();
    if(localStorage.getItem("token")) {
      loadUser(this.props.auth.token);
    }
  }
  render() {
    return (
        <Router>
          <div>
            <Navigation/>
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
export default connect( mapStateToProps,
  { clearErrors, loadUser }
)(App);
