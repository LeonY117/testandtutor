import React from "react";
import classes from "./TestList.module.css";
import TestInfo from "./TestInfo/TestInfo";

const testList = (props) => {
  let tests = null;
  if (props.tests) {
    tests = Object.keys(props.tests).map((testKey) => {
      let test = props.tests[testKey];
      let status = test.status;
      let score = "Not completed";
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
          name={test.name}
          length={test.length + " minutes"}
          score={score}
          buttonInfo={buttonInfo}
          buttonStyle={buttonStyle}
          buttonClicked={() => props.testSelectButtonClicked(testKey)}
        />
      );
    });
  }

  return <div className={classes.testList}>{tests}</div>;
};

export default testList;
