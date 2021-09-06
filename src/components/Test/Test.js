import React from "react";
import classes from "./Test.module.css";
import Question from "./Question/Question";
import Markscheme from "./Markscheme/Markscheme";
import MarkschemeTable from "./MarkschemeTable/MarkschemeTable";

//

/*
renders a list of questions for a given test
controlls whether or not the markscheme table is visible

PROPS
testBody: contains both the question and the markscheme
userMarks: for the displaying & updating markschemeTable
showMarkscheme
inputChanged: for updating table cells

*/
const test = (props) => {
  let renderedQuestions = null;
  const testBodyCopy = [...props.testBody];
  if (props.testBody) {
    renderedQuestions = testBodyCopy.map((question) => {
      return (
        <div>
          <Question questionData={question} />
          <div>
            <Markscheme markschemeData={question.markscheme} />
            {props.showMarkscheme ? (
              <MarkschemeTable
                inputChanged={props.inputChanged}
                userMarks={props.userMarks}
                questionNumber = {question.question_number}
              />
            ) : null}
          </div>
        </div>
      );
    });
  } else {
    renderedQuestions = <p>Something went wrong</p>;
  }

  return <div className={classes.Test}>{renderedQuestions}</div>;
};

export default test;
