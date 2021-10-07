import React, { Component } from "react";
import Cookies from "js-cookie";
import Loading from "../../components/Loading/Loading";
import UserProfile from "../../components/UserProfile/UserProfile";
import { Switch, Route, Redirect } from "react-router-dom";

import axios from "../../axios";

class User extends Component {
  state = {
    redirect: false,
    loading: true,
    userId: Cookies.get("userId"),
    selectedTopic: "Functions and Equations",
    data: {
      username: "Student",
      subject: "IB Mathematics SL",
      examDate: "19th June",
      averageGrade: 6,
      subTopics: {
        "Functions and Equations": {
          "Function Basics(Domain, Range, Inverse)": 5,
          "Linear Functions": 6,
          "Composite Functions": 5,
          "Quadratic Functions": 5,
          "Reciprocal and Rational Functions": 4,
          "Logarithmic and Exponential Functions": 5,
          "Transformation of Graphs": 6,
        },
        Algebra: {
          "Arithmetic Progression": 5,
          "Compound Interest": 6,
          "Binomial Theorem": 5,
          "Geometric Progression": 5,
          Exponents: 4,
          Logarithms: 5,
        },
        Calculus: {
          "Chain Rule": 5,
          "Derivativies of Standard Functions": 6,
          "Integration by Substitution": 5,
          Kinematics: 5,
          "Product Rule": 4,
          "Indefinite Integration": 5,
          "Areas of Regions enclosed by Curves": 6,
          "Definite Integrals": 6,
          "Minimum/Maximum/Inflection points": 4,
          Optimisation: 5,
          "Quotient Rule": 4,
          "Tangents and Normals at a given point": 7,
          "Second Derivative (Concavity)": 5,
        },
        "Geometry and Trigonometry": {
          "Distances and Midway Points": 5,
          "Sine and Cosine Theorems": 6,
          "Pythagorean Identity": 5,
          "Double Angle Identity": 5,
          "Trigonometric Equations": 4,
          "Unit Circle": 5,
          "Circle Geometry": 6,
          "Volumes, Areas of 3D solids": 7,
          "Area of a Triangle": 5,
          "Circular Functions and Transformation": 6,
        },
        Statistics: {
          "Probability Basics(Definition, Complementary Events)": 5,
          "Mean, Median, Mode": 6,
          "Box-and-Whisker Plots": 5,
          "Quartiles and Interquartile range": 5,
          "Venn Diagrams": 3,
          "Binomial Distribution": 5,
          "Independent Events": 6,
          "Cumulative Frequency": 7,
          "Normal Distribution": 5,
          "Conditional Probabilities": 6,
          Histograms: 6,
          "Linear Regression": 6,
          "Scatter Diagrams and Line of Best Fit": 6,
          "Linear Correlation and Correlation Coefficient": 6,
        },
      },
      selectedTopic: "Functions and Equations",
      topics: {
        "Functions and Equations": 4,
        Algebra: 3,
        "Geometry and Trigonometry": 7,
        Calculus: 5,
        Statistics: 7,
      },
      suggestedTopics: {
        "Scatter Diagrams and Line of Best Fit": 6,
        "Normal Distribution": 5,
        "Trigonometric Equations": 3,
        "Reciprocal and Rational Functions": 4,
        Exponents: 4,
      },
      recentTests: ["14587", "24567", "92840"],
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
      .post("/profiles/userprofile", data)
      .then((response) => {
        if (response.data.hasOwnProperty("errors")) {
          console.log("session expired");
          this.setState({ redirect: true });
        } else {
          const responseData = response.data.data;
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

          this.setState({ loading: false, data: dataCopy });
        }
      })
      .catch((error) => {
        // console.log("error!");
        console.log("cannot get user info ");
        this.setState({ redirect: true });
        this.props.expired()
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
