import React from "react";
import classes from "./Test.module.css";
import Card from "../../components/UI/Card/Card";
import Question from "./Question/Question";
import Markscheme from "./Markscheme/Markscheme";
import MarkschemeTable from "./MarkschemeTable/MarkschemeTable";

//

/*
renders a list of questions for a given test
displays/hides markscheme table depending on props.showMarkscheme

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
        <div style={{ marginBottom: "2rem" }}>
          <Card>
            <div className={classes.QuestionMarkschemeWrapper}>
              <div className={classes.QuestionWrapper}>
                <Question questionData={question} />
              </div>
              {props.showMarkscheme ? (
                <div className={classes.MarkschemeWrapper}>
                  <Markscheme markschemeData={question.markscheme} />
                  <MarkschemeTable
                    inputChanged={props.inputChanged}
                    userMarks={props.userMarks}
                    questionNumber={question.question_number}
                  />
                </div>
              ) : null}
            </div>
          </Card>
        </div>
      );
    });
  } else {
    renderedQuestions = <p>Something went wrong</p>;
  }

  return <div className={classes.Test}>{renderedQuestions}</div>;
};

export default test;
