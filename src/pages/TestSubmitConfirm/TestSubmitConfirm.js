import React, { useState, useEffect, useReducer } from "react";
import { Link, useLocation, useHistory } from "react-router-dom";
import classes from "./TestSubmitConfirm.module.css";

import Content from "hoc/Content/Content";
import Select from "components/UI/Select/Select";
import Button from "components/UI/Button/Button";
import TextArea from "components/UI/TextArea/TextArea";
import axios from "store/axios";

// TODO: refactor options and reducer to a different file
const difficultyOptions = {
  1: "too easy",
  2: "slightly easier than what I wanted",
  3: "just the right level",
  4: "slightly harder than what I wanted",
  5: "too hard",
};

const timeOptions = {
  0: "<15 minutes",
  15: "15 - 30 minutes",
  30: "30 - 45 minutes",
  45: "45 - 60 minutes",
  60: ">60 minutes",
};

const feedbackReducer = (prevState, action) => {
  if (action.type === "DIFFICULTY") {
    return { ...prevState, difficulty: action.value };
  } else if (action.type === "TIME") {
    return { ...prevState, minutesTaken: action.value };
  } else if (action.type === "COMMENTS") {
    return { ...prevState, comments: action.value };
  }
};

const TestSubmitConfirm = () => {
  // ?feedbackSubmitted
  const location = useLocation();
  const history = useHistory();
  const queryParams = new URLSearchParams(location.search);
  const feedbackSubmitted = queryParams.get("feedbackSubmitted");
  const testId = queryParams.get("testId");
  const [errorMessage, setErrorMessage] = useState(null);
  const [feedbackData, dispatchFeedbackData] = useReducer(feedbackReducer, {
    testId: testId,
    difficulty: 0,
    minutesTaken: -1,
    rating: 0,
    comments: "",
  });

  const [showFeedbackForm, setShowFeedbackForm] = useState(false);

  const difficultyChangedHandler = (e) => {
    dispatchFeedbackData({
      type: "DIFFICULTY",
      value: parseInt(e.target.value),
    });
  };

  const timeTakenChangedHandler = (e) => {
    dispatchFeedbackData({ type: "TIME", value: parseInt(e.target.value) });
  };

  const commentChangedHandler = (e) => {
    dispatchFeedbackData({ type: "COMMENTS", value: e.target.value });
  };

  const validateForm = () => {
    // fields to validate: time, difficulty
    return feedbackData.minutesTaken !== -1 && feedbackData.difficulty !== 0;
  };

  const submitForm = (e) => {
    e.preventDefault();
    setErrorMessage(null);
    console.log(feedbackData);
    if (!validateForm()) {
      setErrorMessage("please choose an option");
      return;
    } else {
      axios
        .post("/feedback/test_feedback", { data: { feedbackData } })
        .then((res) => {
          console.log(res);
          history.push(`/user/testSubmitted/?feedbackSubmitted=${1}`);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  });

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
                <Select
                  narrow
                  size="medium"
                  value={feedbackData.difficulty}
                  changed={difficultyChangedHandler}
                  options={Object.keys(difficultyOptions)}
                  optionLabels={Object.values(difficultyOptions)}
                  defaultLabel={"choose an option"}
                />
              </div>
            </div>

            <div className={classes.feedbackFormSegment}>
              <p className={classes.subTitle}>
                How long did it take you to complete the test?
              </p>
              <div className={classes.selectWrapper}>
                <Select
                  narrow
                  size="medium"
                  value={feedbackData.minutesTaken}
                  changed={timeTakenChangedHandler}
                  options={Object.keys(timeOptions)}
                  optionLabels={Object.values(timeOptions)}
                  defaultLabel={"choose an option"}
                />
              </div>
            </div>

            <div className={classes.feedbackFormSegment}>
              <p className={classes.subTitle}>Comments</p>
              <TextArea
                changed={commentChangedHandler}
                placeholder={"optional comments"}
              />
            </div>

            <div className={classes.buttonWrapper}>
              <Button narrow tertiary color="blue" clicked={submitForm}>
                Confirm
              </Button>
            </div>
          </form>
          <p className={classes.error}>{errorMessage}</p>
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
