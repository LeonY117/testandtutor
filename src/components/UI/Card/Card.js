import classes from "./Card.module.css";
import React from "react";

const Card = (props) => {
  let classArray = [classes.card];
  if (props.pageWrapper) {
    classArray.push(classes.pageWrapper);
  }
  if (props.blurShadow) {
    classArray.push(classes.blurShadow);
  }
  if (props.round) {
    classArray.push(classes.round);
  }
  return <div className={classArray.join(" ")}>{props.children}</div>;
};

export default Card;
