import React from "react";
import MarkschemeSubpart from "./MarkschemeSubpart/MarkschemeSubpart";
// import classes from "./MarkschemePart.module.css";
import classes from "../Markscheme.module.css";

const markschemePart = (props) => {
  let markscheme = null;
  let subparts = null;

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

  if (props.markscheme.subparts.length > -1) {
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
          <div className={classes.BodyMarkWrapper}>
            <div className={classes.MarkschemeContent}>
              <p className={classes.MsBody}>{item.content}</p>
            </div>
            <div className={classes.Marks}>{marks}</div>
          </div>
        );
      } else if (item.type === "image") {
        return (
          <div className={classes.BodyMarkWrapper}>
            <div className={classes.MarkschemeContent}>
              <p className={classes.MsImage}>image placeholder</p>
            </div>
            <div className={classes.Marks}>{marks}</div>
          </div>
        );
      }
    });
  }

  // let body = null;
  // let marks = null;
  // body = props.content.map((item) => {
  //   if (item.type === "string") {
  //     return <p className={classes.MsBody}>{item.content}</p>;
  //   } else if (item.type === "image") {
  //     return <p className={classes.MsImage}>image placeholder</p>;
  //   }
  // });

  // marks = props.values.map((item) => {
  //   return (
  //     <p className={classes.Value}>
  //       {item.type}
  //       {item.value}
  //     </p>
  //   );
  // });

  subparts = props.subparts.map((subpart) => {
    return (
      <MarkschemeSubpart
        id={subpart.subpart}
        number={subpart.subpart}
        markscheme={subpart}
      />
    );
  });

  return (
    <div className={classes.Part}>
      <div className={classes.LabelBodyWrapper}>
        <p className={classes.Label}>
          ({String.fromCharCode(96 + props.number)})
        </p>
        <div className={classes.MarkschemeContent}>
          {markscheme} {subparts}
        </div>
      </div>
    </div>
  );
};

export default markschemePart;
