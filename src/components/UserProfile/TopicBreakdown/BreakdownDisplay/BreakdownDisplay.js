import React from "react";
import classes from "./BreakdownDisplay.module.css";

const breakdownDisplay = (props) => {
  const breakdown = props.selectedTopicBreakdown.breakdown;
  let breakdownArr = [[], [], []];
  for (let item in breakdown) {
    let paragraph = (
      <p className={classes.SubTopics} key={item}>
        - {item}
      </p>
    );
    if (breakdown[item] <= 3) {
      breakdownArr[2].push(paragraph);
    } else if (breakdown[item] <= 5) {
      breakdownArr[1].push(paragraph);
    } else if (breakdown[item] <= 7) {
      breakdownArr[0].push(paragraph);
    }
  }
  let breakdownDisplay = [];

  if (breakdownArr[0].length > 0) {
    breakdownDisplay.push(
      <div key={"bracket1"}>
        <h3 className={classes.BreakdownHeadings}>
          You have a good understanding in (6~7):
        </h3>
        {breakdownArr[0]}
      </div>
    );
  }
  if (breakdownArr[1].length > 0) {
    breakdownDisplay.push(
      <div key={"bracket2"}>
        <h3 className={classes.BreakdownHeadings}>
          You have a good understanding in (4~5):
        </h3>
        {breakdownArr[1]}
      </div>
    );
  }
  if (breakdownArr[2].length > 0) {
    breakdownDisplay.push(
      <div key={"bracket3"}>
        <h3 className={classes.BreakdownHeadings}>
          You have a good understanding in (2~3):
        </h3>
        {breakdownArr[2]}
      </div>
    );
  }
  return <div>{breakdownDisplay}</div>;
};

export default breakdownDisplay;
