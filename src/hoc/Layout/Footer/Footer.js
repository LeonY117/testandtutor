import React from "react";
import classes from "./Footer.module.css";

import Logo from "components/Logo/Logo";
import FooterItems from "./FooterItems/FooterItems";

const Footer = (props) => {
  let footer = null;
  if (props.mode === "user") {
    footer = null;
  } else if (props.mode === "visitor") {
    footer = (
      <div className={classes.Footer}>
        <div className={classes.FooterLogo}>
          <Logo color={"white"} />
        </div>
        <FooterItems className={classes.FooterItems} />
      </div>
    );
  }

  return <React.Fragment>{footer}</React.Fragment>;
};

export default Footer;
