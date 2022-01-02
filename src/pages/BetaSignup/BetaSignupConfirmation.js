import React from "react";
import { Link } from "react-router-dom";
import classes from "./BetaSignup.module.css";

import Content from "hoc/Content/Content";

const BetaSignupConfirmation = () => {
  return (
    <Content withNav>
      <div className={classes.confirmation}>
        <h3>Thank you for signing up! </h3>
        <p style={{ textAlign: "center", lineHeight: "2rem" }}>
          You should receive a confirmation email soon with next steps on how to
          get your early access.
        </p>
        <Link to="/">Back to homepage</Link>
      </div>
    </Content>
  );
};

export default BetaSignupConfirmation;
