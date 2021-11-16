import React, { useState, useContext, useEffect } from "react";
import classes from "./SelectTest.module.css";

import Content from "hoc/Content/Content";
import Card from "components/UI/Card/Card";
import Loading from "components/Loading/Loading";
import TestList from "pages/SelectTest/TestList/TestList";

import axios from "store/axios";
import AuthContext from "store/auth-context";

const SelectTest = () => {
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

  const completeTestList = (
    <React.Fragment>
      <p className={classes.testTitle}>Completed Tests</p>
      <TestList tests={completeTestObj} />
    </React.Fragment>
  );

  const incompleteTestList = (
    <React.Fragment>
      <p className={classes.testTitle}>Incomplete Tests</p>
      <TestList tests={incompleteTestObj} />
    </React.Fragment>
  );

  const testListCard = (
    <div className={classes.selectTest}>
      <Card pageWrapper>
        {Object.keys(completeTestObj).length > 0 && completeTestList}
        {Object.keys(incompleteTestObj).length > 0 && incompleteTestList}
      </Card>
    </div>
  );

  return (
    <Content withNav>
      {isLoading && <Loading />}
      {!isLoading && testListCard}
    </Content>
  );
};

export default SelectTest;
