import React from "react";
import classes from "./Markscheme.module.css";
import MarkschemeTable from "./MarkschemeTable/MarkschemeTable";

const markscheme = (props) => {
  return (
    <div className={classes.Markscheme}>
      <div className={classes.Body}>Here's the markscheme</div>
      <div className={classes.Table}>
        <MarkschemeTable
          inputChanged={props.inputChanged}
          marks={props.marks}
          questionNumber={props.questionNumber}
        />
      </div>
    </div>
  );
};

export default markscheme;
