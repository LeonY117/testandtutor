import React from "react";
import Logo from "../../../components/Logo/Logo";
import classes from "./Footer.module.css";
import FooterItems from "./FooterItems/FooterItems";

const footer = (props) => {
  return (
    <div className={classes.Footer}>
      <div className={classes.FooterLogo}>
        <Logo color={"white"} />
      </div>
      <FooterItems className={classes.FooterItems}/>
    </div>
  );
};

export default footer;
