import React from "react";
import { useHistory } from "react-router-dom";
import classes from "./Footer.module.css";

import Logo from "components/Logo/Logo";
import FooterItems from "./FooterItems/FooterItems";
import Button from "components/UI/Button/Button";

const Footer = (props) => {
  const history = useHistory();
  const reportButtonClickedHandler = () => {
    history.push("/bugReport");
  };
  let footer = null;
  if (props.mode === "user") {
    footer = (
      <div>
        <div className={classes.buttonWrapper}>
          <Button
            tertiary
            color="grey"
            narrow
            clicked={reportButtonClickedHandler}
          >
            Report an issue
          </Button>
        </div>
      </div>
    );
  } else if (props.mode === "visitor") {
    footer = (
      <div className={classes.Footer}>
        <div className={classes.FooterLogo}>
          <Logo color={"white"} />
        </div>
        <FooterItems className={classes.FooterItems} />
      </div>
    );
  }

  return <React.Fragment>{footer}</React.Fragment>;
};

export default Footer;
