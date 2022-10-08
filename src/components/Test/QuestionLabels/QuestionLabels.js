import React from "react";
import classes from "./QuestionLabels.module.css";

const QuestionLabels = (props) => {
  const paperColors = {
    1: "#34B1F8",
    2: "#05B68B",
  };
  return (
    <div className={classes.questionLabels}>
      <div className={classes.labelWrapper}>
        <p
          className={classes.paperLabel}
          style={{
            color: paperColors[props.paper_number],
            borderColor: paperColors[props.paper_number],
          }}
        >
          Paper {props.paper_number}
        </p>
      </div>
    </div>
  );
};

export default QuestionLabels;
