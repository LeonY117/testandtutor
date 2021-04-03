import classes from "./UserInfo.module.css";
import React from "react";

const userInfo = (props) => {
  return (
    <div className={classes.UserInfo}>
      <h1>Hi {props.username}!</h1>
      <p>Course: {props.subject}</p>
      <p>Exam date: {props.date}</p>
    </div>
  );
};

export default userInfo;
