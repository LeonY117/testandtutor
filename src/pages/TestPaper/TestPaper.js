import React, { Component } from "react";
import axios from "../../stores/axios";
import Test from "../../components/Test/Test";
// import Questions from "../../components/Test/Questions/Questions";
import Button from "../../components/UI/Button/Button";
import Content from "../../hoc/Content/Content";
import classes from "./TestPaper.module.css";
import Loading from "../../components/Loading/Loading";
import MarkschemeTable from "../../components/Test/MarkschemeTable/MarkschemeTable";
import Cookies from "js-cookie";

// const dummyMarkscheme = {
//   question_id: 1234,
//   markscheme_body: [
//     { type: "string", content: "this is a line of markscheme" },
//     { type: "string", content: "this is another line of the markscheme" },
//     { type: "image", path: "/path/to/image", alt: "the alt of the image" },
//   ],
//   marks: [
//     { type: "M", value: 1, implicit: false, index: 0 },
//     { type: "R", value: 1, implicit: false, index: 0 },
//     { type: "R", value: 2, implicit: false, index: 1 },
//     { type: "R", value: 2, implicit: true, index: 2 },
//   ],
//   parts: [
//     {
//       part_id: 1345,
//       markscheme_body: [
//         {
//           type: "string",
//           content: "this is a line of markscheme in the parts",
//         },
//         {
//           type: "string",
//           content: "this is another line of markscheme in the parts",
//         },
//       ],
//       marks: [
//         { type: "M", value: 1, implicit: false, index: 0 },
//         { type: "M", value: 1, implicit: false, index: 1 },
//       ],
//       subparts: [],
//     },
//     {
//       part_id: 78653,
//       markscheme_body: [
//         {
//           type: "string",
//           content: "this is line 2 of the markscheme in the parts",
//         },
//       ],
//       marks: [{ type: "M", value: 1, implicit: true, index: 0 }],
//       subparts: [],
//     },
//     {
//       part_id: 79864545,
//       markscheme_body: [],
//       marks: [],
//       subparts: [
//         {
//           subpart_id: 1894563,
//           markscheme_body: [
//             {
//               type: "string",
//               content: "this is a line of markscheme in the subpart",
//             },
//           ],
//           marks: [{ type: "R", value: 1, implicit: false, index: 0 }],
//         },
//         {
//           subpart_id: 7894563,
//           markscheme_body: [
//             {
//               type: "string",
//               content: "this is a line of markscheme in the subpart",
//             },
//             {
//               type: "string",
//               content: "this is a line of markscheme in the subpart",
//             },
//           ],
//           marks: [
//             { type: "M", value: 1, implicit: false, index: 0 },
//             { type: "R", value: 1, implicit: true, index: 1 },
//           ],
//         },
//       ],
//     },
//   ],
// };

function compare(a, b) {
  if (a.max_marks > b.max_marks) {
    return -1;
  }
  if (a.max_marks < b.max_marks) {
    return 1;
  }
  return 0;
}

function sumUserScores(userMarks) {
  let test_user_marks = 0;
  let test_max_marks = 0;
  for (let i in userMarks) {
    let question = userMarks[i];
    if (question.parts.length === 0) {
      test_user_marks += question.user_marks;
      test_max_marks += question.max_marks;
    } else {
      for (let j in question.parts) {
        let part = question.parts[j];
        if (part.subparts.length === 0) {
          test_user_marks += part.user_marks;
          test_max_marks += part.max_marks;
        } else {
          for (let k in part.subparts) {
            let subpart = part.subparts[k];
            test_user_marks += subpart.user_marks;
            test_max_marks += subpart.max_marks;
          }
        }
      }
    }
  }
  return [test_user_marks, test_max_marks];
}

class testPaper extends Component {
  state = {
    userId: '1234',
    paperId: null,
    testBody: {},
    userMarks: {},
    test_max_marks: 0,
    test_user_marks: 0,
    showMarkscheme: false,
    loading: true,
  };

  testCompletedHandler = () => {
    console.log("completed test");
    this.setState({ showMarkscheme: true });
  };

