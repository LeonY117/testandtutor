import React, { useContext, useEffect, useState } from "react";
// import { Switch, Route, Redirect } from "react-router-dom";
import classes from "./Dashboard.module.css";

import Content from "hoc/Content/Content";
import Loading from "components/Loading/Loading";
import Overview from "./Overview/Overview";
import TopicBreakdown from "./TopicBreakdown/TopicBreakdown";

import axios from "store/axios";
import AuthContext from "store/auth-context";

const Dashboard = (props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [userData, setUserData] = useState({
    username: "Student",
    subject: "IB Mathematics SL",
    examDate: "19th June",
    averageGrade: 0,
    topics: {},
    subtopics: {},
    selectedTopic: "Functions and Equations",
    suggestedTopics: {},
  });

  const authCtx = useContext(AuthContext);

  const takeTestButtonClickedHandler = () => {
    props.history.push(props.match.url + "/test");
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    axios
      .get("/profiles/userprofile")
      .then((response) => {
        if (response.data.hasOwnProperty("errors")) {
          console.log(response.data);
          console.log("session expired");
          authCtx.logout();
        } else {
          const responseData = response.data.data;
          console.log("from user profile:");
          console.log(responseData);

          const topics = {};
          const subtopics = {};
          for (const topic of responseData.topicScores) {
            topics[topic.title] = parseInt(topic.score);
            subtopics[topic.title] = {};
            for (const subtopic of topic.subTopicScores) {
              subtopics[topic.title][subtopic.title] = parseInt(subtopic.score);
            }
          }

          const suggestedTopics = {};
          for (const suggestedSubtopic of responseData.suggestSubtopics) {
            suggestedTopics[suggestedSubtopic.title] = parseInt(
              suggestedSubtopic.score
            );
          }

          setUserData((prevState) => {
            return {
              ...prevState,
              username: responseData.first_name,
              subject: responseData.curriculum,
              topics: topics,
              subtopics: subtopics,
              suggestedTopics: suggestedTopics,
            };
          });
          setIsLoading(false);
        }
      })
      .catch((error) => {
        console.log(error);
        console.log("cannot get user info ");
        authCtx.logout();
      });
  }, [authCtx]);

  const userProfile = (
    <div>
      <Content>
        <div className={classes.userGreeting}>
          <h1>Hi there!</h1>
        </div>
        <div className={classes.overviewWrapper}>
          <Overview
            topics={userData.topics}
            suggestions={userData.suggestedTopics}
            testButtonClicked={takeTestButtonClickedHandler}
          />
        </div>
        <TopicBreakdown subtopics={userData.subtopics} />
      </Content>
      {/* <Route
        path={props.match.url + "/profile"}
        render={(props) => (
          <UserProfile
            {...props}
            username={userData.username}
            subject={userData.subject}
            examDate={userData.examDate}
            averageGrade={userData.averageGrade}
            testButtonClicked={takeTestButtonClickedHandler}
            topics={userData.topics}
            selectedTopicBreakdown={selectedTopicBreakdown}
            selectChangedHandler={selectChangedHandler}
            suggestedTopics={userData.suggestedTopics}
          />
        )}
      /> */}
      {/* <Redirect from="/user" exact to="/user/profile" /> */}
    </div>
  );

  // if (this.state.redirect === true) {
  //   console.log("going to redirect back go login");
  //   userProfile = <Redirect from="/user" to="/login" />;
  // }
  return (
    <div>
      {isLoading && <Loading />}
      {!isLoading && userProfile}
    </div>
  );
};

export default Dashboard;
