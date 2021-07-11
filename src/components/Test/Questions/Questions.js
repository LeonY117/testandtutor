import React from "react";
import Question from "./Question/Question";
import classes from "./Questions.module.css";

const questions = (props) => {
  let renderedQuestions = null;
  const testBodyCopy = [...props.testBody];
  if (props.testBody) {
    renderedQuestions = testBodyCopy.map((questionContent) => {
      let marks = questionContent.maximum_marks;
      let body = questionContent.question_body;
      let number = questionContent.question_number;
      let parts = questionContent.parts;
      let markscheme = questionContent.markscheme;
      return (
        <Question
          marks={marks}
          body={body}
          number={number}
          parts={parts}
          key={number}
          markscheme={markscheme}
          showMarkscheme={props.showMarkscheme}
          inputChanged={props.inputChanged}
          msMarks={props.marks}
        />
      );
    });
  } else {
    renderedQuestions = <p>Something went wrong</p>;
  }

  //   for (let i in props.testBody) {
  //     let questionContent = props.testBody[i];
  //   }
  return <div className={classes.Questions}>{renderedQuestions}</div>;
};

export default questions;