  submitHandler = () => {
    const answers = [...Object.values(this.state.userMarks)];
    const results = {};
    results["test_max_marks"] = this.state.test_max_marks;
    results["test_user_marks"] = this.state.test_user_marks;

    const data = {
      data: {
        userId: this.state.userId,
        testId: this.state.paperId,
        answers: answers,
        results: results,
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

  sum = (items, prop) => {
    if (items === []) {
      return 0;
    }
    return items.reduce(function (a, b) {
      return a + b[prop];
    }, 0);
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
    const userMarksCopy = { ...this.state.userMarks };
    if (partIndex === null && subpartIndex === null) {
      userMarksCopy[questionIndex].user_marks = this.boundValue(
        event.target.value,
        userMarksCopy[questionIndex].max_marks
      );
    } else if (partIndex !== null && subpartIndex === null) {
      userMarksCopy[questionIndex].parts[partIndex].user_marks =
        this.boundValue(
          event.target.value,
          userMarksCopy[questionIndex].parts[partIndex].max_marks
        );
    } else if (partIndex !== null && subpartIndex !== null) {
      userMarksCopy[questionIndex].parts[partIndex].subparts[
        subpartIndex
      ].user_marks = this.boundValue(
        event.target.value,
        userMarksCopy[questionIndex].parts[partIndex].subparts[subpartIndex]
          .max_marks
      );
    } else {
      console.log("error in input change handler");
    }
    let [test_user_marks, test_max_marks] = sumUserScores(userMarksCopy);
    // console.log(userMarksCopy[questionIndex]);
    this.setState({
      userMarks: userMarksCopy,
      test_user_marks: test_user_marks,
      test_max_marks: test_max_marks,
    });
  };

  componentDidUpdate() {
    if (!this.state.userId) {
      this.props.expired();
    }
  }

  componentDidMount() {
    window.scrollTo(0, 0);
    let testBodyCopy = null;
    const userMarksCopy = {};

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
          console.log("from TestPaper.js:");
          console.log(response.data);
          testBodyCopy = [...response.data.data.questions].sort(compare);

          for (let i in testBodyCopy) {
            // This line will be removed once backend is updated with markscheme data
            // The markscheme attribute should already be contained in the question
            // if (!testBodyCopy[i]["markscheme"]) {
            // if (i === "0" || i === "1") {
            //   testBodyCopy[i]["markscheme"] = dummyMarkscheme;
            // }
            // initiate empty question object
            let markscheme = { ...testBodyCopy[i]["markscheme"] };
            let question = testBodyCopy[i];
            userMarksCopy[i] = {
              id: question.id,
              parts: Array(Object.keys(markscheme.parts).length),
              user_marks: 0,
              max_marks: question.max_marks,
            };
            for (let partKey in Object.keys(markscheme.parts)) {
              // Generate template for part marks
              let part = { ...markscheme.parts[partKey] };
              let subparts = { ...part.subparts };
              userMarksCopy[i].parts[partKey] = {
                id: part.id,
                max_marks: this.sum(part.marks, "value"),
                user_marks: 0,
                subparts: Array(Object.keys(subparts).length),
              };
              for (let subpartKey in Object.keys(subparts)) {
                userMarksCopy[i].parts[partKey]["subparts"][subpartKey] = {
                  number: parseInt(subpartKey) + 1, // 1-indexed, for backend to locate subpart
                  max_marks: this.sum(subparts[subpartKey].marks, "value"),
                  user_marks: 0,
                };
              }
            }
          }
          this.setState({
            testBody: testBodyCopy,
            loading: false,
            userMarks: userMarksCopy,
            paperId: fakeId,
          });
          // console.log(testBodyCopy);
        }
      })
      .catch((error) => {
        console.log("error!");
        console.log(error);
      });
  }
  render() {
    // table at bottom
    let tables = null;
    if (this.state.userMarks && this.state.showMarkscheme) {
      tables = Object.keys(this.state.userMarks).map((questionKey) => {
        return (
          <MarkschemeTable
            key={questionKey}
            inputChanged={this.inputChangedHandler}
            userMarks={this.state.userMarks}
            questionNumber={parseInt(questionKey) + 1}
          />
        );
      });
    }

    let paper = <Loading />;
    if (this.state.loading === false) {
      paper = (
        <div>
          <Content>
            <Test
              testBody={this.state.testBody}
              userMarks={this.state.userMarks}
              showMarkscheme={this.state.showMarkscheme}
              inputChanged={this.inputChangedHandler}
            />
            <div className={classes.SummaryTable}>{tables}</div>
            <div className={classes.ButtonWrapper}>
              {this.state.showMarkscheme ? (
                <Button clicked={this.submitHandler}>Submit</Button>
              ) : (
                <Button clicked={this.testCompletedHandler}>Complete</Button>
              )}
            </div>
          </Content>
        </div>
      );
    }
    return <div>{paper}</div>;
  }
}

export default testPaper;
