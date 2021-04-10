import React from "react";
import Part from "./Part/Part";
import Latex from "../../../../hoc/Latex/Latex";
import Content from "../../../../hoc/Content/Content";
import Card from "../../../../components/UI/Card/Card";
import classes from "./Question.module.css";

const question = (props) => {
  let renderedParts = null;

  renderedParts = props.parts.map((part) => {
    return (
      <Part
        marks={part.marks}
        body={part.title}
        number={part.part}
        key={part.part}
      />
    );
  });
  return (
    <Content>
      <Card>
        <div className={classes.Question}>
          <p className={classes.marks}>[Maximum marks: {props.marks}]</p>
          <Latex>
            <h1 className={classes.title}>
              Q{props.number}. {props.body}
            </h1>
          </Latex>
          {renderedParts}
        </div>
      </Card>
    </Content>
  );
};

export default question;
