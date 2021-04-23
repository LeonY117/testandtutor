import React from "react";
import Part from "./Part/Part";
import Latex from "../../../../hoc/Latex/Latex";
import Card from "../../../../components/UI/Card/Card";
import classes from "./Question.module.css";
import Markscheme from "../Markscheme/Markscheme";
import img from "../../../../assets/images/radar.png";

function stringToImg(string) {
  // console.log(string);
  return <img src={img} alt={"hello"} />;
}

const question = (props) => {
  let renderedParts = null;

  renderedParts = props.parts.map((part) => {
    return (
      <Part
        subparts={part.subparts}
        marks={part.marks}
        title={part.title}
        body={part.question_body}
        number={part.part}
        key={part.part}
      />
    );
  });

  let markscheme = null;
  if (props.showMarkscheme) {
    markscheme = (
      <div className={classes.Markscheme}>
        <Markscheme
          inputChanged={props.inputChanged}
          markscheme={null}
          marks={props.msMarks} //sorry about the bad prop names
          parts={props.parts}
          questionNumber={props.number}
        />
      </div>
    );
  }

  let body = props.body;
  let bodyCopy = body.split("\\\\n");
  // console.log(bodyCopy);
  for (let i = 0; i < bodyCopy.length; i++) {
    let item = bodyCopy[i];
    if (item.substring(0, 4) === "<img") {
      bodyCopy[i] = stringToImg(item);
    }
  }
  // console.log(bodyCopy)
  // let move = false;
  // for (let i =0; i < body.length-2; i++) {
  //   if (body[i] === '\\' && body[i+1] ==='\\' && body[i+2] === 'n') {
  //     console.log('found')
  //   }
  //   if (move) {

  //   }
  // }

  return (
    <div style={{marginBottom: '3rem'}}>
      <Card>
        <div className={classes.QuestionMarkscheme}>
          <div className={classes.Question}>
            <p className={classes.marks}>[Maximum marks: {props.marks}]</p>
            <Latex>
              <h1 className={classes.title}>
                Q{props.number}. {props.body}
                {/* <img src={img} /> */}
              </h1>
            </Latex>
            {renderedParts}
          </div>

          {markscheme}
        </div>
      </Card>
    </div>
  );
};

export default question;
