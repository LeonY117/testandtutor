import React, { useState } from "react";
import classes from "./TopicBreakdown.module.css";

import TopicBreakdownNav from "./TopicBreakdownNav/TopicBreakdownNav";
import Card from "components/UI/Card/Card";

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

const SubtopicLabels = (props) => {
  let subtopics = null;
  subtopics = props.subtopics.map((item, idx) => {
    return (
      <li
        key={idx}
        className={classes.subtopic}
        style={{ backgroundColor: GRADECOLORMAPPER[item.grade] }}
      >
        <label className={classes.subtopicName}>{item.name}</label>
        <label className={classes.subtopicGrade}>
          {item.grade === 0 ? null : item.grade}
        </label>
      </li>
    );
  });
  return <ul className={classes.subtopics}>{subtopics}</ul>;
};

const TopicBreakdown = (props) => {
  const subtopics = props.subtopics;
  const topics = Object.keys(subtopics) || [];
  const [selectedTopic, setSelectedTopic] = useState("Algebra");

  const selectedSubtopics = Object.keys(subtopics[selectedTopic])
    .map((name) => {
      // TODO: change subtopic name in backend
      if (name === "Minimum/Maximum/Inflection Points") {
        return {
          name: "Minimum / Maximum / Inflection Points",
          grade: subtopics[selectedTopic][name],
        };
      }
      return {
        name: name,
        grade: subtopics[selectedTopic][name],
      };
    })
    .sort((a, b) => {
      return b.grade - a.grade;
    });

  const gradedSubtopics = selectedSubtopics.filter((item) => item.grade > 0);
  const unGradedSubtopics = selectedSubtopics.filter(
    (item) => item.grade === 0
  );

  const topicChangedHandler = (topic) => {
    setSelectedTopic(topic);
  };

  return (
    <section className={classes.topicBreakdown}>
      <h1 className={classes.title}>Topic Breakdown</h1>
      <Card>
        <TopicBreakdownNav
          topics={topics}
          topicChangedHandler={topicChangedHandler}
          selectedTopic={selectedTopic}
        />
        <SubtopicLabels subtopics={gradedSubtopics} />
        {unGradedSubtopics.length > 0 && (
          <React.Fragment>
            <p className={classes.subtitle}>Not tested</p>
            <SubtopicLabels subtopics={unGradedSubtopics} />
          </React.Fragment>
        )}
      </Card>
    </section>
  );
};

export default TopicBreakdown;