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

  const body = props.content.map((item) => {
    if (item.type === "string") {
      return <p className={classes.MsBody}>{item.content}</p>;
    } else if (item.type === "image") {
      return <p className={classes.MsImage}>image placeholder</p>;
    }
  });
  const marks = props.values.map((item) => {
    return (
      <p className={classes.Value}>
        {item.type}
        {item.value}
      </p>
    );
  });
  return (
    <div className={[classes.Part, classes.SubPart].join(' ')}>
      <div className={classes.LabelBodyWrapper}>
        <p className={[classes.Label, classes.SubPartLabel].join(' ')}>({romanize(props.number)})</p>
        <div className={classes.Body}>{body}</div>
      </div>
      <p className={classes.Marks}>{marks}</p>
    </div>
  );
};

export default markschemeSubpart;
