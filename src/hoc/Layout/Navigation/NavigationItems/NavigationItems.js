import React from "react";
import { NavLink } from "react-router-dom";
import classes from "./NavigationItems.module.css";

import NavigationItem from "./NavigationItem/NavigationItem";

const navigationItems = (props) => {
  let nav = (
    <ul className={classes.navigationItems}>
      <li className={classes.navigationItem}>
        <NavLink to="/login" className={classes.loginLink}>
          Sign in
        </NavLink>
      </li>
      <li className={classes.navigationItem}>
        <NavLink to="/signup" className={classes.getStartedLink}>
          Get started
        </NavLink>
      </li>
    </ul>
  );
  if (props.mode === "user") {
    nav = (
      <ul className={classes.navigationItems}>
        <NavigationItem link="/user">Dashboard</NavigationItem>
        <NavigationItem link="/user/test">Take test</NavigationItem>
        <NavigationItem link="/logout">Log out</NavigationItem>
      </ul>
    );
  }
  return <div>{nav}</div>;
};

export default navigationItems;
