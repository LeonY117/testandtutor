import React, { useState } from 'react';
import classes from './TestLists.module.css';

import Card from 'components/UI/Card/Card';
import Select from 'components/UI/Select/Select';
import TestList from './TestList/TestList';

const TestLists = (props) => {
  const tests = props.tests;

  const [selectedTopic, setSelectedTopic] = useState('Algebra');
  // TODO: this should be retrieved from context
  const topics = [
    'All Tests',
    'Algebra',
    'Functions',
    'Statistics',
    'Trigonometry',
    'Calculus',
  ];

  const selectChangedHandler = (e) => {
    let topic = e.target.value;
    setSelectedTopic(topic);
  };

  // TODO: this is not the best way to make filters, should use filter
  const completeTestObj = {};
  const incompleteTestObj = {};

  for (const testId in tests) {
    let test = tests[testId];
    if (test.status === 'finished') {
      if (selectedTopic === 'All Tests' || test.topic === selectedTopic) {
        completeTestObj[testId] = test;
      }
    } else if (test.status === 'unfinished') {
      if (selectedTopic === 'All Tests' || test.topic === selectedTopic) {
        incompleteTestObj[testId] = test;
      }
    }
  }

  const completeTestList = (
    <React.Fragment>
      <p className={classes.testTitle}>Completed Tests</p>
      <TestList tests={completeTestObj} />
    </React.Fragment>
  );

  const incompleteTestList = (
    <React.Fragment>
      <p className={classes.testTitle}>Incomplete Tests</p>
      <TestList tests={incompleteTestObj} />
    </React.Fragment>
  );

  const testListCard = (
    <div className={classes.selectTest}>
      <Card pageWrapper>
        <div className={classes.dropdownWrapper}>
          <Select
            options={topics}
            round
            changed={selectChangedHandler}
            selected={selectedTopic}
          />
        </div>
        {Object.keys(completeTestObj).length > 0 && completeTestList}
        {Object.keys(incompleteTestObj).length > 0 && incompleteTestList}
      </Card>
    </div>
  );

  return testListCard;
};

export default TestLists;
