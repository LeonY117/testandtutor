import React from "react";
import Aux from "../../hoc/Aux";
import Logo from "../Logo/Logo";
import classes from "./Landing.module.css";

import image1 from "../../assets/images/personStudyingMath.jpg";

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
              Our artificial intelligence built specifically for IB Mathematics
              can determine the optimal path for you to achieve the best grades
            </p>
          </div>
          <img src={image1} className={classes.Illustration} />
        </div>

        <div className={classes.LandingInfo}>
          <img src={image1} className={classes.Illustration} />
          <div className={classes.Description}>
            <h1>
              <strong>Personalised</strong> Study Plans
            </h1>
            <p>
              Our artificial intelligence built specifically for IB Mathematics
              can determine the optimal path for you to achieve the best grades
            </p>
          </div>
        </div>

        <div className={classes.LandingInfo}>
          <div className={classes.Description}>
            <h1>
              <strong>Insights</strong> into your strengths and weaknesses
            </h1>
            <p>
              Our artificial intelligence built specifically for IB Mathematics
              can determine the optimal path for you to achieve the best grades
            </p>
          </div>
          <img src={image1} className={classes.Illustration} />
        </div>

        <div className={classes.LandingInfo}>
          <img src={image1} className={classes.Illustration} />
          <div className={classes.Description}>
            <h1>
              Track your <strong>predicted grade</strong>
            </h1>
            <p>
              Our artificial intelligence built specifically for IB Mathematics
              can determine the optimal path for you to achieve the best grades
            </p>
          </div>
        </div>
      </div>
    </Aux>
  );
};

export default landing;
