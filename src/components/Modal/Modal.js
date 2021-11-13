import React from "react";
import classes from "./Modal.module.css";

import ModalBackdrop from "./ModalBackdrop/ModalBackdrop";

const Modal = (props) => {
  return (
    <ModalBackdrop clicked={props.backdropClickedHandler}>
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        className={classes.card}
      >
        {props.children}
      </div>
    </ModalBackdrop>
  );
};

export default Modal;
