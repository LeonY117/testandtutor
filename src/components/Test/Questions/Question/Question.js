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
          markscheme={props.markscheme}
          marks={props.msMarks} //sorry about the bad prop names
          parts={props.parts}
          questionNumber={props.number} 
        />
      </div>
    );
  }

  let bodyArray = props.body.map((item)=> {
    if (item.type === 'string') {
      return (<p className={classes.questionBody}>{item.content}</p>)
    }
    else if (item.type === 'image') {
      return (<p className={classes.questionBodyImage}>image: {item.alt}</p>)
    }
  })
  

  return (
    <div style={{marginBottom: '3rem'}}>
      <Card>
        <div className={classes.QuestionMarkscheme}>
          <div className={classes.Question}>
            <p className={classes.marks}>[Maximum marks: {props.marks}]</p>
            <Latex className={classes.title}>
              <p className = {classes.questionNumber}>
                Q{props.number}.&nbsp;
              </p>
              {bodyArray}
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
