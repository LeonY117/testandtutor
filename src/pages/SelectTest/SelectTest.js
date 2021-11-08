import React, { Component, useState, useContext, useEffect } from "react";
import classes from "./SelectTest.module.css";

import Content from "hoc/Content/Content";
import Card from "components/UI/Card/Card";
import Loading from "components/Loading/Loading";
import TestList from "pages/SelectTest/TestList/TestList";

import axios from "store/axios";
import AuthContext from "store/auth-context";

const SelectTest = (props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [tests, setTests] = useState({});
  const authCtx = useContext(AuthContext);

  const testClickedHandler = () => {
    return;
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    setIsLoading(true);
    // console.log({ data: { userId: this.state.userId } });
    axios
      .get("/tests/available_tests")
      .then((response) => {
        const responseData = response.data.data;
        console.log(responseData);
        const testsCopy = {};

        for (const test of responseData) {
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
        setTests(testsCopy);
        setIsLoading(false);
      })
      .catch((error) => {
        authCtx.logout();
        setIsLoading(false);
      });
  }, [authCtx]);

  const completeTestObj = {};
  const incompleteTestObj = {};

  for (const testId in tests) {
    let test = tests[testId];
    if (test.status === "finished") {
      completeTestObj[testId] = test;
    } else if (test.status === "unfinished") {
      incompleteTestObj[testId] = test;
    }
  }

  const testListCard = (
    <div className={classes.selectTest}>
      <Card>
        <p className={classes.testTitle}>Completed Tests</p>
        <TestList
          tests={completeTestObj}
          testSelectButtonClicked={testClickedHandler}
        />
        <p className={classes.testTitle} style={{ marginTop: "3rem" }}>
          Incomplete Tests
        </p>
        <TestList
          tests={incompleteTestObj}
          testSelectButtonClicked={testClickedHandler}
        />
      </Card>
    </div>
  );

  return (
    <Content>
      {isLoading && <Loading />}
      {!isLoading && testListCard}
    </Content>
  );
};
class selectTest extends Component {
  state = {
    userId: "1234",
    loading: true,
    tests: {},
  };

  componentDidMount() {
    window.scrollTo(0, 0);
    // console.log({ data: { userId: this.state.userId } });
    axios
      .get("/tests/available_tests")
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
      })
      .catch((error) => {
        this.props.expired();
      });
  }

  componentDidUpdate() {
    if (!this.state.userId) {
      this.props.expired();
    }
  }

  testSelectButtonClickedHandler = (paperID) => {
    // console.log(paperID);
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

export default SelectTest;
