import React, { Component } from "react";
import axios from "../../axios";
import Questions from "../../components/Test/Questions/Questions";

class testPaper extends Component {
  state = { paperId: null, testBody: [] };

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
    const fakeResponse = [this.props.match.params.id];
    console.log("temporary question (just 1):" + fakeResponse);

    // const questionIdsCopy = [...this.state.questionIds]
    // for (let questionId in fakeResponse) {
    //   questionIdsCopy.push(questionId)
    // }
    // this.setState({questionIds: questionIdsCopy})

    const testBodyCopy = [];
    const headers = {
      headers: { Authorization: `Bearer ${this.props.accessToken}` },
    };
    for (let i in fakeResponse) {
      axios
        .post("/questions/test", {'data': {"testId": fakeResponse[i]}}, headers)
        .then((response) => {
          if (response.data.hasOwnProperty("errors")) {
            console.log("errors!");
            console.log(response.data.errors)
          } else {
            testBodyCopy.push(response.data.data);
            this.setState({testBody: testBodyCopy})
          }
        })
        .catch((error) => {
          console.log("error!");
        });
    }
  }
  render() {
    return (
      <div>
        <Questions
          testBody={this.state.testBody}
        />
      </div>
    );
  }
}

export default testPaper;
