import React from "react";
import Latex from "../../../../../../hoc/Latex/Latex";
import classes from "./SubPart.module.css";

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

const subpart = (props) => {
  return (
    <div>
      <Latex>
        <div className={classes.SubPart}>
          <div className={classes.LabelBodyWrapper}>
            <p className={classes.Label}>
              ({romanize(props.number)})
            </p>
            {/* <p className={classes.PartBody}>{props.title}</p> */}
            <p className={classes.Body}>{props.body}</p>
          </div>
          {props.marks > 0 ? (
            <p className={classes.Mark}>[{props.marks}]</p>
          ) : null}
        </div>
      </Latex>
    </div>
  );
};

export default subpart;
