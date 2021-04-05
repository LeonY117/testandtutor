import React from "react";
import classes from "./TestList.module.css";
import TestInfo from "./TestInfo/TestInfo";

const testList = (props) => {
  return (
    <div className={classes.testList}>
      <TestInfo
        name={"Test1"}
        length={"120 minutes"}
        score={"70/120"}
        buttonInfo={"see results"}
      />
      <TestInfo
        name={"Test1"}
        length={"120 minutes"}
        score={"70/120"}
        buttonInfo={"see results"}
      />
      <TestInfo
        name={"Test1"}
        length={"120 minutes"}
        score={"70/120"}
        buttonInfo={"see results"}
      />
    </div>
  );
};

export default testList;
