import React from "react";
import classes from "./Test.module.css";
import Card from "../../components/UI/Card/Card";
import Content from "../../hoc/Content/Content";
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
  if (props.testBody) {
    renderedQuestions = props.testBody.map((question, key) => {
      return (
        <div key={key} style={{ marginBottom: "2rem" }}>
          <Card>
            <div className={classes.QuestionMarkschemeWrapper}>
              <div className={classes.QuestionWrapper}>
                <h2>Question {parseInt(key) + 1}</h2>
                <Question questionData={question} />
              </div>
              {props.showMarkscheme ? (
                <div className={classes.MarkschemeWrapper}>
                  <h2>Markscheme</h2>
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

  return (
    <Content>
      <div className={classes.Test}>{renderedQuestions}</div>
    </Content>
  );
};

export default test;
