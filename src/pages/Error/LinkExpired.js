import React from "react";
import classes from "./Error.module.css";
import { Link } from "react-router-dom";

const LinkExpired = () => {
  return (
    <div>
      <div className={classes.error}>
        <h1 className={classes.errorTitle}>Link Expired</h1>
        <Link to="/" className={classes.redirectLink}>
          Back go home page
        </Link>
      </div>
    </div>
  );
};

export default LinkExpired;
