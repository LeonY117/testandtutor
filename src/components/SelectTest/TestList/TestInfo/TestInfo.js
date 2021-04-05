import React from "react";
import Button from "../../../UI/Button/Button";
import classes from "./TestInfo.module.css";

const testInfo = (props) => {
  return (
    <div className={classes.TestInfo}>
      <p>{props.name}</p>
      <p>{props.length}</p>
      <p>{props.score}</p>
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
