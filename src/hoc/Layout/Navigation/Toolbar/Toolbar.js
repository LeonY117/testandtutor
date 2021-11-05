import React from "react";
import { Link } from "react-router-dom";

import classes from "./Toolbar.module.css";

import Logo from "components/Logo/Logo";
import NavigationItems from "../NavigationItems/NavigationItems";

const toolbar = (props) => {
  return (
    <header className={classes.toolbar}>
      <div className={classes.navLogo}>
        <Link to="/">
          <Logo color="black" />
        </Link>
      </div>
      <div className={classes.navItems}>
        <NavigationItems mode={props.mode} />
      </div>
    </header>
  );
};

export default toolbar;
