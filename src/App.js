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

import AuthContext from "./store/auth-context";

function App() {
  const authCtx = useContext(AuthContext);
  const userIsLoggedIn = authCtx.isLoggedIn;

  let redirectFromLogin = null;
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
        <Route path="/login" component={Login} />
        <Route path="/signup" componet={Signup} />
        <Route exact path="/user/test" component={SelectTest} />
        <Route exact path="/user/test/:id" component={TestPaper} />
        <Route path="/user" component={Dashboard} />
        <Route path="/logout" component={Logout} />
      </Switch>
    </Layout>
  );
}

export default App;
