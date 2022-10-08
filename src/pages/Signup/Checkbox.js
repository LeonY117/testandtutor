import React from "react";

import classes from "./Checkbox.module.css";

const Checkbox = (props) => {
  return (
    <label
      className={classes.checkboxControl}
      style={{ fontSize: `${props.fontSize}rem` }}
    >
      <input
        className={classes.checkbox}
        type="checkbox"
        onChange={props.clicked}
        checked={props.checked}
      />
      {props.children}
    </label>
  );
};

export default Checkbox;
