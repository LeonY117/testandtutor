import React from "react";
import classes from "./TestList.module.css";

// import Button from "components/UI/Button/Button";

const TestInfo = (props) => {
  return (
    <div className={classes.testInfo}>
      <div className={classes.rowFlexControl}>
        <div className={classes.testNameWrapper}>
          <a clicked={props.buttonClicked} className={classes.testName}>
            {props.name}
          </a>
        </div>
        <div className={classes.lengthScoreWrapper}>
          <p className={classes.testLength}>{props.length}</p>
          <p className={classes.testScore}>{props.score}</p>
        </div>
      </div>
      {/* <div className={classes.button}>
        <Button
          clicked={props.buttonClicked}
          color={props.buttonStyle ? props.buttonStyle : "white"}
        >
          {props.buttonInfo}
        </Button>
      </div> */}
    </div>
  );
};

const TestList = (props) => {
  let tests = null;
  if (props.tests) {
    console.log(props.tests);
    tests = Object.keys(props.tests).map((testKey) => {
      let test = props.tests[testKey];
      let status = test.status;
      let score = null;
      let buttonInfo = "Take test";
      let buttonStyle = "orange";
      if (status === "finished") {
        score = test.score + "/" + test.totalScore;
        buttonInfo = "See results";
        buttonStyle = "white";
      }
      return (
        <TestInfo
          key={testKey}
          name={test.name}
          length={test.length + " min"}
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

export default TestList;
