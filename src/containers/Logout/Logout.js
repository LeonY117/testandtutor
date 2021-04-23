import Cookies from "js-cookie";
import React, { Component } from "react";
import { Redirect } from "react-router-dom";

import axios from "../../axios";
import Loading from "../../components/Loading/Loading";

class Logout extends Component {
  state = { userId: Cookies.get("userId"), loggedOut: false };
  componentDidMount() {
    const postData = { data: { userId: this.state.userId } };
    console.log(postData);
    axios.post("auth/logout", postData).then((response) => {
      console.log(response);
      if (response.data.hasOwnProperty("error")) {
        console.log("error");
      } else {
        this.props.loggedOut();
        this.setState({ loggedOut: true });
      }
    });
  }
  render() {
    let logout = <Loading />;
    if (this.state.loggedOut) {
      logout = <Redirect from="/logout" to="/" />;
    }
    return <div>{logout}</div>;
  }
}

export default Logout;
