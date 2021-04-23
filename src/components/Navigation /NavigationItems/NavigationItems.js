import React from "react";
import classes from "./NavigationItems.module.css";
import NavigationItem from "./NavigationItem/NavigationItem";

const navigationItems = (props) => {
  let nav = (
    <ul className={classes.NavigationItems}>
      <NavigationItem link="/login">Log in</NavigationItem>
      <NavigationItem link="/signup">Sign up</NavigationItem>
    </ul>
  );
  if (props.mode === "user") {
    console.log('user mode!')
    nav = (
      <ul className={classes.NavigationItems}>
        <NavigationItem link="/user">Dashboard</NavigationItem>
        <NavigationItem link="/user/test">Take test</NavigationItem>
        <NavigationItem link="/logout">Log out</NavigationItem>
      </ul>
    );
  }
  return <div>{nav}</div>;
};

export default navigationItems;
