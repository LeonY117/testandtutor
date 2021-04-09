import React from "react";
import Aux from "../Aux";
import Toolbar from "../../components/Navigation /Toolbar/Toolbar";
import Footer from "../../components/Footer/Footer";
import classes from "./Layout.module.css";

const layout = (props) => {
  return (
    <Aux>
      <Toolbar mode={props.mode} />
      <main className={classes.Content}>{props.children}</main>
      <Footer />
    </Aux>
  );
};

export default layout;
