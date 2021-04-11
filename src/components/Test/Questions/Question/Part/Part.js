import React from "react";
import Latex from "../../../../../hoc/Latex/Latex";
import classes from "./Part.module.css";

const part = (props) => {
  return (
    <Latex>
      <div className={classes.Part}>
        <div>
          <p className={classes.PartLabel}>({String.fromCharCode(96 + props.number)})</p>
          <p className={classes.PartBody}>{props.body}</p>
        </div>
        <p className={classes.Mark}>[{props.marks}]</p>
      </div>
    </Latex>
  );
};

export default part;
