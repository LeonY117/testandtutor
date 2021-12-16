import React, { useState, useContext, useEffect } from "react";
import { useHistory, useLocation } from "react-router";
import classes from "./TestPaper.module.css";

import Test from "components/Test/Test";
import ConfirmGrade from "./ConfirmGradeModal/ConfirmGradeModal";

import Content from "hoc/Content/Content";
import Button from "components/UI/Button/Button";
import Loading from "components/Loading/Loading";
import Pagination from "components/Pagination/Pagination";
import Modal from "components/Modal/Modal";

import AuthContext from "store/auth-context";
import axios from "store/axios";

// some helper functions
const compare = (a, b) => {
  if (a.max_marks > b.max_marks) {
    return -1;
  }
  if (a.max_marks < b.max_marks) {
    return 1;
  }
  return 0;
};

const sum = (items, prop) => {
  if (items === []) {
    return 0;
  }
  return items.reduce(function (a, b) {
    return a + b[prop];
  }, 0);
};

const boundValue = (value, max) => {
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
};

const replaceValue = (value) => {
  // return the most recent digit inputed
  return value % 10;
};

const sumUserScores = (marks) => {
  let test_user_marks = 0;
  let test_max_marks = 0;
  for (const i in marks) {
    const question = marks[i];
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
  }
  return [test_user_marks, test_max_marks];
};

const TestPaper = (props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [showMarkscheme, setShowMarkscheme] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [userMarks, setUserMarks] = useState({});
  const [test, setTest] = useState([]);
  const [selectedQuestion, setSelectedQuestion] = useState(0);
  const [allQuestionsVisited, setAllQuestionsVisited] = useState(false);
  const [visitedQuestion, setVisitedQuestion] = useState([]);
  const [retake, setRetake] = useState(false);

  const authCtx = useContext(AuthContext);
  const history = useHistory();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const questionNumber = queryParams.get("question");
  const testId = props.match.params.id;

  const paginationChangedHandler = (n, increment) => {
    if (n === null) {
      let questionNum = boundValue(
        selectedQuestion + increment,
        test.length - 1
      );
      history.push(`?question=${questionNum + 1}`);
    } else {
      history.push(`?question=${n}`);
    }
  };

  const inputChangedHandler = (
    event,
    questionIndex,
    partIndex,
    subpartIndex
  ) => {
    setUserMarks((prevState) => {
      const userMarksCopy = { ...prevState };
      if (partIndex === null && subpartIndex === null) {
        userMarksCopy[questionIndex].user_marks = boundValue(
          replaceValue(event.target.value),
          userMarksCopy[questionIndex].max_marks
        );
      } else if (partIndex !== null && subpartIndex === null) {
        userMarksCopy[questionIndex].parts[partIndex].user_marks = boundValue(
          replaceValue(event.target.value),
          userMarksCopy[questionIndex].parts[partIndex].max_marks
        );
      } else if (partIndex !== null && subpartIndex !== null) {
        userMarksCopy[questionIndex].parts[partIndex].subparts[
          subpartIndex
        ].user_marks = boundValue(
          replaceValue(event.target.value),
          userMarksCopy[questionIndex].parts[partIndex].subparts[subpartIndex]
            .max_marks
        );
      } else {
        console.log("error in input change handler");
      }
      return userMarksCopy;
    });
  };

  const backdropClickedHandler = () => {
    setShowModal(false);
  };

  const completeButtonClickedHandler = () => {
    setShowMarkscheme(true);
    history.push(`?question=${1}`);
  };

  const confirmHandler = () => {
    setShowModal(true);
  };

  const submitHandler = () => {
    const answers = [...Object.values(userMarks)];
    const results = {};
    [results["test_max_marks"], results["test_user_marks"]] =
      sumUserScores(userMarks);

    const data = {
      data: {
        testId: testId,
        answers: answers,
        results: results,
      },
    };

    // console.log("submit to backend!");
    // console.log(data);
    if (retake !== true) {
      axios
        .post("/tests/submit_test", data)
        .then((response) => {
          history.push("/user/testSubmitted");
          // TODO: handle response
        })
        .catch((error) => {
          // this.props.expired();
          console.log(error);
        });
    } else {
      history.push("/user/testSubmitted");
    }
  };

  useEffect(() => {
    let testBodyCopy = [];
    const userMarksCopy = {};
    axios
      .post("/questions/test", { data: { testId: testId } })
      .then((response) => {
        if (response.data.hasOwnProperty("errors")) {
          // TODO: Show user different messages depending on error
          console.log("errors!");
          console.log(response.data.errors);
        } else {
          let retakeCopy = response.data.data.previously_attempted;
          testBodyCopy = [...response.data.data.questions].sort(compare);

          for (const i in testBodyCopy) {
            let markscheme = { ...testBodyCopy[i]["markscheme"] };
            let question = testBodyCopy[i];
            // Generate user marks from response
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
                max_marks: sum(part.marks, "value"),
                user_marks: 0,
                subparts: Array(Object.keys(subparts).length),
              };
              for (let subpartKey in Object.keys(subparts)) {
                userMarksCopy[i].parts[partKey]["subparts"][subpartKey] = {
                  number: parseInt(subpartKey) + 1, // 1-indexed, for backend to locate subpart
                  max_marks: sum(subparts[subpartKey].marks, "value"),
                  user_marks: 0,
                };
              }
            }
          }
          const questionVisitedCopy = Array(testBodyCopy.length).fill(false);
          // if (questionVisitedCopy.length > 0) {
          //   questionVisitedCopy[0] = true;
          // }
          setRetake(retakeCopy);
          setUserMarks(userMarksCopy);
          setTest(testBodyCopy);
          setVisitedQuestion(questionVisitedCopy);
          setIsLoading(false);
          // console.log(testBodyCopy);
        }
      })
      .catch((error) => {
        console.log("error!");
        console.log(error);
        setIsLoading(false);
      });
  }, [authCtx, testId]);

  useEffect(() => {
    let questionNum = parseInt(questionNumber) - 1 || 0;
    setSelectedQuestion(questionNum);
    if (visitedQuestion.length > 0) {
      visitedQuestion[questionNum] = true;
    }
    // if (
    //   visitedQuestion.every((x) => x === true) &&
    //   visitedQuestion.length > 0
    // ) {
    //   setAllQuestionsVisited(true);
    // }
    if (parseInt(questionNumber) === test.length) {
      setAllQuestionsVisited(true);
    }
  }, [questionNumber, visitedQuestion, test.length]);

  let paginationRender = (
    <Pagination
      maxLabels={7}
      totalPages={test.length}
      selectedPage={selectedQuestion + 1}
      pageSelectHandler={paginationChangedHandler}
    />
  );

  let modalRender = (
    <Modal backdropClickedHandler={backdropClickedHandler}>
      <div className={classes.modalContentWrapper}>
        <ConfirmGrade
          userMarks={userMarks}
          userTotalMarks={sumUserScores(userMarks)}
          inputChangedHandler={inputChangedHandler}
          submitHandler={submitHandler}
        />
      </div>
    </Modal>
  );

  let paper = (
    <React.Fragment>
      {showModal && modalRender}
      <div className={classes.testPaper}>
        <div className={classes.paginationWrapper}>{paginationRender}</div>
        <div className={classes.testWrapper}>
          <Test
            selectedQuestion={selectedQuestion}
            testBody={test}
            userMarks={userMarks}
            showMarkscheme={showMarkscheme}
            inputChanged={inputChangedHandler}
          />
        </div>
        <div className={classes.paginationWrapper}>{paginationRender}</div>
        <div className={classes.completeButtonWrapper}>
          {!allQuestionsVisited && (
            <Button
              clicked={() => {
                paginationChangedHandler(null, 1);
              }}
            >
              Next
            </Button>
          )}
          {allQuestionsVisited && !showMarkscheme && (
            <Button clicked={completeButtonClickedHandler}>
              Mark Yourself
            </Button>
          )}
          {allQuestionsVisited && showMarkscheme && (
            <Button clicked={confirmHandler}>Confirm</Button>
          )}
        </div>
      </div>
    </React.Fragment>
  );

  return (
    <Content withNav>
      {isLoading && <Loading />} {!isLoading && paper}
    </Content>
  );
};

