import React from "react";
import classes from "./Test.module.css";

import Question from "./Question/Question";
import Markscheme from "./Markscheme/Markscheme";
import MarkschemeTable from "./MarkschemeTable/MarkschemeTable";

import Card from "components/UI/Card/Card";

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
const Test = (props) => {
  // const [isLoading, setIsLoading] = useState(true);
  const selectedQuestion = props.selectedQuestion;
  let renderedQuestions = null;
  let question = props.testBody[selectedQuestion]; // 0-indexed

  if (props.testBody) {
    renderedQuestions = (
      <Card pageWrapper>
        <div className={classes.QuestionMarkschemeWrapper}>
          <div className={classes.QuestionWrapper}>
            <h2>Question {parseInt(selectedQuestion + 1)}</h2>
            <Question questionData={question} />
          </div>
          {props.showMarkscheme && (
            <div className={classes.MarkschemeWrapper}>
              <h2>Markscheme</h2>
              <Markscheme markschemeData={question.markscheme} />
            </div>
          )}
        </div>
        {props.showMarkscheme && (
          <div className={classes.markschemeTableWrapper}>
            <MarkschemeTable
              inputChanged={props.inputChanged}
              userMarks={props.userMarks}
              questionNumber={parseInt(selectedQuestion + 1)}
            />
          </div>
        )}
      </Card>
    );
  } else {
    renderedQuestions = <p>Something went wrong</p>;
  }

  return <div className={classes.Test}>{renderedQuestions}</div>;
};

export default Test;
