import React, { useContext } from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import Layout from "hoc/Layout/Layout";

import Landing from "pages/Landing/Landing";
import Dashboard from "pages/Dashboard/Dashboard";
import Login from "pages/Login/Login";
import Logout from "pages/Logout/Logout";
import Signup from "pages/Signup/Signup";
import SelectTest from "pages/SelectTest/SelectTest";
import TestPaper from "pages/TestPaper/TestPaper";
// import axios from "./axios";

import AuthContext from "./store/auth-context";

function App() {
  const authCtx = useContext(AuthContext);
  const userIsLoggedIn = authCtx.isLoggedIn;

  let redirectFromLogin = null;
  // shouldn't be ever clicked as there are no login links availble once user logs in
  if (userIsLoggedIn) {
    redirectFromLogin = <Redirect from="/login" to="/user/profile" />;
  }
  let redirectFromUser = null;
  if (userIsLoggedIn === false) {
    redirectFromUser = <Redirect from="/user" to="/login" />;
  }
  return (
    <Layout mode={userIsLoggedIn ? "user" : "visitor"}>
      <Switch>
        {redirectFromUser}
        {redirectFromLogin}
        <Route path="/" exact component={Landing} />
        <Route path="/login" render={(props) => <Login {...props} />} />
        <Route path="/signup" render={(props) => <Signup {...props} />} />
        <Route
          exact
          path="/user/test"
          render={(props) => <SelectTest {...props} />}
        />
        <Route
          exact
          path="/user/test/:id"
          render={(props) => <TestPaper {...props} />}
        />
        <Route path="/user" render={(props) => <Dashboard {...props} />} />

        <Route path="/logout" render={(props) => <Logout {...props} />} />
      </Switch>
    </Layout>
  );
}

export default App;