// class testPaper extends Component {
//   state = {
//     userId: "1234",
//     paperId: null,
//     testBody: {},
//     userMarks: {},
//     test_max_marks: 0,
//     test_user_marks: 0,
//     showMarkscheme: false,
//     loading: true,
//   };

//   testCompletedHandler = () => {
//     console.log("completed test");
//     this.setState({ showMarkscheme: true });
//   };

//   submitHandler = () => {
//     const answers = [...Object.values(this.state.userMarks)];
//     const results = {};
//     results["test_max_marks"] = this.state.test_max_marks;
//     results["test_user_marks"] = this.state.test_user_marks;

//     const data = {
//       data: {
//         userId: this.state.userId,
//         testId: this.state.paperId,
//         answers: answers,
//         results: results,
//       },
//     };
//     console.log("submit to backend!");
//     console.log(data);
//     axios
//       .post("/tests/submit_test", data)
//       .then((response) => {
//         console.log(response);
//       })
//       .catch((error) => {
//         this.props.expired();
//       });
//   };

//   sum = (items, prop) => {
//     if (items === []) {
//       return 0;
//     }
//     return items.reduce(function (a, b) {
//       return a + b[prop];
//     }, 0);
//   };

//   boundValue(value, max) {
//     if (value > max) {
//       return max;
//     }
//     if (value < 0) {
//       return 0;
//     }
//     if (value === null || isNaN(value) || value === "" || value === " ") {
//       return 0;
//     }
//     return parseInt(value);
//   }

