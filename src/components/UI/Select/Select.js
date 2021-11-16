import React from "react";
import classes from "./Select.module.css";

const Select = (props) => {
  let classArray = [classes.select];

  if (props.round) {
    classArray.push(classes.round);
  }

  let options = null;
  if (props.options) {
    options = props.options.map((op, i) => (
      <option className={classes.option} key={i} value={op}>
        {op}
      </option>
    ));
  }
  return (
    <div className={classes.selectWrapper}>
      <select className={classArray.join(' ')} onChange={props.changed}>
        {options}
      </select>
      <span className={classes.customArrow}></span>
    </div>
  );
};

export default Select;
