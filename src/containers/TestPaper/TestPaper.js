import React, { Component } from "react";
import axios from "../../axios";
import Questions from "../../components/Test/Questions/Questions";
import Button from "../../components/UI/Button/Button";
import Content from "../../hoc/Content/Content";
import classes from "./TestPaper.module.css";
import Loading from "../../components/Loading/Loading";
import MarkschemeTable from "../../components/Test/Questions/Markscheme/MarkschemeTable/MarkschemeTable";
import Cookies from "js-cookie";

const dummyMarkscheme = {
  id: 1234,
  content: [
    { type: "string", content: "this is a line of markscheme" },
    { type: "image" },
  ],
  values: [
    { type: "M", value: 1 },
    { type: "R", value: 1 },
  ],
  parts: [
    {
      id: 1345,
      part: 1,
      content: [
        {
          type: "string",
          content: "this is a line of markscheme in the parts",
        },
      ],
      values: [{ type: "M", value: 1 }],
      subparts: [],
    },
    {
      id: 78653,
      part: 2,
      content: [
        {
          type: "string",
          content: "this is line 2 of the markscheme in the parts",
        },
      ],
      values: [{ type: "M", value: 1 }],
      subparts: [],
    },
    {
      id: 79864545,
      part: 3,
      content: [],
      values: [],
      subparts: [
        {
          id: 1894563,
          subpart: 1,
          content: [
            {
              type: "string",
              content: "this is a line of markscheme in the subpart",
            },
          ],
          values: [{ type: "R", value: 1 }],
        },
        {
          id: 7894563,
          subpart: 2,
          content: [
            {
              type: "string",
              content: "this is a line of markscheme in the subpart",
            },
          ],
          values: [{ type: "M", value: 1 }],
        },
      ],
    },
  ],
};

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
    userId: Cookies.get("userId"),
    paperId: null,
    testBody: {},
    marks: {},
    showMarkscheme: false,
    loading: true,
  };

  testCompletedHandler = () => {
    console.log("completed test");
    this.setState({ showMarkscheme: true });
  };

  submitHandler = () => {
    const answer = [...Object.values(this.state.marks)];

    const data = {
      data: {
        userId: this.state.userId,
        testId: this.state.paperId,
        answers: answer,
      },
    };
    console.log("submit to backend!");
    console.log(data);
    axios
      .post("/tests/submit_test", data)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        this.props.expired();
      });
  };

  boundValue(value, max) {
    if (value > max) {
      return max;
    }
    if (value < 0) {
      return 0;
    }
    if (value === null || isNaN(value) || value === "" || value === " ") {
      return 0;
    }
    return parseInt(value);
  }

  inputChangedHandler = (event, questionIndex, partIndex, subpartIndex) => {
    const marksCopy = { ...this.state.marks };
    if (subpartIndex !== null) {
      marksCopy[questionIndex].parts[partIndex].subparts[subpartIndex].marks =
        this.boundValue(
          event.target.value,
          marksCopy[questionIndex].parts[partIndex].subparts[subpartIndex]
            .maximum_marks
        );
    } else {
      marksCopy[questionIndex].parts[partIndex].marks = this.boundValue(
        event.target.value,
        marksCopy[questionIndex].parts[partIndex].maximum_marks
      );
    }
    // console.log(marksCopy[questionIndex]);
    this.setState({ marks: marksCopy });
  };

  componentDidUpdate() {
    if (!this.state.userId) {
      this.props.expired();
    }
  }

  componentDidMount() {
    window.scrollTo(0, 0);
    let testBodyCopy = null;
    const marksCopy = {};

    const fakeId = this.props.match.params.id;
    console.log("request this question id: " + fakeId);

    // const headers = {
    //   headers: { Authorization: `Bearer ${this.props.accessToken}` },
    // };

    axios
      .post("/questions/test", { data: { testId: fakeId } })
      .then((response) => {
        if (response.data.hasOwnProperty("errors")) {
          // Show user different messages depending on error
          console.log("errors!");
          console.log(response.data.errors);
        } else {
          console.log(response.data);
          testBodyCopy = [...response.data.data.questions].sort(compare);

          for (let i in testBodyCopy) {
            // This line will be removed once backend is updated with markscheme data
            testBodyCopy[i]["markscheme"] = dummyMarkscheme;
            // initiate empty question object
            let question = testBodyCopy[i];
            marksCopy[i] = {
              id: question.id,
              parts: Array(Object.keys(question.parts).length),
            };
            for (let partKey in Object.keys(question.parts)) {
              // Generate template for part marks
              let part = { ...question.parts[partKey] };
              let subparts = { ...part.subparts };
              marksCopy[i].parts[partKey] = {
                id: part.id,
                maximum_marks: part.marks,
                marks: 0,
                subparts: Array(Object.keys(subparts).length),
              };
              for (let key in Object.keys(subparts)) {
                marksCopy[i].parts[partKey]["subparts"][key] = {
                  number: parseInt(key) + 1,
                  maximum_marks: subparts[key].marks,
                  marks: 0,
                };
              }
            }
          }
          this.setState({
            testBody: testBodyCopy,
            loading: false,
            marks: marksCopy,
            paperId: fakeId,
          });
          console.log(marksCopy);
          console.log(testBodyCopy);
        }
      })
      .catch((error) => {
        console.log("error!");
        console.log(error);
      });
  }
  render() {
    let markscheme = null;
    if (this.state.showMarkscheme) {
      // need proper call here
      markscheme = dummyMarkscheme;
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