//   inputChangedHandler = (event, questionIndex, partIndex, subpartIndex) => {
//     const userMarksCopy = { ...this.state.userMarks };
//     if (partIndex === null && subpartIndex === null) {
//       userMarksCopy[questionIndex].user_marks = this.boundValue(
//         event.target.value,
//         userMarksCopy[questionIndex].max_marks
//       );
//     } else if (partIndex !== null && subpartIndex === null) {
//       userMarksCopy[questionIndex].parts[partIndex].user_marks =
//         this.boundValue(
//           event.target.value,
//           userMarksCopy[questionIndex].parts[partIndex].max_marks
//         );
//     } else if (partIndex !== null && subpartIndex !== null) {
//       userMarksCopy[questionIndex].parts[partIndex].subparts[
//         subpartIndex
//       ].user_marks = this.boundValue(
//         event.target.value,
//         userMarksCopy[questionIndex].parts[partIndex].subparts[subpartIndex]
//           .max_marks
//       );
//     } else {
//       console.log("error in input change handler");
//     }
//     let [test_user_marks, test_max_marks] = sumUserScores(userMarksCopy);
//     // console.log(userMarksCopy[questionIndex]);
//     this.setState({
//       userMarks: userMarksCopy,
//       test_user_marks: test_user_marks,
//       test_max_marks: test_max_marks,
//     });
//   };

//   componentDidUpdate() {
//     if (!this.state.userId) {
//       this.props.expired();
//     }
//   }

//   componentDidMount() {
//     window.scrollTo(0, 0);
//     let testBodyCopy = null;
//     const userMarksCopy = {};

//     const fakeId = this.props.match.params.id;
//     console.log("request this question id: " + fakeId);

//     // const headers = {
//     //   headers: { Authorization: `Bearer ${this.props.accessToken}` },
//     // };

//     axios
//       .post("/questions/test", { data: { testId: fakeId } })
//       .then((response) => {
//         if (response.data.hasOwnProperty("errors")) {
//           // Show user different messages depending on error
//           console.log("errors!");
//           console.log(response.data.errors);
//         } else {
//           console.log("from TestPaper.js:");
//           console.log(response.data);
//           testBodyCopy = [...response.data.data.questions].sort(compare);

//           for (let i in testBodyCopy) {
//             // This line will be removed once backend is updated with markscheme data
//             // The markscheme attribute should already be contained in the question
//             // if (!testBodyCopy[i]["markscheme"]) {
//             // if (i === "0" || i === "1") {
//             //   testBodyCopy[i]["markscheme"] = dummyMarkscheme;
//             // }
//             // initiate empty question object
//             let markscheme = { ...testBodyCopy[i]["markscheme"] };
//             let question = testBodyCopy[i];
//             userMarksCopy[i] = {
//               id: question.id,
//               parts: Array(Object.keys(markscheme.parts).length),
//               user_marks: 0,
//               max_marks: question.max_marks,
//             };
//             for (let partKey in Object.keys(markscheme.parts)) {
//               // Generate template for part marks
//               let part = { ...markscheme.parts[partKey] };
//               let subparts = { ...part.subparts };
//               userMarksCopy[i].parts[partKey] = {
//                 id: part.id,
//                 max_marks: this.sum(part.marks, "value"),
//                 user_marks: 0,
//                 subparts: Array(Object.keys(subparts).length),
//               };
//               for (let subpartKey in Object.keys(subparts)) {
//                 userMarksCopy[i].parts[partKey]["subparts"][subpartKey] = {
//                   number: parseInt(subpartKey) + 1, // 1-indexed, for backend to locate subpart
//                   max_marks: this.sum(subparts[subpartKey].marks, "value"),
//                   user_marks: 0,
//                 };
//               }
//             }
//           }
//           this.setState({
//             testBody: testBodyCopy,
//             loading: false,
//             userMarks: userMarksCopy,
//             paperId: fakeId,
//           });
//           // console.log(testBodyCopy);
//         }
//       })
//       .catch((error) => {
//         console.log("error!");
//         console.log(error);
//       });
//   }
//   render() {
//     // table at bottom
//     let tables = null;
//     if (this.state.userMarks && this.state.showMarkscheme) {
//       tables = Object.keys(this.state.userMarks).map((questionKey) => {
//         return (
//           <MarkschemeTable
//             key={questionKey}
//             inputChanged={this.inputChangedHandler}
//             userMarks={this.state.userMarks}
//             questionNumber={parseInt(questionKey) + 1}
//           />
//         );
//       });
//     }

//     let paper = <Loading />;
//     if (this.state.loading === false) {
//       paper = (
//         <div>
//           <Content>
//             <Test
//               testBody={this.state.testBody}
//               userMarks={this.state.userMarks}
//               showMarkscheme={this.state.showMarkscheme}
//               inputChanged={this.inputChangedHandler}
//             />
//             <div className={classes.SummaryTable}>{tables}</div>
//             <div className={classes.ButtonWrapper}>
//               {this.state.showMarkscheme ? (
//                 <Button clicked={this.submitHandler}>Submit</Button>
//               ) : (
//                 <Button clicked={this.testCompletedHandler}>Complete</Button>
//               )}
//             </div>
//           </Content>
//         </div>
//       );
//     }
//     return <div>{paper}</div>;
//   }
// }

export default TestPaper;
