import React from "react";
import Card from "../../UI/Card/Card";
import classes from "./TopicBreakdown.module.css";
import Select from "../../UI/Select/Select";
import BreakdownDisplay from "./BreakdownDisplay/BreakdownDisplay";
import Radar from "../../Radar/Radar";

const topicBreakdown = (props) => {
  const name = props.selectedTopicBreakdown.name;
  const grade = props.selectedTopicBreakdown.grade;
  return (
    <Card>
      <div className={classes.TopicBreakdown}>
        <div className={classes.Left}>
          <h1>Topic Breakdown</h1>
          <div className={classes.Select}>
            <Select
              options={Object.keys(props.topics)}
              changed={props.selectChangedHandler}
              default={name}
            />
          </div>
          {/* <p className={classes.Performance}>Average performance: {grade}</p> */}
          <BreakdownDisplay
            selectedTopicBreakdown={props.selectedTopicBreakdown}
          />
        </div>
        <div className={classes.Right}>
          <div className={classes.Radar}>
            <Radar topics={props.topics} highlightTopic={name} />
          </div>
          <h1>{name}</h1>
          <p>Average Performance: {grade}</p>
        </div>
      </div>
    </Card>
  );
};

export default topicBreakdown;
