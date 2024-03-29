import React from "react";
import classes from "./Input.module.css";

const Input = (props) => {
  const warning = props.warning ? (
    <label className={classes.warning}>{props.warning}</label>
  ) : null;

  let classArray = [classes.input];
  props.round && classArray.push(classes.round);

  if (props.size === "large") {
    classArray.push(classes.large);
  } else if (props.size === "medium") {
    classArray.push(classes.medium);
  } else if (props.size === "small") {
    classArray.push(classes.small);
  } else {
    classArray.push(classes.medium);
  }

  return (
    <div className={classes.inputWrapper} type={props.type}>
      {props.label && <p className={classes.label}>{props.label}</p>}
      <input
        className={classArray.join(" ")}
        autoFocus={props.autoFocus}
        autoComplete={props.autoComplete || "on"}
        onChange={props.changed}
        onClick={props.clicked}
        type={props.type}
        value={props.value}
        name={props.inputName}
        placeholder={props.placeholder}
        disabled={props.disabled}
      />
      {warning}
    </div>
  );
};

export default Input;
