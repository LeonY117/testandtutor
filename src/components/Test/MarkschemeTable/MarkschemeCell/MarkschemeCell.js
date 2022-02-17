import React from "react";
import classes from "./MarkschemeCell.module.css";

const MarkschemeCell = (props) => {
  if (props.max === 0) {
    console.log(props);
  }
  return (
    <div className={classes.Cell}>
      <div className={classes.labelWrapper}>
        <p
          className={classes.Label}
          blue={props.readOnly && props.readOnly.toString()}
        >
          {props.label}
        </p>
      </div>
      <div className={classes.InputWrapper}>
        <input
          type="number"
          // onChange={() => this.props.changed(props.marks)}
          className={classes.Input}
          onChange={props.changed}
          onFocus={(e) => {
            e.target.select();
          }}
          value={Number(props.value).toString() || 0}
          readOnly={props.readOnly}
        ></input>
        <span className={classes.Max}>/ {props.max}</span>
      </div>
    </div>
  );
};

export default MarkschemeCell;
