import React from "react";
import Card from "../../UI/Card/Card";
import Content from "../../../hoc/Content/Content";
import classes from "./TopicBreakdown.module.css";
import radarPlaceholder from "../../../assets/images/radar.png";

const topicBreakdown = (props) => {
  return (
    <Content>
      <Card>
        <div className={classes.TopicBreakdown}>
          <div className={classes.Left}>
            <h1>Topic Breakdown</h1>
            <select className={classes.Selector}>
              <option value="algebra">algebra</option>
              <option value="functions">functions</option>
              <option value="geometry">geometry</option>
            </select>
            <div>Grade: 7</div>
            <div>topic breakdown</div>
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
