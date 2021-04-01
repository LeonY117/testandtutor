import React, { Component } from "react";
import Layout from "./hoc/Layout/Layout";
import Landing from "./components/Landing/Landing";

class App extends Component {
  render() {
    return (
      <Layout>
        <Landing />
      </Layout>
    );
  }
}

export default App;
