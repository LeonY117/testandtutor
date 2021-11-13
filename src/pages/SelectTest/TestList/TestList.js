import React from "react";
import { Link, useHistory } from "react-router-dom";
import classes from "./TestList.module.css";

import Button from "components/UI/Button/Button";

const TestInfo = (props) => {
  return (
    <div className={classes.testInfo}>
      <div className={classes.rowFlexControl}>
        <div className={classes.testNameWrapper}>
          <Link to={`/user/test/${props.testId}`} className={classes.testName}>
            {props.name}
          </Link>
        </div>
        <div className={classes.lengthScoreWrapper}>
          <p className={classes.testLength}>{props.length}</p>
          <p className={classes.testScore}>{props.score}</p>
        </div>
        <div className={classes.button}>
          <Button
            clicked={props.buttonClicked}
            color={props.buttonStyle ? props.buttonStyle : "white"}
          >
            {props.buttonInfo}
          </Button>
        </div>
      </div>
    </div>
  );
};

const TestList = (props) => {
  let tests = null;
  const history = useHistory();

  const testSelectButtonClicked = (id) => {
    history.push(`/user/test/${id}`);
  };

  if (props.tests) {
    tests = Object.keys(props.tests).map((testKey) => {
      let test = props.tests[testKey];
      let status = test.status;
      let score = null;
      let buttonInfo = "Take test";
      let buttonStyle = "orange";
      if (status === "finished") {
        score = test.totalScore + "/" + test.score;
        buttonInfo = "See results";
        buttonStyle = "white";
      }
      return (
        <TestInfo
          key={testKey}
          testId={testKey}
          name={test.name}
          length={test.length + " min"}
          score={score}
          buttonInfo={buttonInfo}
          buttonStyle={buttonStyle}
          buttonClicked={() => testSelectButtonClicked(testKey)}
        />
      );
    });
  }

  return <div className={classes.testList}>{tests}</div>;
};

export default TestList;
