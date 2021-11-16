import classes from "./Card.module.css";
import React from "react";

const Card = (props) => {
  let classArray = [classes.card];
  if (props.pageWrapper) {
    classArray.push(classes.pageWrapper);
  }
  return <div className={classArray.join(" ")}>{props.children}</div>;
};

export default Card;
