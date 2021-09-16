import React from "react";
import Latex from "../../../../hoc/Latex/Latex";
import classes from "./MarkschemePart.module.css";

const markschemePart = (props) => {
  if (props.body.length === 0) {
    return null;
  }

  let classArray = [classes.MarkschemePart];
  let pseudoPrefix = false;
  if (props.index[0] != null && props.index[1] === null) {
    classArray.push(classes.Part);
  } else if (props.index[0] != null && props.index[1] != null) {
    if (props.index[1] === 0) {
      pseudoPrefix = true;
    } else {
      classArray.push(classes.Subpart);
    }
  }

  let prefixRender = null;
  //   used to reduce margin for i, ii, etc
  let prefixClasses = [classes.Prefix];
  if (props.index[1] != null) {
    prefixClasses.push(classes.PrefixShort);
  }
  if (props.index[0] != null) {
    if (!pseudoPrefix) {
      prefixRender = (
        <div className={prefixClasses.join(" ")}>
          {getQuestionPrefix(props.index)}{" "}
        </div>
      );
    } else {
      prefixRender = (
        <div className={classes.Pseudo}>
          <div className={classes.PseudoPrefix}>
            {getQuestionPrefix([props.index[0], null])}{" "}
          </div>
          <div className={prefixClasses.join(" ")}>
            {getQuestionPrefix(props.index)}{" "}
          </div>
        </div>
      );
    }
  }

  // the way marks are mapped to the markscheme_body is very ad hoc,
  // here we just do a bit of reorganization to the data to make rendering
  // easier
  // values map each line of the body array to a mark (if there exists one)
  let values = {};
  for (let i = 0; i < props.body.length; i++) {
    values[i] = undefined;
  }

  for (let i in props.marks) {
    let item = props.marks[i];
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

  let bodyMarkRender = props.body.map((item, i) => {
    let marks = null;
    if (values[i] !== undefined) {
      marks = values[i].map((item, key) => {
        return (
          <p
            key={key}
            className={
              item.implicit
                ? [classes.Mark, classes.Implicit].join(" ")
                : classes.Mark
            }
          >
            {item.type}
            {item.value}
          </p>
        );
      });
    }
    if (item.type === "string") {
      return (
        <div key={i} className={classes.BodyMarkWrapper}>
          <p className={classes.Body}>{item.content}</p>
          <div className={classes.Marks}>{marks}</div>
        </div>
      );
    } else if (item.type === "image") {
      return (
        <div key={i} className={classes.BodyMarkWrapper}>
          <p className={classes.Image}>image placeholder</p>
          <div className={classes.Marks}>{marks}</div>
        </div>
      );
    } else {
      return null;
    }
  });
  return (
    <Latex>
      <div className={classArray.join(" ")}>
        <div>{prefixRender}</div>
        <div className={classes.MsBody}>{bodyMarkRender}</div>
      </div>
    </Latex>
  );
};

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

function getQuestionPrefix(index) {
  if (index[1] != null) {
    return romanize(index[1] + 1) + ".";
  } else if (index[0] != null) {
    return "(" + String.fromCharCode(96 + index[0] + 1) + ")";
  } else if (index[0] == null) {
    return null;
  }
}

export default markschemePart;
