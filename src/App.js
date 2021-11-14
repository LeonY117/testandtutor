import React, { useContext } from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import Layout from "hoc/Layout/Layout";

import Landing from "pages/Landing/Landing";
import Dashboard from "pages/Dashboard/Dashboard";
import Login from "pages/Login/Login";
import Logout from "pages/Logout/Logout";
import Signup from "pages/Signup/Signup";
import Settings from "pages/Settings/Settings";
import SelectTest from "pages/SelectTest/SelectTest";
import TestPaper from "pages/TestPaper/TestPaper";
import TestSubmitConfirm from "pages/TestSubmitConfirm/TestSubmitConfirm";
import NotFound from "pages/Error/NotFound";

import AuthContext from "./store/auth-context";

function App() {
  const authCtx = useContext(AuthContext);
  const userIsLoggedIn = authCtx.isLoggedIn;

  let redirectFromLogin = null;
  if (userIsLoggedIn) {
    redirectFromLogin = <Redirect from="/login" to="/user" />;
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
        <Route exact path="/" component={Landing} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/user/test" component={SelectTest} />
        <Route exact path="/user/test/:id" component={TestPaper} />
        <Route exact path="/user/testSubmitted" component={TestSubmitConfirm} />
        <Route exact path="/user" component={Dashboard} />
        <Route exact path="/user/settings" component={Settings} />
        <Route exact path="/logout" component={Logout} />
        <Route path="/" component={NotFound} />
      </Switch>
    </Layout>
  );
}

export default App;
