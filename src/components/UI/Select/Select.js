import React from "react";
import classes from "./Select.module.css";

const customSelect = (props) => {
  let options = null;
  if (props.options) {
    options = props.options.map((op) => (
      <option key={op} value={op}>
        {op}
      </option>
    ));
  }
  return (
    <div className={classes.customSelect}>
      <select onChange={props.changed}>{options}</select>
      <span className={classes.customArrow}></span>
    </div>
  );
};

export default customSelect;
