import React from "react";
import classes from "./Input.module.css";

const inputComponent = (props) => {
  // TODO: add custom checkbox
  const warning = props.warning ? (
    <label className={classes.warning}>{props.warning}</label>
  ) : null;

  return (
    <div className={classes.inputComponent} type={props.type}>
      {props.inputName && (
        <p className={classes.inputName}>{props.inputName}</p>
      )}
      <input
        className={classes.input}
        type={props.type}
        value={props.value}
        onChange={props.changed}
        name={props.inputName}
        autoFocus={props.autoFocus}
        autoComplete={props.autoComplete || "on"}
        placeholder={props.placeholder}
        onClick={props.clicked}
      />
      {warning}
    </div>
  );
};

export default inputComponent;
