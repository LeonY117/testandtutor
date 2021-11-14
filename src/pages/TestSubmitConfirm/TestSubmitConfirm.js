import React from "react";
import { Link } from "react-router-dom";
import classes from "./TestSubmitConfirm.module.css";

const TestSubmitConfirm = () => {
  return (
    <div className={classes.testSubmitConfirm}>
      <h1>Test Completed</h1>
      <Link className={classes.feedback} to="#">
        Take some time to give us somefeedback?
      </Link>
      <Link className={classes.dashboardRedirect} to="/user">
        Back to dashboard
      </Link>
    </div>
  );
};

export default TestSubmitConfirm;
