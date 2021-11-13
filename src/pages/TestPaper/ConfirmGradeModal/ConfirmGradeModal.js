import React from "react";
import classes from "./ConfirmGradeModal.module.css";

import MarkschemeTable from "components/Test/MarkschemeTable/MarkschemeTable";
import MarkschemeCell from "components/Test/MarkschemeTable/MarkschemeCell/MarkschemeCell";
import Button from "components/UI/Button/Button";

const sumQuestionScores = (question) => {
  let test_user_marks = 0;
  let test_max_marks = 0;

  if (question.parts.length === 0) {
    test_user_marks += question.user_marks;
    test_max_marks += question.max_marks;
  } else {
    for (const part of question.parts) {
      if (part.subparts.length === 0) {
        test_user_marks += part.user_marks;
        test_max_marks += part.max_marks;
      } else {
        for (const subpart of part.subparts) {
          test_user_marks += subpart.user_marks;
          test_max_marks += subpart.max_marks;
        }
      }
    }
  }

  return [test_user_marks, test_max_marks];
};

const ConfirmGrade = (props) => {
  const tables = Object.keys(props.userMarks).map((questionKey) => {
    const [userQuestionMarks, maxQuestionMarks] = sumQuestionScores(
      props.userMarks[questionKey]
    );
    return (
      <div className={classes.questionScores} key={questionKey}>
        <div className={classes.questionTotalWrapper}>
          <MarkschemeCell
            label={`Q${parseInt(questionKey) + 1}`}
            changed={() => {
              return;
            }}
            value={userQuestionMarks}
            max={maxQuestionMarks}
            readOnly={true}
          />
        </div>
        <div className={classes.questionPartsWrapper}>
          <MarkschemeTable
            inputChanged={props.inputChangedHandler}
            userMarks={props.userMarks}
            questionNumber={parseInt(questionKey) + 1}
          />
        </div>
      </div>
    );
  });

  const totalScore = (
    <MarkschemeCell
      label={"Total"}
      changed={() => {
        return;
      }}
      value={props.userTotalMarks[0]}
      max={props.userTotalMarks[1]}
      readOnly={true}
    />
  );

  return (
    <div className={classes.confirmGrade}>
      <h2>Check that you've entered your scores correctly</h2>
      <div className={classes.tableWrapper}>{tables}</div>
      <div className={classes.testotalScore}>{totalScore}</div>
      <div className={classes.buttonWrapper}>
        <Button clicked={props.submitHandler}>Submit</Button>
      </div>
    </div>
  );
};

export default ConfirmGrade;
