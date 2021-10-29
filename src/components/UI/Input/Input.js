import React from "react";
import classes from "./Input.module.css";

const inputComponent = (props) => {
  let warning = null;
  if (props.warning) {
    warning = <p className={classes.Warning}>{props.warning}</p>;
  }
  return (
    <div className={classes.InputComponent}>
      <p className={classes.InputName}>{props.inputName}</p>
      <input
        type={props.type}
        value={props.value}
        className={classes.Input}
        onChange={props.changed}
        name={props.inputName}
      />
      {warning}
    </div>
  );
};

export default inputComponent;
