import React from "react";
import classes from "./MarkschemeCell.module.css";

const markschemeCell = (props) => {
  return (
    <div className={classes.Cell}>
      <p className={classes.Label}>{props.label}</p>
      <input
        type="number"
        // onChange={() => this.props.changed(props.marks)}
        // defaultValue={props.value}
        className={classes.Input}
        onChange={props.changed}
        value={props.value}
      ></input>
    </div>
  );
};

export default markschemeCell;
