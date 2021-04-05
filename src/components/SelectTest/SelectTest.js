import React from "react";
import Content from "../../hoc/Content/Content";
import Card from "../UI/Card/Card";
import TestList from "./TestList/TestList";
import classes from "./SelectTest.module.css";

const selectTest = (props) => {
  return (
    <Content>
      <div className={classes.SkillsetTest}>
        <h1>Skillset Test</h1>
        <Card>
          <TestList
            tests={props.tests}
            testSelectButtonClicked={props.testSelectButtonClicked}
          />
        </Card>
      </div>
    </Content>
  );
};

export default selectTest;
