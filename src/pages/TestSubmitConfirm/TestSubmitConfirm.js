import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import classes from "./TestSubmitConfirm.module.css";

import Content from "hoc/Content/Content";
import Select from "components/UI/Select/Select";
import Button from "components/UI/Button/Button";
import TextArea from "components/UI/TextArea/TextArea";

const difficultyOptions = [
  "too easy",
  "slightly easier than what I wanted",
  "just the right level",
  "slightly harder than what I wanted",
  "too hard",
];

const timeOptions = [
  "<15 minutes",
  "15 - 30 minutes",
  "30 - 45 minutes",
  "45 - 60 minutes",
  ">60 minutes",
];

const TestSubmitConfirm = () => {
  // ?feedbackSubmitted
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const feedbackSubmitted = queryParams.get("feedbackSubmitted");

  const [showFeedbackForm, setShowFeedbackForm] = useState(false);

  useEffect(() => {
    setShowFeedbackForm(!parseInt(feedbackSubmitted));
  }, [feedbackSubmitted]);

  let testSubmitConfirm = null;
  if (showFeedbackForm) {
    testSubmitConfirm = (
      <>
        <h1>Test Submitted</h1>
        <div className={classes.feedbackForm}>
          <form>
            <div className={classes.feedbackFormSegment}>
              <p className={classes.subTitle}>
                How did you find the questions in this test?
              </p>
              <div className={classes.selectWrapper}>
                <Select narrow size="medium" options={difficultyOptions} />
              </div>
            </div>

            <div className={classes.feedbackFormSegment}>
              <p className={classes.subTitle}>
                How long did it take you to complete the test?
              </p>
              <div className={classes.selectWrapper}>
                <Select narrow size="medium" options={timeOptions} />
              </div>
            </div>

            <div className={classes.feedbackFormSegment}>
              <p className={classes.subTitle}>Comments</p>
              <TextArea />
            </div>

            <div className={classes.buttonWrapper}>
              <Button narrow tertiary color="blue">
                Confirm
              </Button>
            </div>
          </form>
        </div>
      </>
    );
  } else if (!showFeedbackForm) {
    testSubmitConfirm = (
      <>
        <h1>Test Completed</h1>
        <p>Thank you for taking your time to give us some feedback</p>
        <p>Your personalized skillset profile is now updated</p>
        <Link className={classes.link} to="/user">
          Back to dashboard
        </Link>
      </>
    );
  }

  return (
    <Content>
      <div className={classes.testSubmitConfirm}>{testSubmitConfirm}</div>
    </Content>
  );
};

export default TestSubmitConfirm;
