import React from "react";
import QuestionPart from "./QuestionPart/QuestionPart";

const question = (props) => {
  let body = props.questionData.question_body;
  let index = [null, null];
  let marks =
    props.parts && props.parts.length > 0
      ? null
      : props.questionData.maximum_marks;
  let parts = props.questionData.parts;

  let question_parts = null;
  question_parts = Object.keys(parts).map((key) => {
    let part = parts[key];
    let subparts = part.subparts;
    let body = part.question_body;
    let index = [parseInt(key), null];
    let marks = subparts.length > 0 ? null : part.marks;

    let question_subparts = null;
    question_subparts = Object.keys(subparts).map((subKey) => {
      let subpart = subparts[subKey];
      let [index, body, marks] = [
        [parseInt(key), parseInt(subKey)],
        subpart.question_body,
        subpart.marks,
      ];
      return (
        <QuestionPart
          key={key + subKey}
          index={index}
          body={body}
          marks={marks}
          pseudoPrefix={part.question_body.length === 0 && subKey === '0'}
        />
      );
    });
    return (
      <div key={key}>
        {body.length > 0 ? (
          <QuestionPart index={index} body={body} marks={marks} />
        ) : null}
        {question_subparts}
      </div>
    );
  });

  return (
    <div>
      {body.length > 0 ? (
        <QuestionPart index={index} body={body} marks={marks} />
      ) : null}
      {question_parts}
    </div>
  );
};

export default question;