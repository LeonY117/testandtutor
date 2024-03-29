import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import classes from "./BetaSignup.module.css";

import Content from "hoc/Content/Content";
import Input from "components/UI/Input/Input";
import Card from "components/UI/Card/Card";
import Button from "components/UI/Button/Button";
import Loading from "components/Loading/Loading";

import axios from "store/axios";

const validateEmail = (email) => {
  var re = /\S+@\S+\.\S+/;
  return re.test(email);
};

const BetaSignup = () => {
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const history = useHistory();

  const inputChangedHandler = (e) => {
    setEmail(e.target.value);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    setIsLoading(true);
    // Validate email
    if (!validateEmail(email)) {
      setErrorMessage("Please enter valid email");
      setIsLoading(false);
      return;
    }
    const data = { email: email };
    setIsLoading(true);
    axios
      .post("/misc/register_interest", { data: data })
      .then((response) => {
        if (response.data.hasOwnProperty("errors")) {
          // TODO: process error messages
          setErrorMessage("Something went wrong");
          console.log(response.data.errors);
          setIsLoading(false);
          // setErrorMessage(response.data.errors[0].source.detail);
        } else {
          // if successful:
          history.push("/betaSignupSuccess");
        }
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
    console.log(data);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  });

  const betaSignup = (
    <div className={classes.cardWrapper}>
      <Card pageWrapper>
        <p className={classes.subTitle}>
          Test and Tutor is currently in <b>Beta Version</b>
        </p>
        <p className={classes.info}>
          If you wish to have early access to the website, please let us know by
          entering your contact details below.
        </p>
        <form onSubmit={submitHandler}>
          <div className={classes.formWrapper}>
            <div className={classes.inputWrapper}>
              <Input
                size="large"
                placeholder="Email"
                autoFocus
                changed={inputChangedHandler}
                value={email}
              ></Input>
            </div>
            <div className={classes.buttonWrapper}>
              <Button size="small" fullHeight onClick={submitHandler}>
                <FontAwesomeIcon icon={faArrowRight} />
              </Button>
            </div>
          </div>
        </form>
        <p className={classes.errorMessage}> {errorMessage}</p>
      </Card>
    </div>
  );

  return (
    <Content withNav>
      {isLoading && <Loading />}
      {!isLoading && betaSignup}
    </Content>
  );
};

export default BetaSignup;
