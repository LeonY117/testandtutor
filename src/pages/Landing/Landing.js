import React from "react";
import { Link } from "react-router-dom";
import classes from "./Landing.module.css";

import Logo from "components/Logo/Logo";
import Card from "components/UI/Card/Card";
import Button from "components/UI/Button/Button";
import Question from "components/Test/Question/Question";
import Content from "hoc/Content/Content";

import image1 from "assets/images/personStudyingMath.jpg";
import dummyQuestionData from "./dummyQuestion.json";
import Radar from "components/Radar/Radar";

const dummyRadarData = {
  "Functions and Equations": 6,
  Algebra: 7,
  "Geometry and Trigonometry": 5,
  Calculus: 3,
  Statistics: 4,
};

const Landing = () => {
  return (
    <React.Fragment>
      <section className={classes.LandingBanner}>
        <div className={classes.logoWrapper}>
          <Logo />
        </div>
        <h2 className={classes.subtitle}>
          Personalised Study Planner for IB Mathematics
        </h2>
        <Link to="/signup">
          <Button size="large" round>
            GET STARTED NOW
          </Button>
        </Link>
      </section>

      <section className={classes.LandingInfos}>
        <Content>
          <div className={classes.LandingInfo}>
            <div className={classes.descriptionWrapper}>
              <h1>
                Get a <strong>7</strong> in IB Mathematics
              </h1>
              <p>
                Statistical models built specifically for IB Mathematics to
                determine the optimal path for you to achieve the your best
                grades
              </p>
            </div>
            <div className={classes.cardWidthControl}>
              <div className={classes.cardWrapper}>
                <Card blurShadow round>
                  <img
                    alt={"Illustration of a person studying maths"}
                    src={image1}
                    className={classes.Illustration}
                    draggable={false}
                  />
                </Card>
              </div>
            </div>
          </div>

          <div
            className={[classes.LandingInfo, classes.LandingInfoFlipped].join(
              " "
            )}
          >
            <div className={classes.cardWidthControl}>
              <div className={classes.cardWrapper}>
                <Card round blurShadow>
                  {/* <img
                  alt={
                    "Illustration of a radar chart displaying relative strengths of a student"
                  }
                  src={image2}
                  className={classes.Illustration}
                  draggable={false}
                /> */}
                  <Radar topics={dummyRadarData} showText />
                </Card>
              </div>
            </div>
            <div className={classes.descriptionWrapper}>
              <h1>
                <strong>Personalised</strong> <br />
                Insights
              </h1>
              <p>
                Studying should be an iterative process. <br />
                <br /> Test and tutor objectively identifies your strengths and
                weaknesses, and helps you decide what to study next.
              </p>
            </div>
          </div>

          <div className={classes.LandingInfo}>
            <div className={classes.descriptionWrapper}>
              <h1>
                <strong>Exam Style</strong> Questions
              </h1>
              <p>
                Hundreds of exam-style questions and their solutions, filtered
                by topic and subtopic.
              </p>
            </div>
            <div className={classes.cardWidthControl}>
              <div
                className={[classes.cardWrapper, classes.questionCard].join(
                  " "
                )}
              >
                <Card round blurShadow>
                  <div className={classes.questionWrapper}>
                    <Question questionData={dummyQuestionData} />
                  </div>
                </Card>
              </div>
            </div>
          </div>

          <div className={classes.actionButton}>
            <Link to="/signup">
              <Button size="large" round narrow>
                GET STARTED NOW
              </Button>
            </Link>
          </div>
        </Content>
      </section>
    </React.Fragment>
  );
};

export default Landing;
