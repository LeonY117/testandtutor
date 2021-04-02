import React, { Component } from "react";
import Layout from "./hoc/Layout/Layout";
import Landing from "./components/Landing/Landing";
import User from "./containers/User/User";

class App extends Component {
  render() {
    return (
      <Layout>
        <User />
        {/* <Landing /> */}
      </Layout>
    );
  }
}

export default App;
