import React, { useEffect, useContext } from "react";
import { Redirect } from "react-router-dom";

import axios from "store/axios";
import AuthContext from "store/auth-context";
import Loading from "components/Loading/Loading";

const Logout = () => {
  const authCtx = useContext(AuthContext);
  useEffect(() => {
    axios.post("auth/logout", {}).then((response) => {
      console.log(response);
      if (response.data.hasOwnProperty("error")) {
        console.log("error");
        authCtx.logout();
      } else {
        authCtx.logout();
      }
    });
  });
  return (
    <div>
      {authCtx.isLoggedIn && <Loading />}
      {!authCtx.isLoggedIn && <Redirect from="/logout" to="/" />}
    </div>
  );
};

export default Logout;
