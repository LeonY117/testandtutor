import React from "react";
import classes from "./Toolbar.module.css";
import Logo from "../../Logo/Logo";
import NavigationItems from "../NavigationItems/NavigationItems";

const toolbar = (props) => {
  return (
    <header className={classes.Toolbar}>
      <div className={classes.NavLogo}>
        <a href="/">
          <Logo color='black'/>
        </a>
      </div>
      <NavigationItems />
    </header>
  );
};

export default toolbar;
