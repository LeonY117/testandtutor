import React, { Component } from "react";
import Layout from "./hoc/Layout/Layout";
import Landing from "./components/Landing/Landing";
import User from "./containers/User/User";
import { Route, Switch } from "react-router-dom";

class App extends Component {
  render() {
    return (
      <Layout>
        <Switch>
          <Route path="/" exact component={Landing} />
          <Route path="/user" component={User} />
        </Switch>
      </Layout>
    );
  }
}

export default App;
