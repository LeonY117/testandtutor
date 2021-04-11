import classes from "./Dashboard.module.css";
import React, { Component } from "react";
import Card from "../../UI/Card/Card";
import Button from "../../UI/Button/Button";
import SubTopics from "./SubTopics/SubTopics";
import Content from "../../../hoc/Content/Content";
import Radar from "../../Radar/Radar";

class Dashboard extends Component {
  state = { radarHeight: 0, bottomRadarHeight: 0 };
  componentDidMount() {
    const width = document.getElementsByClassName(classes.Radar)[0].clientWidth;
    this.setState({radarHeight: width})
  }
  render() {
    return (
      <Content>
        <div className={classes.Dashboard}>
          <div className={classes.LeftCard}>
            <Card>
              <div className={classes.Radar} style={{height: this.state.radarHeight}}>
                <Radar topics={this.props.topics} showText />
              </div>
            </Card>
          </div>
          <div className={classes.RightSide}>
            <div className={classes.RightCard}>
              <Card>
                <h1>Suggested topics to study next</h1>
                <SubTopics suggestions={this.props.suggestions} />
              </Card>
            </div>
            <div className={classes.RightButtons}>
              <Button color="white" clicked={this.props.testButtonClicked}>
                Take recommended test
              </Button>

              <Button color="white" clicked={this.props.testButtonClicked}>
                Create custom test
              </Button>
            </div>
          </div>
        </div>
      </Content>
    );
  }
}

export default Dashboard;
