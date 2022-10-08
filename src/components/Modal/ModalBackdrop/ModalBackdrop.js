import React from "react";
import classes from "./ModalBackdrop.module.css";

const ModalBackdrop = (props) => {
  return (
    <div onClick={props.clicked} className={classes.modalBackdrop}>
      {props.children}
    </div>
  );
};

export default ModalBackdrop;
