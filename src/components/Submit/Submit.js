import React from "react";
import classes from "./Submit.module.css";

const submit = (props) => {
  let buttonClass = [classes.Submit, classes.Blue].join(" ");
  return (
    <input
      type="submit"
      onClick={() => {
        console.log("clicked");
      }}
      value={props.children}
      className={buttonClass}
    />
  );
};

export default submit;
