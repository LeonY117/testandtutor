import classes from "./Dashboard.module.css";
import React from "react";
import Card from "../../UI/Card/Card";
import Button from "../../UI/Button/Button";
import RadarPlaceholder from "../../../assets/images/radar.png";
import SubTopics from "./SubTopics/SubTopics";
import Content from "../../../hoc/Content/Content";

const dashboard = (props) => {
  return (
    <Content>
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
        <div className={classes.RightSide}>
          <div className={classes.RightCard}>
            <Card>
              <h1>Suggested topics to study next</h1>
              <SubTopics suggestions={props.suggestions} />
            </Card>
          </div>
          <div className={classes.RightButtons}>
            <Button color="white" clicked={props.testButtonClicked}>
              Take recommended test
            </Button>

            <Button color="white" clicked={props.testButtonClicked}>
              Create custom test
            </Button>
          </div>
        </div>
      </div>
    </Content>
  );
};

export default dashboard;
