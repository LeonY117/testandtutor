import React, { useState, useEffect } from "react";

import classes from "./ForgotPassword.module.css";
import Loading from "components/Loading/Loading";
import LinkExpired from "pages/Error/LinkExpired";
import Content from "hoc/Content/Content";
import Input from "components/UI/Input/Input";
import Button from "components/UI/Button/Button";

import { validatePassword } from "pages/Signup/Signup";

const ForgotPassword = (props) => {
  const token = props.match.params.token;
  const [isLoading, setIsLoading] = useState(true);
  const [tokenValidity, setTokenValidity] = useState(true);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [passwordError, setPasswordError] = useState({
    illegalPassword: false,
    mismatchedPassword: false,
  });

  const submitHandler = (e) => {
    e.preventDefault();
    const passwordValidity = validatePassword(password);
    const confirmPasswordValidity = password === confirmPassword;

    setPasswordError(() => {
      return {
        illegalPassword: !passwordValidity,
        mismatchedPassword: !confirmPasswordValidity,
      };
    });

    if (!passwordValidity || !confirmPasswordValidity) {
      return;
    }

    // const data = { password: password, token: token };
    // axios.post...
  };

  const passwordFieldChangedHandler = (e) => {
    setPassword(e.target.value);
  };

  const confirmPasswordFieldChangedHandler = (e) => {
    setConfirmPassword(e.target.value);
  };

  useEffect(() => {
    // const data = { token: token };
    // axios.get...
    setTokenValidity(false);
    setIsLoading(false);
  }, [token]);

  let forgotPasswordForm = null;

  if (tokenValidity === true) {
    forgotPasswordForm = (
      <Content withNav>
        <form onSubmit={submitHandler}>
          <div className={classes.inputsWrapper}>
            <div className={classes.inputWrapper}>
              <Input
                label="new password"
                type="password"
                value={password}
                changed={passwordFieldChangedHandler}
              />
            </div>
            <div className={classes.inputWrapper}>
              <Input
                label="confirm new password"
                type="password"
                value={confirmPassword}
                changed={confirmPasswordFieldChangedHandler}
              />
            </div>
            <label
              className={classes.passwordInstructions}
              warning={passwordError.illegalPassword.toString()}
            >
              Your password should be at least 8 characters long upper and lower
              case letters and a number
            </label>
            <label className={classes.passwordInstructions} warning={"true"}>
              {passwordError.mismatchedPassword
                ? "Passwords to not match"
                : null}
            </label>
          </div>
          <Button color="grey" narrow clicked={submitHandler}>
            save changes
          </Button>
        </form>
      </Content>
    );
  } else {
    forgotPasswordForm = <LinkExpired />;
  }

  return (
    <div>
      {isLoading && <Loading />} {!isLoading && forgotPasswordForm}
    </div>
  );
};

export default ForgotPassword;
