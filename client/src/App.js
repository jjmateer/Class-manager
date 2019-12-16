import React, { Component, Fragment } from "react";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import { loadUser } from "./actions/auth-actions";
import PublicRoute from "./Components/routing-components/public-route";
// import PrivateRoute from "./Components/routing-components/private-route";
import Login from "./Components/auth/Login";
import Register from "./Components/auth/Register";
// import NoMatch from "./pages/NoMatch";
import store from "./store";
import './App.css';

class App extends Component {
  componentDidMount() {
    store.dispatch(loadUser());
  }
  render() {
    return (
      <Provider store={store}>
        <Router>
          <Fragment>
            <Switch>
              <PublicRoute exact path="/login" component={Login} />
              <PublicRoute exact path="/register" component={Register} />
              {/* <Route component={NoMatch} /> */}
            </Switch>
          </Fragment>
        </Router>
      </Provider>
    )
  }

}

export default App;
