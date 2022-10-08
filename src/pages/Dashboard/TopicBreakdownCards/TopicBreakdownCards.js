import React, { useState } from "react";
import classes from "./TopicBreakdown.module.css";

import Select from "components/UI/Select/Select";
import Card from "components/UI/Card/Card";

// TODO: Remove scroll bar with browser compatibility

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

const BreakdownCard = (props) => {
  console.log(props.subtopics);
  const subtopicItems = props.subtopics.map((subtopic) => {
    return (
      <li className={classes.breakdownItem} key={subtopic.name}>
        <label
          className={classes.gradeLabel}
          style={{ backgroundColor: GRADECOLORMAPPER[subtopic.grade] }}
        >
          {subtopic.grade}
        </label>
        <p className={classes.breakdownSubtopicName}>{subtopic.name}</p>
      </li>
    );
  });
  return (
    <div className={classes.breakdown}>
      <Card>
        <p className={classes.breakdownTitle}>{props.subtitle}</p>
        <ul className={classes.breakdownItems}>{subtopicItems}</ul>
      </Card>
    </div>
  );
};

const TopicBreakdown = (props) => {
  const topics = Object.keys(props.subtopics);
  const [selectedTopic, setSelectedTopic] = useState("Algebra");

  const goodSubtopics = [];
  const mediumSubtopics = [];
  const poorSubtopics = [];

  if (selectedTopic) {
    for (const name in props.subtopics[selectedTopic]) {
      const subtopicObject = {
        name: name,
        grade: props.subtopics[selectedTopic][name],
      };
      if (subtopicObject.grade >= 6) {
        goodSubtopics.push(subtopicObject);
      } else if (subtopicObject.grade >= 4) {
        mediumSubtopics.push(subtopicObject);
      } else {
        poorSubtopics.push(subtopicObject);
      }
    }
  }

  const selectChangedHandler = (event) => {
    setSelectedTopic(event.target.value);
  };

  return (
    <div className={classes.topicBreakdown}>
      <h1>Topic Breakdown</h1>
      <div className={classes.selectWrapper}>
        <Select
          options={topics}
          changed={selectChangedHandler}
          selected={selectedTopic}
        />
      </div>
      <div className={classes.breakdowns}>
        {goodSubtopics.length > 0 && (
          <BreakdownCard
            subtitle={"Very well understood"}
            subtopics={goodSubtopics}
          />
        )}
        {mediumSubtopics.length > 0 && (
          <BreakdownCard
            subtitle={"Good understanding"}
            subtopics={mediumSubtopics}
          />
        )}

        <BreakdownCard
          subtitle={"Need more practice / not tested"}
          subtopics={poorSubtopics}
        />
      </div>
    </div>
  );
};

export default TopicBreakdown;
