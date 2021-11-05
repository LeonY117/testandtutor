import Cookies from "js-cookie";
import React, { useEffect, useContext } from "react";
import { Redirect } from "react-router-dom";

import axios from "../../store/axios";
import AuthContext from "../../store/auth-context";
import Loading from "../../components/Loading/Loading";

const Logout = () => {
  const authCtx = useContext(AuthContext);
  const userIsLoggedIn = authCtx.isLoggedIn;
  useEffect(() => {
    axios.post("auth/logout", {}).then((response) => {
      console.log(response);
      if (response.data.hasOwnProperty("error")) {
        console.log("error");
      } else {
        authCtx.logout();
      }
    });
  });
  let logout = <Loading />;
  if (!userIsLoggedIn) {
    logout = <Redirect from="/logout" to="/" />;
  }
  return <div>{logout}</div>;
};

export default Logout;
