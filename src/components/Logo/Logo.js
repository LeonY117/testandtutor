import React from "react";
import testAndTutorLogoBlack from "../../assets/images/logo_black.svg";
import testAndTutorLogoWhite from "../../assets/images/logo_white.svg";
import testAndTutorLogoBlue from "../../assets/images/logo_blue.svg";

import classes from "./Logo.module.css";

const logo = (props) => {
  let logosrc = testAndTutorLogoWhite;
  if (props.color === "black") {
    logosrc = testAndTutorLogoBlack;
  }
  if (props.color === "blue") {
    logosrc = testAndTutorLogoBlue;
  }
  return (
    <div className={classes.Logo}>
      <img src={logosrc} alt="burgerInc" draggable="false" />
    </div>
  );
};

export default logo;
