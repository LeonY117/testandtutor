import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import classes from './TestList.module.css';

import Button from 'components/UI/Button/Button';

const TestInfo = (props) => {
  return (
    <div className={classes.testInfo}>
      <div className={classes.rowFlexControl}>
        <div className={classes.testNameWrapper}>
          <Link to={`/user/test/${props.testId}`} className={classes.testName}>
            {props.name}
          </Link>
        </div>
        <div className={classes.lengthScoreWrapper}>
          <p className={classes.testLength}>{props.length}</p>
          <p className={classes.testScore}>{props.score}</p>
        </div>
        <div className={classes.buttonWrapper}>
          <Button
            clicked={props.buttonClicked}
            color={props.buttonColor}
            large
            secondary
          >
            {props.buttonInfo}
          </Button>
        </div>
      </div>
    </div>
  );
};

const TestList = (props) => {
  let tests = null;
  const history = useHistory();

  const testSelectButtonClicked = (id, status) => {
    // console.log(status);
    if (status === 'finished') {
      alert("Retaking tests won't affect your profile");
      history.push(`/user/test/${id}`);
    } else {
      history.push(`/user/test/${id}`);
    }
  };

  if (props.tests) {
    let testEntries = Object.entries(props.tests);
    console.log(testEntries)
    let sortedTests = testEntries.sort((a, b) => {
      // Assuming that the name of the test is something like Algebra Test 2
      let item_a = a[1].name.split(' ');
      let item_b = b[1].name.split(' ');
      let name_a = item_a[0].toLowerCase();
      let name_b = item_b[0].toLowerCase();
      let num_a = parseInt(item_a[2]);
      let num_b = parseInt(item_b[2]);
      // first order by name, then order by number
      if (name_a < name_b) {
        return -1;
      } else if (name_a > name_b) {
        return 1;
      } else {
        if (num_a < num_b) {
          return -1;
        } else if (num_a > num_b) {
          return 1;
        } else {
          return 0;
        }
      }
    });
    tests = sortedTests.map((testEntry) => {
      let testKey = testEntry[0];
      let test = testEntry[1];
      let status = test.status;
      let score = null;
      let buttonInfo = 'Take test';
      let buttonColor = 'orange';
      if (status === 'finished') {
        score = test.totalScore + '/' + test.score;
        buttonInfo = 'Retake test';
        buttonColor = 'white';
      }
      return (
        <TestInfo
          key={testKey}
          testId={testKey}
          name={test.name}
          length={test.length + ' min'}
          score={score}
          buttonInfo={buttonInfo}
          buttonColor={buttonColor}
          buttonClicked={() => testSelectButtonClicked(testKey, test.status)}
        />
      );
    });
  }

  return <div className={classes.testList}>{tests}</div>;
};

export default TestList;
