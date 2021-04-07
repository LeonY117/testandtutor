import React, { Component } from "react";

class testPaper extends Component {
  state = { paperId: null };
  componentDidMount() {
    console.log(this.props);
    // this.setState({ paperID: this.props.match.params.paperId });
  }
  render() {
    return <div>Placeholder for paper with ID: {this.props.match.params.id}</div>;
  }
}

export default testPaper;
