import React, { useState, useEffect, useCallback } from "react";

import Cookies from "js-cookie";
// what is needed in the backend to authenticate
// is there a need to keep userID for edge cases / compatibility?
// what happends when refresh token expires?

// does backend delete front end cookies? YES

let logoutTimer;

const AuthContext = React.createContext({
  isLoggedIn: false,
  login: () => {},
  logout: () => {},
});

const retrieveCookies = () => {
  console.log("retrieving cookies");
  const loginExpireTime = Cookies.get("loginExpires") || 0;
  // add other cookies here in future

  const loginExpireAge = computeExpireAge(loginExpireTime);
  // delete cookies if they will expire within 1 min
  if (loginExpireAge <= 60000) {
    // localStorage.removeItem("loginExpires");
    return null;
  }
  return {
    loginExpireTime: loginExpireTime,
    // return value of other cookies here
  };
};

const computeExpireAge = (expireTime) => {
  return expireTime - new Date().getTime();
};

export const AuthContextProvider = (props) => {
  const [userIsLoggedIn, setUserIsLoggedIn] = useState(false);

  const logoutHandler = useCallback(() => {
    // removes cookies (may be redundant since backend already removes it)
    console.log("logging user out");
    Cookies.remove("loginExpires");
    setUserIsLoggedIn(false);
    // clean local states
    // userIsLoggedIn = false;
    // clear timer
    if (logoutTimer) {
      clearTimeout(logoutTimer);
    }
  }, []);

  const loginHandler = () => {
    const loginExpireTime = Cookies.get("loginExpires") || 0;
    if (loginExpireTime) {
      setUserIsLoggedIn(true);
    }
    const loginExpireAge = computeExpireAge(loginExpireTime);
    logoutTimer = setTimeout(logoutHandler, loginExpireAge);
    // userIsLoggedIn = true;
  };

  // this code is ran in the first render cycle BEFORE component
  // renders, this way userIsLoggedIn is allowed to be true BEFORE
  // rendering other components that depend on the loggin status, 
  // and problems like redirecting to login and back to user is
  // avoided
  const cookieData = retrieveCookies();
  if (cookieData && !userIsLoggedIn) {
    setUserIsLoggedIn(true);
  }

  useEffect(() => {
    // runs whenever the app gets refreshed
    if (cookieData) {
      logoutTimer = setTimeout(
        logoutHandler,
        computeExpireAge(cookieData.loginExpireTime)
      );
    }
  }, [cookieData, logoutHandler]);

  const contextValue = {
    isLoggedIn: userIsLoggedIn,
    login: loginHandler,
    logout: logoutHandler,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
