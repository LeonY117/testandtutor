import React from "react";
import { NavLink } from "react-router-dom";
import classes from "./NavigationItems.module.css";

const NavigationItem = (props) => {
  return (
    <li className={classes.navigationItem}>
      <NavLink to={props.link} onClick={props.clicked}>
        {props.children}
      </NavLink>
    </li>
  );
};

const navigationItems = (props) => {
  let nav = (
    <ul className={classes.navigationItems}>
      <li className={classes.navigationItem}>
        <NavLink
          to="/login"
          className={classes.loginLink}
          clicked={props.clicked}
        >
          Sign in
        </NavLink>
      </li>
      <li className={classes.navigationItem}>
        <NavLink
          to="/signup"
          className={classes.getStartedLink}
          clicked={props.clicked}
        >
          Get started
        </NavLink>
      </li>
    </ul>
  );
  if (props.mode === "user") {
    nav = (
      <ul
        className={[classes.navigationItems, classes.userNavigationItems].join(
          " "
        )}
      >
        <NavigationItem link="/user" clicked={props.clicked}>
          Dashboard
        </NavigationItem>
        <NavigationItem link="/user/test" clicked={props.clicked}>
          Take test
        </NavigationItem>
        <NavigationItem link="/user/settings" clicked={props.clicked}>
          Settings
        </NavigationItem>
        <NavigationItem link="/logout" clicked={props.clicked}>
          Logout
        </NavigationItem>
      </ul>
    );
  }
  return <div>{nav}</div>;
};

export default navigationItems;
