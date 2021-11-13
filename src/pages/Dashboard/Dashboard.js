import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
// import { Switch, Route, Redirect } from "react-router-dom";
import classes from "./Dashboard.module.css";

import Content from "hoc/Content/Content";
import Card from "components/UI/Card/Card";
import Loading from "components/Loading/Loading";
import Overview from "./Overview/Overview";
import TopicBreakdown from "./TopicBreakdown/TopicBreakdown";
import TestList from "pages/SelectTest/TestList/TestList";

import axiosInstance from "store/axios";
import AuthContext from "store/auth-context";

const Dashboard = (props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [userData, setUserData] = useState({
    topics: {},
    subtopics: {},
    selectedTopic: "Functions and Equations",
    suggestedTopics: {},
  });
  const [tests, setTests] = useState({});

  const authCtx = useContext(AuthContext);

  const takeTestButtonClickedHandler = () => {
    props.history.push(props.match.url + "/test");
  };

  const testClickedHandler = () => {
    return;
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    const profileRequest = axiosInstance.get("/profiles/userprofile");
    const selectTestRequest = axiosInstance.get("/tests/available_tests");
    axios
      .all([profileRequest, selectTestRequest])
      .then(
        axios.spread((...responses) => {
          // process response from '/profiles/userprofile'
          const profileResponse = responses[0];
          if (profileResponse.data.hasOwnProperty("errors")) {
            console.log(profileResponse.data);
            console.log("session expired");
            authCtx.logout();
          } else {
            const profileResponseData = profileResponse.data.data;
            console.log("from user profile:");
            console.log(profileResponseData);

            const topics = {};
            const subtopics = {};
            for (const topic of profileResponseData.topicScores) {
              topics[topic.title] = parseInt(topic.score);
              subtopics[topic.title] = {};
              for (const subtopic of topic.subTopicScores) {
                subtopics[topic.title][subtopic.title] = parseInt(
                  subtopic.score
                );
              }
            }

            const suggestedTopics = {};
            for (const suggestedSubtopic of profileResponseData.suggestSubtopics) {
              suggestedTopics[suggestedSubtopic.title] = parseInt(
                suggestedSubtopic.score
              );
            }

            setUserData((prevState) => {
              return {
                ...prevState,
                username: profileResponseData.first_name,
                subject: profileResponseData.curriculum,
                topics: topics,
                subtopics: subtopics,
                suggestedTopics: suggestedTopics,
              };
            });
          }

          // process response from '/test/available_tests'
          const selectTestResponse = responses[1];
          if (selectTestResponse.data.hasOwnProperty("errors")) {
            console.log(selectTestResponse.data);
            console.log("session expired");
            authCtx.logout();
          } else {
            const selectTestResponseData = selectTestResponse.data.data;
            console.log(selectTestResponseData);
            const testsCopy = {};

            for (const test of selectTestResponseData) {
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
          }
          setIsLoading(false);
        })
      )
      .catch((error) => {
        console.log(error);
        console.log("cannot get user info ");
        authCtx.logout();
      });
  }, [authCtx]);

  // TODO: Filter to 5 most recent tests
  // or get recent tests from user/userprofile
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

  // TODO: potentially make this into a new component or combine
  // with 'pages/SelectTest'
  const testListCard = (
    <Card>
      {Object.keys(completeTestObj).length > 0 && completeTestList}
      {Object.keys(incompleteTestObj).length > 0 && incompleteTestList}
    </Card>
  );

  const dashboard = (
    <div>
      <Content>
        <div className={classes.userGreeting}>
          <h1>Hi there!</h1>
        </div>
        <section className={classes.overviewWrapper}>
          <Overview
            topics={userData.topics}
            suggestions={userData.suggestedTopics}
            testButtonClicked={takeTestButtonClickedHandler}
          />
        </section>
        <section className={classes.breakdownWrapper}>
          <TopicBreakdown subtopics={userData.subtopics} />
        </section>
        <section className={classes.selectTestWrapper}>{testListCard}</section>
      </Content>
      {/* <Redirect from="/user" exact to="/user/profile" /> */}
    </div>
  );
  return (
    <div>
      {isLoading && <Loading />}
      {!isLoading && dashboard}
    </div>
  );
};

export default Dashboard;
