import React from "react";
import MarkschemePart from "./MarkschemePart/MarkschemePart";

const markscheme = (props) => {
  const markschemeData = props.markschemeData;
  let parts = markschemeData.parts;

  let ms_parts = null;
  ms_parts = parts.map((part, key) => {
    let subparts = part.subparts;
    let ms_subparts = null;
    ms_subparts = subparts.map((subpart, subKey) => {
      return (
        <MarkschemePart
          key={key + subKey}
          index={[parseInt(key), parseInt(subKey)]}
          body={subpart.markscheme_body}
          marks={subpart.marks}
        />
      );
    });
    return (
      <div>
        <MarkschemePart
          key={key}
          index={[parseInt(key), null]}
          body={part.markscheme_body}
          marks={part.marks}
        />
        {ms_subparts}
      </div>
    );
  });
  return (
    <div>
      <MarkschemePart
        index={[null, null]}
        body={markschemeData.markscheme_body}
        marks={markschemeData.marks}
      />
      {ms_parts}
    </div>
  );
};

export default markscheme;
