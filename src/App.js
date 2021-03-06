import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import Cookies from "js-cookie";
import Layout from "./hoc/Layout/Layout";
import User from "./containers/User/User";
import Login from "./containers/Login/Login";
import Logout from "./containers/Logout/Logout";
import Signup from "./containers/Signup/Signup";
import SelectTest from "./containers/SelectTest/SelectTest";
import TestPaper from "./containers/TestPaper/TestPaper";
import Landing from "./components/Landing/Landing";
// import axios from "./axios";

class App extends Component {
  state = {
    loggedIn: false,
  };

  loginSuccessHandler = (id) => {
    // console.log(this.state.loggedIn);
    // Cookies.set("userId", id, { expires: (1 / 1440) * 0.5 });

    this.setState({
      loggedIn: true,
    });
  };

  logoutHandler = () => {
    Cookies.remove("userId");
    Cookies.remove("refreshToken")
    this.setState({
      loggedIn: false,
    });
  };

  sessionExpired = () => {
    this.setState({ loggedIn: false });
  };

  componentDidMount() {
    if (Cookies.get("userId") && Cookies.get("refreshToken")) {
      this.setState({ loggedIn: true });
    }
  }

  render() {
    let redirectFromLogin = null;
    // shouldn't be ever clicked as there are no login links availble once user logs in
    if (this.state.loggedIn) {
      redirectFromLogin = <Redirect from="/login" to="/user/profile" />;
    }
    let redirectFromUser = null;
    if (this.state.loggedIn === false) {
      redirectFromUser = <Redirect from="/user" to="/login" />;
    }
    return (
      <Layout mode={this.state.loggedIn ? "user" : "visitor"}>
        <Switch>
          {redirectFromUser}
          {redirectFromLogin}
          <Route path="/" exact component={Landing} />
          <Route
            path="/login"
            render={(props) => (
              <Login
                {...props}
                loginSuccessHandler={this.loginSuccessHandler}
              />
            )}
          />
          <Route
            path="/signup"
            render={(props) => (
              <Signup
                {...props}
                loginSuccessHandler={this.loginSuccessHandler}
              />
            )}
          />
          <Route
            exact
            path="/user/test"
            render={(props) => (
              <SelectTest {...props} expired={this.sessionExpired} />
            )}
          />
          <Route
            exact
            path="/user/test/:id"
            render={(props) => (
              <TestPaper {...props} expired={this.sessionExpired} />
            )}
          />
          <Route
            path="/user"
            render={(props) => (
              <User {...props} expired={this.sessionExpired} />
            )}
          />

          <Route
            path="/logout"
            render={(props) => (
              <Logout {...props} loggedOut={this.logoutHandler} />
            )}
          />
        </Switch>
      </Layout>
    );
  }
}

export default App;
