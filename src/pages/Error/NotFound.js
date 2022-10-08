import React from "react";
import classes from "./Error.module.css";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className={classes.error}>
      <h1 className={classes.errorTitle}>Page not Found</h1>
      <p className={classes.errorDescription}>
        The page you are trying to visit doesn't exist
      </p>
      <Link to="/" className={classes.redirectLink}>
        Back go home page
      </Link>
    </div>
  );
};

export default NotFound;
