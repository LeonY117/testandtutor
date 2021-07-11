import React from "react";
import MarkschemeSubpart from "./MarkschemeSubpart/MarkschemeSubpart";
// import classes from "./MarkschemePart.module.css";
import classes from "../Markscheme.module.css";

const markschemePart = (props) => {
  console.log(props.content);
  let body = null;
  let marks = null;
  let subparts = null;
  body = props.content.map((item) => {
    if (item.type === "string") {
      return <p className={classes.MsBody}>{item.content}</p>;
    } else if (item.type === "image") {
      return <p className={classes.MsImage}>image placeholder</p>;
    }
  });

  marks = props.values.map((item) => {
    return (
      <p className={classes.Value}>
        {item.type}
        {item.value}
      </p>
    );
  });

  subparts = props.subparts.map((subpart) => {
    return (
      <MarkschemeSubpart
        id={subpart.subpart}
        number={subpart.subpart}
        content={subpart.content}
        values={subpart.values}
      />
    );
  });

  return (
    <div className={classes.Part}>
      <div className={classes.LabelBodyWrapper}>
        <p className={classes.Label}>
          ({String.fromCharCode(96 + props.number)})
        </p>
        <div className={classes.Body}>
          {/* Should have condition here */}
          {body}
          {subparts}
        </div>
      </div>
      <p className={classes.Marks}>{marks}</p>
    </div>
  );
};

export default markschemePart;
