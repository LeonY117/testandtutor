import React from "react";
import classes from "./Select.module.css";

const Select = (props) => {
  let classArray = [classes.select];
  let widthControlClasses = [classes.selectWrapper];
  let hideArrow = props.disabled ? "true" : "false";
  props.round && classArray.push(classes.round);
  props.narrow && widthControlClasses.push(classes.narrow);

  if (props.size === "large") {
    classArray.push(classes.large);
  } else if (props.size === "medium") {
    classArray.push(classes.medium);
  } else if (props.size === "small") {
    classArray.push(classes.small);
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
    <div className={widthControlClasses.join(" ")}>
      <select
        className={classArray.join(" ")}
        onChange={props.changed}
        value={props.selected}
        disabled={props.disabled}
      >
        {options}
      </select>
      <span className={classes.customArrow} hide={hideArrow} />
    </div>
  );
};

export default Select;
