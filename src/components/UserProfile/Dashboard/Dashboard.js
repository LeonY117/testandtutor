import classes from "./Dashboard.module.css";
import React from "react";
import Card from "../../UI/Card/Card";
import RadarPlaceholder from "../../../assets/images/radar.png";
import SubTopics from "./SubTopics/SubTopics";

const dashboard = (props) => {
  return (
    <div className={classes.Dashboard}>
      <div className={classes.LeftCard}>
        <Card>
          <img
            className={classes.RadarPlaceholder}
            src={RadarPlaceholder}
            draggable="false"
          />
        </Card>
      </div>
      <div className={classes.RightCard}>
        <Card>
          <h1>Suggested topics to study next</h1>
          <SubTopics suggestions={props.suggestions} />
        </Card>
      </div>
    </div>
  );
};

export default dashboard;
