import React, { useState, useContext, useEffect } from "react";
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
        <TestList tests={completeTestObj} />
        <p className={classes.testTitle} style={{ marginTop: "3rem" }}>
          Incomplete Tests
        </p>
        <TestList tests={incompleteTestObj} />
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


export default SelectTest;
