import React from "react";
import Aux from "../../../hoc/Aux";

const userInfo = (props) => {
  return (
    <Aux>
      <h1>Hi! {props.username}</h1>
      <p>Course: {props.subject}</p>
      <p>Exam date: {props.date}</p>
    </Aux>
  );
};

export default userInfo;
