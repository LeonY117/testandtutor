import React, { Component } from "react";
import Cookies from "js-cookie";
import Loading from "../../components/Loading/Loading";
import UserProfile from "../../components/UserProfile/UserProfile";
import { Switch, Route, Redirect } from "react-router-dom";

import axios from "../../stores/axios";

class User extends Component {
  state = {
    redirect: false,
    loading: true,
    userId: '1234',
    selectedTopic: "Functions and Equations",
    data: {
      username: "Student",
      subject: "IB Mathematics SL",
      examDate: "19th June",
      averageGrade: 6,
      subTopics: {},
      selectedTopic: "Functions and Equations",
      topics: {},
      suggestedTopics: {},
      recentTests: [],
      scoreHistory: [50, 51, 68, 72, 80],
    },
  };

  selectChangedHandler = (event) => {
    const dataCopy = { ...this.state.data };
    dataCopy["selectedTopic"] = event.target.value;
    this.setState({ data: dataCopy });
  };

  takeTestButtonClickedHandler = () => {
    this.props.history.push(this.props.match.url + "/test");
  };

  componentDidUpdate() {
    if (!this.state.userId) {
      this.props.expired();
    }
  }

  componentDidMount() {
    window.scrollTo(0, 0);
    const data = {
      data: { userId: this.state.userId },
    };

    // const headers = {
    //   headers: { Authorization: `Bearer ${this.props.accessToken}` },
    // };
    axios
      .get("/profiles/userprofile")
      .then((response) => {
        if (response.data.hasOwnProperty("errors")) {
          console.log(response.data)
          console.log("session expired");
          this.setState({ redirect: true });
        } else {
          const responseData = response.data.data;
          console.log("from user profile:");
          console.log(responseData);
          const dataCopy = { ...this.state.data };

          const topics = {};
          const subtopics = {};
          for (let i in responseData.topicScores) {
            let topic = responseData.topicScores[i];
            topics[topic.title] = parseInt(topic.score);
            subtopics[topic.title] = {};
            for (let j in topic.subTopicScores) {
              let sub = topic.subTopicScores[j];
              subtopics[topic.title][sub.title] = parseInt(sub.score);
            }
          }

          const suggestedTopics = {};
          for (let i in responseData.suggestSubtopics) {
            let sub = responseData.suggestSubtopics[i];
            suggestedTopics[sub.title] = parseInt(sub.score);
          }

          dataCopy.username = responseData.first_name;
          dataCopy.subject = responseData.curriculum;

          // Not getting these from backend yet
          dataCopy.topics = topics;
          dataCopy.subTopics = subtopics;
          dataCopy.suggestedTopics = suggestedTopics;

          console.log("forming this object from response:");
          console.log(dataCopy);

          this.setState({ loading: false, data: dataCopy });
        }
      })
      .catch((error) => {
        // console.log(error);
        console.log("cannot get user info ");
        this.setState({ redirect: true });
        this.props.expired();
      });
  }
  render() {
    const selectedTopicBreakdown = {
      name: this.state.data.selectedTopic,
      grade: this.state.data.topics[this.state.data.selectedTopic],
      breakdown: this.state.data.subTopics[this.state.data.selectedTopic],
    };

    let userProfile = <Loading />;

    if (this.state.loading === false) {
      userProfile = (
        <Switch>
          <Route
            path={this.props.match.url + "/profile"}
            render={(props) => (
              <UserProfile
                {...props}
                username={this.state.data.username}
                subject={this.state.data.subject}
                examDate={this.state.data.examDate}
                averageGrade={this.state.data.averageGrade}
                testButtonClicked={this.takeTestButtonClickedHandler}
                topics={this.state.data.topics}
                selectedTopicBreakdown={selectedTopicBreakdown}
                selectChangedHandler={this.selectChangedHandler}
                scoreHistory={this.state.data.scoreHistory}
                suggestedTopics={this.state.data.suggestedTopics}
              />
            )}
          />
          <Redirect from="/user" exact to="/user/profile" />
        </Switch>
      );
    }

    if (this.state.redirect === true) {
      console.log("going to redirect back go login");
      userProfile = <Redirect from="/user" to="/login" />;
    }

    return <div>{userProfile}</div>;
  }
}

export default User;
