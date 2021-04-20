import React, { Component } from "react";
import Content from "../../hoc/Content/Content";
import Card from "../../components/UI/Card/Card";
import TestList from "../../components/SelectTest/TestList/TestList";
import classes from "./SelectTest.module.css";
import axios from "axios";

class selectTest extends Component {
  state = {
    tests: {
      "d76eb100-c70a-4c87-af37-40f26c2ea87b": {
        name: "Test 1",
        status: "finished",
        length: 120,
        totalScore: 120,
        score: 70,
      },
      "2abc": {
        name: "Test 2",
        status: "finished",
        length: 60,
        totalScore: 100,
        score: 70,
      },
      "3abc": {
        name: "Test 3",
        status: "unfinished",
        length: 80,
        totalScore: 120,
        score: null,
      },
      "4abc": {
        name: "Test 4",
        status: "unfinished",
        length: 100,
        totalScore: 120,
        score: null,
      },
    },
  };

  componentDidMount() {
    axios
      .post("/tests/available_tests/", { data: { userId: this.props.userId } })
      .then((response) => {
        console.log(response);
      });
  }

  testSelectButtonClickedHandler = (paperID) => {
    console.log(paperID);
    // paperID = 'd76eb100-c70a-4c87-af37-40f26c2ea87b'
    this.props.history.push(this.props.match.url + "/" + paperID);
    // console.log("backend request required for " + paperID);
  };

  render() {
    return (
      <Content>
        <div className={classes.SkillsetTest}>
          <h1>Skillset Test</h1>
          <Card>
            <TestList
              tests={this.state.tests}
              testSelectButtonClicked={this.testSelectButtonClickedHandler}
            />
          </Card>
        </div>
      </Content>
    );
  }
}

export default selectTest;
