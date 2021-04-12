import React, { Component } from "react";
import Layout from "./hoc/Layout/Layout";
import Landing from "./components/Landing/Landing";
import User from "./containers/User/User";
import Login from "./containers/Login/Login";
import Signup from "./containers/Signup/Signup";
import SelectTest from "./containers/SelectTest/SelectTest";
import TestPaper from "./containers/TestPaper/TestPaper";
// import axios from "./axios";
import { Route, Switch, Redirect } from "react-router-dom";

class App extends Component {
  state = {
    userId: null,
    accessToken: null,
    loggedIn: false,
    mode: "visitor",
  };

  loginSuccessHandler = (id, token) => {
    console.log(this.state.loggedIn);
    this.setState({
      userId: id,
      accessToken: token,
      loggedIn: true,
      mode: "user",
    });
    // console.log(this.state.userId, this.state.accessToken);
    console.log("logged in!");
  };

  render() {
    let redirectFromLogin = null;
    // shouldn't be ever clicked as there are no login links availble once user logs in
    if (this.state.loggedIn) {
      redirectFromLogin = <Redirect from="/login" to="/user" />;
    }
    let redirectFromUser = null;
    if (this.state.loggedIn === false) {
      redirectFromUser = <Redirect from="/user" to="/login" />;
    }
    return (
      <Layout mode={this.state.mode}>
        <Switch>
          {redirectFromLogin}
          {/* {redirectFromUser} */}
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
            exact
            path="/user/test"
            render={(props) => <SelectTest {...props} />}
          />
          <Route
            exact
            path="/user/test/:id"
            render={(props) => (
              <TestPaper
                {...props}
                userId={this.state.userId}
                accessToken={this.state.accessToken}
              />
            )}
          />
          <Route
            path="/user"
            render={(props) => (
              <User
                {...props}
                userId={this.state.userId}
                accessToken={this.state.accessToken}
              />
            )}
          />
          <Route path="/signup" component={Signup} />
        </Switch>
      </Layout>
    );
  }
}

export default App;
