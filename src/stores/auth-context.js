import React, { useState, useEffect, useCallback } from "react";

// what is needed in the backend to authenticate
// is there a need to keep userID for edge cases / compatibility?
// what happends when refresh token expires?

// does backend delete front end cookies?

// should I branch?
// next step: i will refactor 
// make some tests
// test it ourselves
// Fin needs to: get stats thing working + get AWS working
// user testing

const AuthContext = React.createContext({
  isLoggedIn: false,
  login: () => {},
  logout: () => {},
});

export const AuthContextProvider = (props) => {
  const loginHandler = () => {
    //TODO
    return;
  };

  const logoutHandler = () => {
    //TODO
    return;
  };

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
