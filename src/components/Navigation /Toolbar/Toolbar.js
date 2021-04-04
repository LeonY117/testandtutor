import React from "react";
import classes from "./Toolbar.module.css";
import Logo from "../../Logo/Logo";
import NavigationItems from "../NavigationItems/NavigationItems";
import { Link } from "react-router-dom";

const toolbar = (props) => {
  return (
    <header className={classes.Toolbar}>
      <div className={classes.NavLogo}>
        <Link to="/">
          <Logo color="black" />
        </Link>
      </div>
      <NavigationItems />
    </header>
  );
};

export default toolbar;
