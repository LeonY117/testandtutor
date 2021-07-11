import React from "react";
import classes from "./Markscheme.module.css";
import Latex from "../../../../hoc/Latex/Latex";
import MarkschemeTable from "./MarkschemeTable/MarkschemeTable";
import MarkschemePart from "./MarkschemePart/MarkschemePart";

const markscheme = (props) => {
  let markscheme = null;
  let marks = null;
  if (props.markscheme.parts.length == 0) {
    markscheme = props.markscheme.content.map((item) => {
      if (item.type === "string") {
        return <p className={classes.MsBody}>{item.content}</p>;
      } else if (item.type === "image") {
        return <p className={classes.MsImage}>image placeholder</p>;
      }
    });

    marks = props.markscheme.values.map((item) => {
      return (
        <p className={classes.Value}>
          {item.type}
          {item.value}
        </p>
      );
    });
  }

  let parts = props.markscheme.parts.map((part) => {
    return (
      <MarkschemePart
        id={part.id}
        number={part.part}
        content={part.content}
        values={part.values}
        subparts={part.subparts}
      />
    );
  });

  console.log(props.markscheme);
  return (
    <div>
      <Latex>
        <div className={classes.Markscheme}>
          <div className={classes.MarkschemeContent}>
            {markscheme ? markscheme : parts}
          </div>
          <div className={classes.Marks}>{marks}</div>
        </div>
      </Latex>

      <div className={classes.Table}>
        <MarkschemeTable
          inputChanged={props.inputChanged}
          marks={props.marks}
          questionNumber={props.questionNumber}
        />
      </div>
    </div>
  );
};

export default markscheme;
