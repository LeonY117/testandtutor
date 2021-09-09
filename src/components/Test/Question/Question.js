import React from "react";
import classes from "./Question.module.css";
import QuestionPart from "./QuestionPart/QuestionPart";

const question = (props) => {
  let body = props.questionData.question_body;
  let index = [null, null];
  let mark =
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
      return (
        <QuestionPart
          index={[parseInt(key), parseInt(subKey)]}
          body={subparts[subKey].question_body}
          marks={subparts[subKey].marks}
        />
      );
    });
    return (
      <div>
        <QuestionPart index={index} body={body} marks={marks} />
        {question_subparts}
      </div>
    );
  });

  return (
    <div>
      <QuestionPart index={index} body={body} mark={mark} />
      {question_parts}
    </div>
  );
};

export default question;
