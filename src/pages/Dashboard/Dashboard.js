import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
// import { Switch, Route, Redirect } from "react-router-dom";
import classes from "./Dashboard.module.css";

import Content from "hoc/Content/Content";
import Loading from "components/Loading/Loading";
import Overview from "./Overview/Overview";
import TopicBreakdown from "./TopicBreakdown/TopicBreakdown";
import TestLists from "components/TestLists/TestLists";

import axiosInstance from "store/axios";
import AuthContext from "store/auth-context";

const Dashboard = (props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [userData, setUserData] = useState({
    username: null,
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
            // console.log(profileResponseData);

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
            // console.log(selectTestResponseData);
            const testsCopy = {};

            for (const test of selectTestResponseData) {
              testsCopy[test.id] = {};
              testsCopy[test.id]["name"] = test.title;
              // TODO: this should come from the backend
              testsCopy[test.id]["topic"] = test.title.split(" ")[0];
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

  let newUserPrompt = null;
  if (Object.values(userData.topics).every((x) => x === 0)) {
    newUserPrompt = (
      <p className={classes.newUserPrompt}>
        Complete some tests to get an initial skillset breakdown.
      </p>
    );
  }

  const dashboard = (
    <div>
      <div className={classes.userGreeting}>
        {userData.username ? (
          <h1>Hi, {userData.username}!</h1>
        ) : (
          <h1>Hi there!</h1>
        )}
        {newUserPrompt}
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
      <section className={classes.selectTestWrapper}>
        <TestLists tests={tests} />
      </section>
    </div>
  );
  return (
    <Content withNav>
      {isLoading && <Loading />}
      {!isLoading && dashboard}
    </Content>
  );
};

export default Dashboard;
