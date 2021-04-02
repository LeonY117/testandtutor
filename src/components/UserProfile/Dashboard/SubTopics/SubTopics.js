import React from "react";
import SubTopic from "./SubTopic/SubTopic";
import classes from "./SubTopics.module.css";

const subTopics = (props) => {
  let sortedSuggestions = []
  for (let suggestion in props.suggestions) {
    sortedSuggestions.push([suggestion, props.suggestions[suggestion]])
  }

  sortedSuggestions.sort(function(a, b) {return a[1]-b[1]})

  const displayedTopics = sortedSuggestions.map((pair) => {
    return <SubTopic topicName={pair[0]} score={pair[1]} key={pair[0]} />;
  });
  return <div className={classes.SubTopics}>{displayedTopics}</div>;
};

export default subTopics;
