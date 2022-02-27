import React from "react";
import classes from "./TextArea.module.css";

const TextArea = (props) => {
  const classArray = [classes.textArea];
  if (props.size === "large") {
    classArray.push(classes.large);
  } else if (props.size === "medium") {
    classArray.push(classes.medium);
  } else if (props.size === "small") {
    classArray.push(classes.small);
  }
  return (
    <div className={classes.textAreaWrapper}>
      <textarea
        className={classArray.join(" ")}
        onChange={props.changed}
        placeholder={props.placeholder}
      ></textarea>
    </div>
  );
};

export default TextArea;
