import React from "react";
import classes from "./TopicBreakdownNav.module.css";

const TOPIC_NAME_MAPPER = {
  Algebra: "Algebra",
  "Functions and Equations": "Functions",
  "Geometry and Trigonometry": "Geometry",
  "Statistics and Probability": "Statistics",
  Calculus: "Calculus",
};

const TopicBreakdownNav = (props) => {
  const topics = props.topics.map((topic, i) => {
    return (
      <div className={classes.topicWidthControl} key={i}>
        <li
          className={classes.topic}
          onClick={() => {
            props.topicChangedHandler(topic);
          }}
          picked={(props.selectedTopic === topic).toString()}
        >
          {TOPIC_NAME_MAPPER[topic]}
        </li>
      </div>
    );
  });
  return (
    <div>
      <ul className={classes.topicList}>{topics}</ul>
    </div>
  );
};

export default TopicBreakdownNav;
