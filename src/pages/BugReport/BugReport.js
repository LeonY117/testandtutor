import React, { useState, useEffect, useReducer } from "react";
import { Link, useLocation, useHistory } from "react-router-dom";
import classes from "./BugReport.module.css";

import Content from "hoc/Content/Content";
import Input from "components/UI/Input/Input";
import Button from "components/UI/Button/Button";
import TextArea from "components/UI/TextArea/TextArea";
import axios from "store/axios";

// TODO: refactor options and reducer to a different file
const titleOptions = {
  1: "Can't access the website",
  2: "Problem with question",
  3: "Content not displaying",
  4: "Other",
};

const reportReducer = (prevState, action) => {
  if (action.type === "TITLE") {
    return { ...prevState, title: action.value };
  } else if (action.type === "COMMENTS") {
    return { ...prevState, comments: action.value };
  } else if (action.type === "EMAIL") {
    return { ...prevState, email: action.value };
  }
};

const BugReport = () => {
  const history = useHistory();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const submitted = queryParams.get("submitted");
  const [formSubmitted, setFormSubmitted] = useState(submitted || false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [reportData, dispatchReportData] = useReducer(reportReducer, {
    title: "",
    comments: "",
    email: "",
  });

  const titleChangedHandler = (e) => {
    dispatchReportData({
      type: "TITLE",
      value: e.target.value,
    });
  };

  const commentChangedHandler = (e) => {
    dispatchReportData({ type: "COMMENTS", value: e.target.value });
  };

  const emailChangedHandler = (e) => {
    dispatchReportData({ type: "EMAIL", value: e.target.value });
  };

  const validateForm = () => {
    // TODO: optional validation
    // email address is correct
    // title is not empty?
    return true;
  };

  const submitForm = (e) => {
    e.preventDefault();
    setErrorMessage(null);
    console.log(reportData);
    if (!validateForm()) {
      setErrorMessage("please choose describe the issue");
      return;
    } else {
      axios
        .post("/feedback/report_bug", {
          data: { ...reportData },
        })
        .then((res) => {
          console.log(res);
          history.push(`/bugReport?submitted=${1}`);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  useEffect(() => {
    setFormSubmitted(parseInt(submitted) || false);
  }, [submitted]);

  useEffect(() => {
    window.scrollTo(0, 0);
  });
  let bugReport = null;
  if (!formSubmitted) {
    bugReport = (
      <>
        <div className={classes.feedbackForm}>
          <h1>Report an issue</h1>
          <p>
            We are still in early stage development and you may encounter some
            minor bugs. If you've had trouble using the website please describe
            the issue in full detail and our team will try to fix it asap.
          </p>
          <p>
            If you want to directly reach out to us, you can email us at
            admin@testandtutor.com.
          </p>
          <form>
            <div className={classes.feedbackFormSegment}>
              <p className={classes.subTitle}>Title</p>
              <div className={classes.selectWrapper}>
                <Input changed={titleChangedHandler} />
              </div>
            </div>

            <div className={classes.feedbackFormSegment}>
              <p className={classes.subTitle}>Description</p>
              <TextArea
                changed={commentChangedHandler}
                placeholder={"describe the issue"}
              />
            </div>

            <div className={classes.feedbackFormSegment}>
              <div className={classes.selectWrapper}>
                <Input
                  label={"Email (optional)"}
                  changed={emailChangedHandler}
                />
              </div>
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
  } else if (formSubmitted) {
    bugReport = (
      <div className={classes.feedbackForm}>
        <h1>We have received your report</h1>
        <p>
          Thank you for letting us know about the issue, we will be working on
          it ASAP
        </p>
        <Link className={classes.link} to="/">
          Back
        </Link>
      </div>
    );
  }
  return (
    <Content withNav>
      <div className={classes.testSubmitConfirm}>{bugReport}</div>
    </Content>
  );
};

export default BugReport;
