import React from "react";
import Latex from "../../../../../hoc/Latex/Latex";
import classes from "./Part.module.css";
import SubPart from "./SubPart/SubPart";

const part = (props) => {
  let subparts = null;
  subparts = props.subparts.map((subpart) => {
    return (
      <SubPart
        marks={subpart.marks}
        number={subpart.subpart}
        body={subpart.question_body}
        key={subpart.subpart}
      />
    );
  });
  return (
    <Latex>
      <div className={classes.Part}>
        <div className={classes.LabelBodyWrapper}>
          <p className={classes.PartLabel}>
            ({String.fromCharCode(96 + props.number)})
          </p>
          {/* <p className={classes.PartBody}>{props.title}</p> */}
          <div className={classes.PartBody}>
            <p>{props.body}</p>
            {subparts}
          </div>
        </div>
        {Object.keys(props.subparts).length === 0 ? (
          <p className={classes.Mark}>[{props.marks}]</p>
        ) : null}
      </div>
    </Latex>
  );
};

export default part;
