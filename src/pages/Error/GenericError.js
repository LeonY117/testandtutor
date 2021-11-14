import React from "react";
import classes from "./Error.module.css";
import { Link } from "react-router-dom";

const GenericError = (error) => {
  return (
    <div className={classes.error}>
      <h1 className={classes.errorTitle}>Something went wrong</h1>
      <Link to="/" className={classes.redirectLink}>
        Back go home page
      </Link>
      <p className={classes.errorDescription}>
        Sorry about this! We are still in early stage development, and we'd
        really appreciate if you could report the error to us so we can fix it
        asap.
      </p>
      <p>form place holder</p>
    </div>
  );
};

export default GenericError;
