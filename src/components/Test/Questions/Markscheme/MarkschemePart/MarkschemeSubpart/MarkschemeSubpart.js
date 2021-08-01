import React from "react";
import classes from "../../Markscheme.module.css";

function romanize(num) {
  var lookup = {
      ix: 9,
      v: 5,
      iv: 4,
      i: 1,
    },
    roman = "",
    i;
  for (i in lookup) {
    while (num >= lookup[i]) {
      roman += i;
      num -= lookup[i];
    }
  }
  return roman;
}

const markschemeSubpart = (props) => {
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

  return (
    <div className={[classes.Part, classes.SubPart].join(' ')}>
      <div className={classes.LabelBodyWrapper}>
      <p className={[classes.Label, classes.SubPartLabel].join(' ')}>({romanize(props.number)})</p>
        <div className={classes.MarkschemeContent}>
          {markscheme}
        </div>
      </div>
    </div>
    // <div className={[classes.Part, classes.SubPart].join(' ')}>
    //   <div className={classes.LabelBodyWrapper}>
    //     <p className={[classes.Label, classes.SubPartLabel].join(' ')}>({romanize(props.number)})</p>
    //     <div className={classes.Body}>{body}</div>
    //   </div>
    //   <p className={classes.Marks}>{marks}</p>
    // </div>
  );
};

export default markschemeSubpart;
