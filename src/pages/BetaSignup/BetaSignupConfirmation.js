import React from "react";
import { Link } from "react-router-dom";
import classes from "./BetaSignup.module.css";

import Content from "hoc/Content/Content";

const BetaSignupConfirmation = () => {
  return (
    <Content withNav>
      <div className={classes.confirmation}>
        <p style={{ textAlign: "center" }}>
          Thank you for letting us know, we will be in contact shortly!
        </p>
        <Link to="/">Back to homepage</Link>
      </div>
    </Content>
  );
};

export default BetaSignupConfirmation;
