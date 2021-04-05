import React from "react";
import Aux from "../../hoc/Aux";
import Logo from "../Logo/Logo";
import classes from "./Landing.module.css";
import Card from "../UI/Card/Card";

import image1 from "../../assets/images/personStudyingMath.jpg";
import image2 from "../../assets/images/radar5.png";
import image3 from "../../assets/images/suggestions.png";
import image4 from "../../assets/images/distribution.png";

const landing = (props) => {
  return (
    <Aux>
      <div className={classes.LandingBanner}>
        <div className={classes.Logo}>
          <Logo />
        </div>
        <h1>Personalised Study Planner for IB Mathematics</h1>
        <a href="/">GET EXCLUSIVE ACCESS NOW</a>
      </div>

      <div className={classes.LandingInfos}>
        <div className={classes.LandingInfo}>
          <div className={classes.Description}>
            <h1>
              Get a <strong>7</strong> in IB Mathematics
            </h1>
            <p>
              Statistical models built specifically for IB Mathematics to
              determine the optimal path for you to achieve the your best grades
            </p>
          </div>
          <div className={classes.CardWrapper}>
            <img
              alt={"Illustration of a person studying maths"}
              src={image1}
              className={classes.Illustration}
              draggable={false}
            />
          </div>
        </div>

        <div className={classes.LandingInfo}>
          <div className={classes.CardWrapper}>
            <Card>
              <img
                alt={
                  "Illustration of a radar chart displaying relative strengths of a student"
                }
                src={image2}
                className={classes.Illustration}
                draggable={false}
              />
            </Card>
          </div>
          <div className={classes.Description}>
            <h1>
              <strong>Personalised</strong> <br />
              Study Plans
            </h1>
            <p>
              We provide you with personalised suggestions for topics to study
              next, so that you can always focus on your biggest weaknesses.
            </p>
          </div>
        </div>

        <div className={classes.LandingInfo}>
          <div className={classes.Description}>
            <h1>
              <strong>Insights</strong> into your strengths and weaknesses
            </h1>
            <p>
              We track your long term performance from hundreds of labelled
              questions, and provide you with insights into your relative
              performance in each topic.
            </p>
          </div>
          <div className={classes.CardWrapper} style={{padding: '2rem'}}>
            <Card>
              <img
                alt={"Illustration of a list of suggested topics"}
                src={image3}
                className={classes.Illustration}
                draggable={false}
              />
            </Card>
          </div>
        </div>

        <div className={classes.LandingInfo}>
          <div className={classes.CardWrapper}>
            <Card>
              <img
                alt={
                  "Illustration of a probability distribution of a student's grade"
                }
                src={image4}
                className={classes.Illustration}
                draggable={false}
              />
            </Card>
          </div>
          <div className={classes.Description}>
            <h1>
              Track your <strong>predicted grade</strong>
            </h1>
            <p>
              The statistical model uses your performances in each topic to
              predict what grade you are most likely to get in your final exam.
            </p>
          </div>
        </div>
      </div>
    </Aux>
  );
};

export default landing;
