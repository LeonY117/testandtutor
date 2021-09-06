import React from "react";

//

/*
renders a list of questions for a given test
controlls whether or not the markscheme table is visible

PROPS
testBody: contains both the question and the markscheme
marks: contains the state for the marks (for the table)
showMarkscheme
inputChanged: for updating table cells

*/
const test = (props) => {
  let renderedQuestions = null;
  const testBodyCopy = [...props.testBody];
  if (props.testBody) {
    renderedQuestions = testBodyCopy.map((question) => {
      let markscheme = question.markscheme;
      return (
        <div>
          <Question questionData={question} />
          <div>
            <Markscheme markschemeData={markscheme} />
            <MarkschemeTable
              inputChanged={props.inputChanged}
              marks={props.marks}
            />
          </div>
        </div>
      );
    });
  } else {
    renderedQuestions = <p>Something went wrong</p>;
  }

  return null;
};

export default test;
