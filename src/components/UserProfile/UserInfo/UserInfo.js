import classes from "./UserInfo.module.css";
import React from "react";
import Content from "../../../hoc/Content/Content";

const userInfo = (props) => {
  return (
    <Content>
      <div className={classes.UserInfo}>
        <h1>Hi {props.username}!</h1>
        <p>Course: {props.subject}</p>
        <p>Exam date: {props.date}</p>
      </div>
    </Content>
  );
};

export default userInfo;
