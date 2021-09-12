import React from "react";
import classes from "./QuestionPart.module.css";
import Latex from "../../../../hoc/Latex/Latex";
/*
The lowest level of question display in the form of: 
(prefix) + question body + associated mark

PROPS
index: to determine if the rendered component is a part or a subpart
body:
marks

*/

const questionPart = (props) => {
  let body = props.body;
  let prefixRender = null;
  let bodyRender = null;
  let marksRender = null;
  let classArray = [classes.QuestionPart];

  if (props.index[0] != null && props.index[1] === null) {
    classArray.push(classes.Part);
  } else if (props.index[0] != null && props.index[1] != null) {
    classArray.push(classes.SubPart);
  }

  if (props.index[0] != null) {
    prefixRender = (
      <p className={classes.Prefix}>{getQuestionPrefix(props.index)} </p>
    );
  }

  bodyRender = body.map((item, key) => {
    if (item.type === "string") {
      return (
        <p key={key} className={classes.QuestionBodyText}>
          {item.content}
        </p>
      );
    } else if (item.type === "image") {
      return (
        <p key={key} className={classes.QuestionBodyImage}>
          image: {item.alt}
        </p>
      );
    } else {
      return null;
    }
  });

  marksRender = props.marks ? (
    <p className={classes.Marks}>[{props.marks}]</p>
  ) : null;

  return (
    <Latex>
      <div className={classArray.join(" ")}>
        <div className={classes.PrefixBody}>
          {prefixRender}
          <div className={classes.QuestionBody}>{bodyRender}</div>
        </div>
        {marksRender}
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

export default questionPart;
