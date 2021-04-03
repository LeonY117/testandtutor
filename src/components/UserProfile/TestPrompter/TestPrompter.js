import classes from "./TestPrompter.module.css";
import React from "react";
import Button from "../../UI/Button/Button";
import Content from "../../../hoc/Content/Content";
import Card from "../../UI/Card/Card";

const testPrompter = () => {
  return (
    <Content>
      <Card>
        <div className={classes.TestPrompter}>
          <div className={classes.Text}>
            <h1>Ready to take a test?</h1>
            <p>
              You can either take a full test, or you can make your custom test!
            </p>
          </div>
          <div className={classes.Buttons}>
            <div className={classes.ButtonWrapper}>
              <a href='/'>
                <Button color="blue">Take skillset test</Button>
              </a>
              <a href='/'>
                <Button color="blue">Create Custom Test</Button>
              </a>
            </div>
          </div>
        </div>
      </Card>
    </Content>
  );
};

export default testPrompter;
