import React from "react";
import classes from "./Markscheme.module.css";
import Latex from "../../../../hoc/Latex/Latex";
import MarkschemeTable from "./MarkschemeTable/MarkschemeTable";
import MarkschemePart from "./MarkschemePart/MarkschemePart";

const markscheme = (props) => {
  let markscheme = null;
  // the way marks are mapped to the markscheme_body is very ad hoc,
  // here we just do a bit of reorganization to the data to make rendering
  // easier

  let values = {};

  for (let i = 0; i < props.markscheme.content.length; i++) {
    values[i] = undefined;
  }

  for (let i in props.markscheme.values) {
    let item = props.markscheme.values[i];
    if (values[item.index] === undefined) {
      values[item.index] = [
        {
          type: item.type,
          value: item.value,
          implicit: item.implicit,
        },
      ];
    } else {
      values[item.index].push({
        type: item.type,
        value: item.value,
        implicit: item.implicit,
      });
    }
  }
  if (props.markscheme.parts.length != 0) {
    markscheme = props.markscheme.content.map((item, i) => {
      let marks = null;
      if (values[i] !== undefined) {
        marks = values[i].map((item) => {
          return (
            <p className={item.implicit ? [classes.Value, classes.Implicit].join(' ') : classes.Value}>
              {item.type}
              {item.value}
            </p>
          );
        });
      }
      if (item.type === "string") {
        return (
          <div className={classes.Markscheme}>
            <div className={classes.MarkschemeContent}>
              <p className={classes.MsBody}>{item.content}</p>
            </div>
            <div className={classes.Marks}>{marks}</div>
          </div>
        );
      } else if (item.type === "image") {
        return (
          <div className={classes.Markscheme}>
            <div className={classes.MarkschemeContent}>
              <p className={classes.MsImage}>image placeholder</p>
            </div>
            <div className={classes.Marks}>{marks}</div>
          </div>
        );
      }
    });
  }

  let parts = props.markscheme.parts.map((part) => {
    return (
      <MarkschemePart
        id={part.id}
        markscheme = {part}
        number = {part.part}
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
            {markscheme}
            {parts}
          </div>
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
