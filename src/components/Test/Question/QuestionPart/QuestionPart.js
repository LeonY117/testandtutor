import React from "react";
import classes from "./QuestionPart.module.css";
import Latex from "../../../../hoc/Latex/Latex";
// import image from '../../../../assets/images/AA/SL/Calculus/calculus_q1.png'
/*
The lowest level of question display in the form of: 
(prefix) + question body + associated mark

PROPS
index: to determine if the rendered component is a part or a subpart
body:
marks

*/

const sizeMapping = {
  XS: { size: 10, minSize: 10 },
  S: { size: 15, minSize: 20 },
  M: { size: 25, minSize: 20 },
  L: { size: 35, minSize: 20 },
  XL: { size: 50, minSize: 20 },
};

const questionPart = (props) => {
  let body = props.body;
  let prefixRender = null;
  let bodyRender = null;
  let marksRender = null;
  let classArray = [classes.QuestionPart];

  if (props.index[0] != null && props.index[1] === null) {
    classArray.push(classes.Part);
  } else if (props.index[0] != null && props.index[1] != null) {
    if (!props.pseudoPrefix) {
      classArray.push(classes.SubPart);
    }
  }

  // if (props.index[0] != null) {
  //   prefixRender = (
  //     <p className={classes.Prefix}>{getQuestionPrefix(props.index)} </p>
  //   );
  // }

  //   used to reduce margin for i, ii, etc
  let prefixClasses = [classes.Prefix];
  if (props.index[1] != null) {
    prefixClasses.push(classes.PrefixShort);
  }
  if (props.index[0] != null) {
    if (!props.pseudoPrefix) {
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

  bodyRender = body.map((item, key) => {
    if (item.type === "string") {
      return (
        <p key={key} className={classes.QuestionBodyText}>
          {item.content}
        </p>
      );
    } else if (item.type === "image") {
      let renderedImage = <p style={{ color: "red" }}>Something went wrong</p>;
      try {
        let name = item.path;
        // name = "AA/SL/Calculus/calculus_q1.png"; //REMOVE
        let width = sizeMapping["M"].size + 'rem';
        if (item.size) {
          width = sizeMapping[item.size].size + 'rem';
        }
        const imagePath = require("../../../../assets/images/IB/" + name).default;
        renderedImage = (
          <img
            src={imagePath}
            alt={item.alt}
            style={{ width: width}}
          />
        );
      } catch {
        renderedImage = <p style={{ color: "red" }}>{item.path} not found</p>;
      }
      return (
        <div key={key} className={classes.QuestionBodyImage}>
          {renderedImage}
        </div>
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
