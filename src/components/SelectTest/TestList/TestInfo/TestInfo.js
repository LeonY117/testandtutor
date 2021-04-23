import React from "react";
import Button from "../../../UI/Button/Button";
import classes from "./TestInfo.module.css";

const testInfo = (props) => {
  return (
    <div className={classes.TestInfo}>
      <div className={classes.Texts}>
        <p className={classes.Name}>{props.name}</p>
        <p className={classes.Length}>{props.length}</p>
        <p className={classes.Score}>{props.score}</p>
      </div>
      <div className={classes.Button}>
        <Button
          clicked={props.buttonClicked}
          color={props.buttonStyle ? props.buttonStyle : "white"}
        >
          {props.buttonInfo}
        </Button>
      </div>
    </div>
  );
};

export default testInfo;
