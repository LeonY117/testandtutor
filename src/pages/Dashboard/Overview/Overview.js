import React, { useEffect, useState } from "react";
import classes from "./Overview.module.css";

import SubtopicSuggestions from "./SubtopicSuggestions/SubtopicSuggestions";

import Card from "components/UI/Card/Card";
import Button from "components/UI/Button/Button";
import Radar from "components/Radar/Radar";

function Overview(props) {
  const [radarDim, setRadarDim] = useState(0);

  const resizeHandler = () => {
    setTimeout(() => {
      setRadarDim(
        document.getElementsByClassName(classes.radar)[0].clientWidth
      );
    }, 200);
  };

  useEffect(() => {
    // has to be initialized at the end of the first render cycle
    setRadarDim(document.getElementsByClassName(classes.radar)[0].clientWidth);
    window.addEventListener("resize", resizeHandler);
    return () => {
      window.removeEventListener("resize", resizeHandler);
    };
  }, []);

  return (
    <div className={classes.overview}>
      <div className={classes.leftCard}>
        <Card>
          <div className={classes.radarWrapper}>
            <div className={classes.radar} style={{ height: radarDim }}>
              <Radar topics={props.topics} showText />
            </div>
          </div>
        </Card>
      </div>
      <div className={classes.overviewRight}>
        <div className={classes.rightCard}>
          <Card>
            <div className={classes.suggestions}>
              <h1>Suggested topics to study next</h1>
              <SubtopicSuggestions suggestions={props.suggestions} />
            </div>
          </Card>
        </div>
        <div className={classes.rightButtons}>
          <Button color="white" clicked={props.testButtonClicked}>
            Take Skillset Test
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Overview;
