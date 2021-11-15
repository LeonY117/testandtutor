import React from "react";
import Toolbar from "./Navigation/Toolbar/Toolbar";
import Footer from "./Footer/Footer";
import classes from "./Layout.module.css";

const layout = (props) => {
  return (
    <React.Fragment>
      <Toolbar mode={props.mode} />
      <main className={classes.Content}>{props.children}</main>
      <Footer />
    </React.Fragment>
  );
};

export default layout;
