import React, { Component } from "react";
import axios from "../../axios";
import Questions from "../../components/Test/Questions/Questions";
import Button from "../../components/UI/Button/Button";
import Content from "../../hoc/Content/Content";
import classes from "./TestPaper.module.css";
import Loading from "../../components/Loading/Loading";
import MarkschemeTable from "../../components/Test/Questions/Markscheme/MarkschemeTable/MarkschemeTable";

function compare(a, b) {
  if (a.maximum_marks > b.maximum_marks) {
    return -1;
  }
  if (a.maximum_marks < b.maximum_marks) {
    return 1;
  }
  return 0;
}

class testPaper extends Component {
  state = {
    paperId: null,
    testBody: [],
    showMarkscheme: false,
    loading: true,
    marks: {},
  };

  /* 
  testBody: [
    {
      maximum_marks: 8
      question_body: 'blabla',
      question_number: 1,
      title: 'blabla'
      parts: [
        {
          id: dajfklsd;a,
          marks: 2,
          part: 1,
          title: 'solve blabla'
        }
        {
          id: dajfklsd;a,
          marks: 2,
          part: 2,
          title: 'solve blabla'
        }
        {
          id: dajfklsd;a,
          marks: 2,
          part: 3,
          title: 'solve blabla'
        }
      ]
    }
  ]
  */

  componentDidMount() {
    // console.log(this.props);
    // const data = {
    //   data: { testId: this.props.match.params.id },
    // };

    console.log("request for list of question Ids");
    const fakeResponse = this.props.match.params.id;
    console.log("temporary question (just 1):" + fakeResponse);

    // const questionIdsCopy = [...this.state.questionIds]
    // for (let questionId in fakeResponse) {
    //   questionIdsCopy.push(questionId)
    // }
    // this.setState({questionIds: questionIdsCopy})

    let testBodyCopy = null;
    const headers = {
      headers: { Authorization: `Bearer ${this.props.accessToken}` },
    };
    // Don't need to loop

    axios
      .post("/questions/test", { data: { testId: fakeResponse } }, headers)
      .then((response) => {
        if (response.data.hasOwnProperty("errors")) {
          console.log("errors!");
          console.log(response.data.errors);
        } else {
          // console.log(response.data.data)
          // testBodyCopy.push(response.data.data);
          console.log(response.data.data);
          // [...props.testBody].sort(compare)
          let testBodyCopy = [...response.data.data].sort(compare);
          console.log(testBodyCopy);
          let marksCopy = {};

          for (let i in testBodyCopy) {
            // initiate empty question object
            marksCopy[i] = {};
            let question = testBodyCopy[i];
            // console.log(question);
            Object.keys(question.parts).map((key) => {
              let partNum = key;
              // Generate template for part marks
              marksCopy[i][partNum] = {
                maximum_marks: question.parts[key].marks,
                marks: 0,
                subparts: {},
              };

              if (question.parts[key].subparts.length > 0) {
                let subparts = question.parts[key].subparts;
                Object.keys(subparts).map((key) => {
                  // Generate template for subpart marks
                  marksCopy[i][partNum]["subparts"][key] = {
                    maximum_marks: subparts[key].marks,
                    marks: 0,
                  };
                });
              }
            });
          }
          // console.log(testBodyCopy)
          this.setState({
            testBody: testBodyCopy,
            loading: false,
            marks: marksCopy,
          });
        }
      })
      .catch((error) => {
        console.log("error!");
        console.log(error);
      });
  }
  testCompletedHandler = () => {
    console.log("completed test");
    this.setState({ showMarkscheme: true });
  };

  submitHandler = () => {
    console.log('submit to backend!')
    console.log(this.state.marks);
  };

  boundValue(value, max) {
    if (value > max) {
      return max;
    }
    if (value < 0) {
      return 0;
    }
    return value;
  }

  inputChangedHandler = (event, questionIndex, partIndex, subpartIndex) => {
    const marksCopy = { ...this.state.marks };
    if (subpartIndex !== null) {
      marksCopy[questionIndex][partIndex].subparts[
        subpartIndex
      ].marks = this.boundValue(
        event.target.value,
        marksCopy[questionIndex][partIndex].subparts[subpartIndex].maximum_marks
      );
    } else {
      marksCopy[questionIndex][partIndex].marks = this.boundValue(
        event.target.value,
        marksCopy[questionIndex][partIndex].maximum_marks
      );
    }
    // console.log(marksCopy[questionIndex]);
    this.setState({ marks: marksCopy });
  };

  render() {
    let markscheme = null;
    if (this.state.showMarkscheme) {
      // need proper call here
      markscheme = this.state.testBody;
    }

    let tables = null;
    if (this.state.marks && this.state.showMarkscheme) {
      tables = Object.keys(this.state.marks).map((questionKey) => {
        return (
          <MarkschemeTable
            inputChanged={this.inputChangedHandler}
            marks={this.state.marks}
            questionNumber={parseInt(questionKey) + 1}
            key={questionKey}
          />
        );
      });
    }

    let paper = <Loading />;
    if (this.state.loading === false) {
      paper = (
        <div>
          <Content>
            <Questions
              testBody={this.state.testBody}
              markscheme={markscheme}
              marks={this.state.marks}
              showMarkscheme={this.state.showMarkscheme}
              inputChanged={this.inputChangedHandler}
            />
            <div className={classes.SummaryTable}>{tables}</div>
            <div className={classes.ButtonWrapper}>
              {this.state.showMarkscheme ? null : (
                <Button clicked={this.testCompletedHandler}>Complete</Button>
              )}
            </div>
            <div className={classes.ButtonWrapper}>
              {this.state.showMarkscheme ? (
                <Button clicked={this.submitHandler}>Submit</Button>
              ) : null}
            </div>
          </Content>
        </div>
      );
    }
    return <div>{paper}</div>;
  }
}

export default testPaper;
