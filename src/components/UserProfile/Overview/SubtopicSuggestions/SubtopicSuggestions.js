import React from "react";
import classes from "./SubtopicSuggestions.module.css";

const GRADECOLORMAPPER = {
  7: "#5ADBCE",
  6: "#48C8EF",
  5: "#3A63CC",
  4: "#D274E5",
  3: "#E23287",
  2: "#E23287",
  1: "#E23287",
  0: "#B1B1B1",
};

const subtopics = (props) => {
  let sortedSuggestions = [];
  for (const suggestion in props.suggestions) {
    sortedSuggestions.push([suggestion, props.suggestions[suggestion]]);
  }

  sortedSuggestions.sort(function (a, b) {
    return a[1] - b[1];
  });

  const displayedTopics = sortedSuggestions.map((colorData) => {
    let color = "#89344B";
    color = GRADECOLORMAPPER[colorData[1]];
    return (
      <div
        className={classes.subtopic}
        style={{ backgroundColor: color }}
        key={colorData[0]}
      >
        <p>{colorData[0]}</p>
      </div>
    );
  });
  return <div className={classes.subtopics}>{displayedTopics}</div>;
};

export default subtopics;
