import React, { Component } from "react";
import MarkschemeCell from "./MarkschemeCell/MarkschemeCell";
import classes from "./MarkschemeTable.module.css";

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

function characterize(num) {
  return String.fromCharCode(96 + num);
}
const markschemeTable = (props) => {
  let cells = null;
  let questionNumber = props.questionNumber
  let qKey = (props.questionNumber - 1).toString();

  cells = Object.keys(props.marks[qKey]).map((key) => {
    // console.log("Part: ", key);
    let partLabel = characterize(parseInt(key) + 1);
    let partKey = key; //to be passed down to the lower level
    // console.log(props.marks[qKey][key].subparts);
    if (Object.keys(props.marks[qKey][key].subparts).length === 0) {
      return (
        <MarkschemeCell
          label={props.questionNumber + partLabel}
          marks={props.marks[qKey][key].maximum_marks}
          key={props.questionNumber + partLabel}
          changed={(e) => props.inputChanged(e, qKey, key, null)}
          value={props.marks[qKey][key].marks}
        />
      );
    } else {
      // if there are subparts, render only the subpart cells
      let subparts = props.marks[qKey][partKey].subparts;
      return Object.keys(subparts).map((key) => {
        // subpart label format: 1a, i
        let sublabel = romanize(parseInt(key) + 1);
        return (
          <MarkschemeCell
            label={props.questionNumber + partLabel + ", " + sublabel}
            marks={subparts[key].maximum_marks}
            key={props.questionNumber + partLabel + ", " + sublabel}
            changed={(e) => props.inputChanged(e, qKey, partKey, key)}
            value={subparts[key].marks}
          />
        );
      });
    }
  });
  return <div className={classes.Table}>{cells}</div>;
};

export default markschemeTable;
// class MarkschemeTable extends Component {
//   render() {

//     return ;
//   }
// }

// export default MarkschemeTable;
