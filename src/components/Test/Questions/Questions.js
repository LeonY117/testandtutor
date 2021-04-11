import React from "react";
import Question from "./Question/Question";
import classes from './Questions.module.css'

const questions = (props) => {
  let renderedQuestions = null;

  if (props.testBody) {
    renderedQuestions = Object.keys(props.testBody).map((i) => {
      let questionContent = props.testBody[i][0];
      let marks = questionContent.maximum_marks;
      let body = questionContent.question_body;
      let number = questionContent.question_number;
      let parts = questionContent.parts;
      return (
        <Question
          marks={marks}
          body={body}
          number={number}
          parts={parts}
          key={number}
          showMarkscheme={props.showMarkscheme}
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
