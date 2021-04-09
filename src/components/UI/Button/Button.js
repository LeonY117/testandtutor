import React from "react";
import classes from "./Button.module.css";

const button = (props) => {
  let buttonClass = [classes.Button, classes.Blue].join(" ");
  if (props.color === "white") {
    buttonClass = [classes.Button, classes.White].join(" ");
  } else if (props.color === "orange") {
    buttonClass = [classes.Button, classes.Orange].join(" ");
  }

  if (props.round) {
    buttonClass += [buttonClass, classes.Round].join(" ")
  }
  
  return (
    <button className={buttonClass} onClick={props.clicked}>
      {props.children}
    </button>
  );
};

export default button;
