import React, { useState, useReducer, useContext } from "react";
import { Link } from "react-router-dom";
import classes from "./Signup.module.css";

import Content from "hoc/Content/Content";
import Input from "components/UI/Input/Input";
import Card from "components/UI/Card/Card";
import Button from "components/UI/Button/Button";
import Select from "components/UI/Select/Select";
import Loading from "components/Loading/Loading";
import Checkbox from "./Checkbox";

import axios from "store/axios";
import AuthContext from "store/auth-context";

const validateEmail = (email) => {
  var re = /\S+@\S+\.\S+/;
  return re.test(email);
};

const validatePassword = (password) => {
  if (password === null || password === "") {
    return false;
  }
  const chars = password.split("");
  const lengthValid = chars.length > 8;
  const hasUpperCase = chars.some((c) => c === c.toUpperCase());
  const hasLowerCase = chars.some((c) => c === c.toLowerCase());
  const hasNumbers = /\d/.test(password);
  return lengthValid && hasUpperCase && hasLowerCase && hasNumbers;
};

const userDataReducer = (prevState, action) => {
  if (action.type === "EMAIL") {
    return { ...prevState, email: action.value };
  }
  if (action.type === "PASSWORD") {
    return { ...prevState, password: action.value };
  }
  if (action.type === "CURRICULUM") {
    return { ...prevState, curriculum: action.value };
  }
  if (action.type === "NEWSLETTER") {
    return { ...prevState, newsletter: !prevState.newsletter };
  } else {
    console.log("invalid action type");
  }
};

const curriculumArray = ["AA SL"];

const Signup = () => {
  const [userData, dispatchUserData] = useReducer(userDataReducer, {
    email: null,
    password: null,
    curriculum: "AA SL",
    newsletter: false,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [formValidity, setFormVality] = useState({
    emailIsValid: true,
    passwordIsValid: true,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const authCtx = useContext(AuthContext);

  const passwordInputType = showPassword ? "text" : "password";
  let emailError = formValidity.emailIsValid
    ? null
    : "please enter valid email";
  let highlightPasswordInstructions = formValidity.passwordIsValid
    ? false
    : true;

  const userEmailChangedHandler = (event) => {
    dispatchUserData({ type: "EMAIL", value: event.target.value });
  };

  const userPasswordChangedHandler = (event) => {
    dispatchUserData({ type: "PASSWORD", value: event.target.value });
  };

  const userCurriculumChangedHandler = (event) => {
    dispatchUserData({ type: "CURRICULUM", value: event.target.value });
  };

  const showPasswordChangedHandler = () => {
    setShowPassword((prevState) => !prevState);
  };

  const newsletterClickedHandler = () => {
    dispatchUserData({ type: "NEWSLETTER", value: null });
  };

  const submitHandler = (event) => {
    event.preventDefault();

    // CHECK FORM VALIDITY

    const emailIsValid = validateEmail(userData.email);
    const passwordIsValid = validatePassword(userData.password);

    setFormVality(() => {
      return {
        emailIsValid: emailIsValid,
        passwordIsValid: passwordIsValid,
      };
    });

    if (!emailIsValid) {
      emailError = "please enter valid email";
      console.log(emailError);
      return;
    }

    if (!passwordIsValid) {
      highlightPasswordInstructions = true;
      return;
    }

    // TODO: discuss with fin on format for signup
    const submitData = {
      email: userData.email,
      password: userData.password,
      curriculum: userData.curriculum,
      newsletter: userData.newsletter,
      role: "student",
    };

    setIsLoading(true);

    axios
      .post("users/register", { data: submitData })
      .then((response) => {
        if (response.data.hasOwnProperty("errors")) {
          // TODO: process error messages
          setErrorMessage("Something went wrong");
          console.log(response.data.errors);
          // setErrorMessage(response.data.errors[0].source.detail);
        } else {
          // sign up is successful
          authCtx.login();
        }
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  };

  const signupInterface = (
    <div className={classes.cardWrapper}>
      <Card>
        <div className={classes.signup}>
          <h1>Sign up</h1>
          <form onSubmit={submitHandler} autoComplete="off">
            <div className={classes.inputs}>
              <Input
                type="text"
                placeholder={"Email"}
                changed={userEmailChangedHandler}
                autoFocus={true}
                autoComplete={"off"}
              />
              <label className={classes.emailWarning}>{emailError}</label>
              <div className={classes.passwordInput}>
                <Input
                  type={passwordInputType}
                  placeholder={"Password"}
                  changed={userPasswordChangedHandler}
                  autoComplete={"off"}
                />
                <span>
                  <p
                    className={classes.showPasswordToggler}
                    onClick={showPasswordChangedHandler}
                  >
                    {showPassword ? "hide" : "show"}
                  </p>
                </span>
              </div>
              <label
                className={classes.passwordInstructions}
                warning={highlightPasswordInstructions.toString()}
              >
                Your password should be at least 8 characters long upper and
                lower case letters and a number
              </label>
              <div>
                <Select
                  options={curriculumArray}
                  changed={userCurriculumChangedHandler}
                />
              </div>
              <div className={classes.newsletterPrompter}>
                <Checkbox
                  clicked={newsletterClickedHandler}
                  checked={userData.newsletter}
                  fontSize={0.8}
                >
                  Subscribe to our newsletter
                </Checkbox>
              </div>
              {errorMessage && (
                <p className={classes.warning}>{errorMessage}</p>
              )}
            </div>
            <div className={classes.buttonWrapper}>
              <Button round clicked={submitHandler}>
                {"Sign up"}
              </Button>
            </div>
          </form>
          <div className={classes.loginPrompter}>
            {"Already have an account? "}
            <Link to="/login">
              <p className={classes.loginLink}>Sign in</p>
            </Link>
          </div>
        </div>
      </Card>
    </div>
  );

  return (
    <Content>
      {isLoading && <Loading />}
      {!isLoading && signupInterface}
    </Content>
  );
};

export default Signup;
