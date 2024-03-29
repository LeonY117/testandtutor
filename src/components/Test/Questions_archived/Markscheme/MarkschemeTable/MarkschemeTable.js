import React from "react";
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
  let qKey = (props.questionNumber - 1).toString();


  console.log('debugging from msTable')
  console.log(props.userMarks)
  cells = Object.keys(props.userMarks[qKey].parts).map((key) => {
    // console.log("Part: ", key);
    let partLabel = characterize(parseInt(key) + 1);
    let partKey = key; //to be passed down to the lower level
    // console.log(props.marks[qKey][key].subparts);
    if (Object.keys(props.userMarks[qKey].parts[key].subparts).length === 0) {
      return (
        <MarkschemeCell
          label={props.questionNumber + partLabel}
          userMarks={props.userMarks[qKey].parts[key].maximum_marks}
          key={props.questionNumber + partLabel}
          changed={(e) => props.inputChanged(e, qKey, key, null)}
          value={props.userMarks[qKey].parts[key].userMarks}
          max={props.userMarks[qKey].parts[key].maximum_marks}
        />
      );
    } else {
      // if there are subparts, render only the subpart cells
      let subparts = props.userMarks[qKey].parts[partKey].subparts;
      return Object.keys(subparts).map((key) => {
        // subpart label format: 1a, i
        let sublabel = romanize(parseInt(key) + 1);
        return (
          <MarkschemeCell
            label={props.questionNumber + partLabel + ", " + sublabel}
            userMarks={subparts[key].maximum_marks}
            key={props.questionNumber + partLabel + ", " + sublabel}
            changed={(e) => props.inputChanged(e, qKey, partKey, key)}
            value={subparts[key].userMarks}
            max={subparts[key].maximum_marks}
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
