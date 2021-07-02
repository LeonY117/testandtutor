import React, { Component } from "react";
import Content from "../../hoc/Content/Content";
import Card from "../../components/UI/Card/Card";
import Loading from "../../components/Loading/Loading";
import TestList from "../../components/SelectTest/TestList/TestList";
import classes from "./SelectTest.module.css";
import axios from "../../axios";
import Cookies from "js-cookie";

class selectTest extends Component {
  state = {
    userId: Cookies.get("userId"),
    loading: true,
    tests: {},
  };

  componentDidMount() {
    window.scrollTo(0, 0)
    console.log({ data: { userId: this.state.userId } });
    axios
      .post("/tests/available_tests", { data: { userId: this.state.userId } })
      .then((response) => {
        const responseData = response.data.data;
        console.log(responseData);
        const testsCopy = {};

        for (let i in responseData) {
          let test = responseData[i];
          testsCopy[test.id] = {};
          testsCopy[test.id]["name"] = test.title;
          testsCopy[test.id]["status"] = test.last_attempt
            ? "finished"
            : "unfinished";
          testsCopy[test.id]["length"] = test.duration;
          testsCopy[test.id]["score"] = test.last_attempt
            ? test.last_attempt.score
            : null;
          testsCopy[test.id]["totalScore"] = test.max_marks; //test.totalScore
        }
        this.setState({ tests: testsCopy, loading: false });
      }).catch((error)=> {
        this.props.expired()
      });
  }

  componentDidUpdate() {
    if (!this.state.userId) {
      this.props.expired();
    }
  }

  testSelectButtonClickedHandler = (paperID) => {
    console.log(paperID);
    // paperID = 'd76eb100-c70a-4c87-af37-40f26c2ea87b'
    this.props.history.push(this.props.match.url + "/" + paperID);
    // console.log("backend request required for " + paperID);
  };

  render() {
    let list = <Loading />;
    if (this.state.loading === false) {
      list = (
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
    return <div>{list}</div>;
  }
}

export default selectTest;
