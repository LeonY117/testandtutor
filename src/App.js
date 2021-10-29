import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import Cookies from "js-cookie";
import Layout from "hoc/Layout/Layout";

import Landing from "pages/Landing/Landing";
import User from "pages/User/User";
import Login from "pages/Login/Login";
import Logout from "pages/Logout/Logout";
import Signup from "pages/Signup/Signup";
import SelectTest from "pages/SelectTest/SelectTest";
import TestPaper from "pages/TestPaper/TestPaper";
// import axios from "./axios";

class App extends Component {
  constructor() {
    super();
    
    if (Cookies.get("loginExpires")) {
      this.state = { loggedIn: true };
    } else {
      this.state = { loggedIn: false };
    }
  }

  loginSuccessHandler = (id) => {
    // console.log(this.state.loggedIn);
    // Cookies.set("userId", id, { expires: (1 / 1440) * 0.5 });

    this.setState({
      loggedIn: true,
    });
  };

  logoutHandler = () => {
    Cookies.remove("userId");
    Cookies.remove("refreshToken");
    this.setState({
      loggedIn: false,
    });
  };

  sessionExpired = () => {
    this.setState({ loggedIn: false });
  };

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
