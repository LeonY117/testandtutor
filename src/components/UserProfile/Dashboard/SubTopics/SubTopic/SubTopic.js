import React from "react";
import classes from "./SubTopic.module.css";

const subTopic = (props) => {
  const GRADECOLORMAPPER = {
      7: "#5ADBCE",
      6: "#48C8EF",
      5: "#3A63CC",
      4: "#D274E5",
      3: "#E23287",
      2: "#E23287",
      1: "#E23287",
      0: "#B1B1B1"
    };
  let color = "#89344B";
  color = GRADECOLORMAPPER[props.score];
  return (
    <div className={classes.SubTopic} style={{ 'backgroundColor': color }}>
      <p>{props.topicName}</p>
    </div>
  );
};

export default subTopic;
