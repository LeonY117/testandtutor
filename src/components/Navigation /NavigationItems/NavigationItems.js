import React from "react";
import classes from "./NavigationItems.module.css";
import NavigationItem from "./NavigationItem/NavigationItem";

const navigationItems = (props) => (
  <ul className={classes.NavigationItems}>
    <NavigationItem link="/" active>
      Log in
    </NavigationItem>
    <NavigationItem link="/">Sign up</NavigationItem>
  </ul>
);

export default navigationItems;
