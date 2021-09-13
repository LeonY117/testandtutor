import React from "react";
import classes from "./MarkschemeCell.module.css";

const markschemeCell = (props) => {
  return (
    <div className={classes.Cell}>
      <p className={classes.Label}>{props.label} </p>
      <div className={classes.InputWrapper}>
        <input
          type="number"
          // onChange={() => this.props.changed(props.marks)}
          className={classes.Input}
          onChange={props.changed}
          value={Number(props.value).toString() || 0}
        ></input>
        <span className={classes.Max} >/{props.max}</span>
      </div>
    </div>
  );
};

export default markschemeCell;
