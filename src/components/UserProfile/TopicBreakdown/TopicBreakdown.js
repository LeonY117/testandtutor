import React from "react";
import Card from "../../UI/Card/Card";
import Content from "../../../hoc/Content/Content";
import classes from "./TopicBreakdown.module.css";
import radarPlaceholder from "../../../assets/images/radar.png";
import Select from "../../Select/Select";
import BreakdownDisplay from "./BreakdownDisplay/BreakdownDisplay";

const topicBreakdown = (props) => {
  const name = props.selectedTopicBreakdown.name;
  const grade = props.selectedTopicBreakdown.grade;
  return (
    <Content>
      <Card>
        <div className={classes.TopicBreakdown}>
          <div className={classes.Left}>
            <h1>Topic Breakdown</h1>
            <Select
              options={Object.keys(props.topics)}
              changed={props.selectChangedHandler}
              default={name}
            />
            <p className={classes.Performance}>Average performance: {grade}</p>
            <BreakdownDisplay
              selectedTopicBreakdown={props.selectedTopicBreakdown}
            />
          </div>
          <div className={classes.Right}>
            <img src={radarPlaceholder} />
          </div>
        </div>
      </Card>
    </Content>
  );
};

export default topicBreakdown;
