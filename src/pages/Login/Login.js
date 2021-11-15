import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import classes from "./Login.module.css";

import Content from "hoc/Content/Content";
import Input from "components/UI/Input/Input";
import Card from "components/UI/Card/Card";
import Button from "components/UI/Button/Button";
import Loading from "components/Loading/Loading";

import AuthContext from "store/auth-context";
import axios from "store/axios";

const validateEmail = (email) => {
  var re = /\S+@\S+\.\S+/;
  return re.test(email);
};

const Login = () => {
  const [username, setUsername] = useState("");
  const [usernameWarning, setUsernameWarning] = useState(null);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  // const passwordInputType = showPassword ? "text" : "password";

  const passwordInputType = 'password'
  const authCtx = useContext(AuthContext);

  const usernameChangedHandler = (event) => {
    setUsername(event.target.value);
  };

  const passwordChangedHandler = (event) => {
    setPassword(event.target.value);
  };

  // const showPasswordChangedHandler = () => {
  //   setShowPassword((prevState) => !prevState);
  // };

  const forgotPasswordHandler = () => {
    return;
  };

  const submitHandler = (event) => {
    event.preventDefault();
    if (!validateEmail(username)) {
      setUsernameWarning("please enter valid email");
      return;
    }
    const loginData = {
      data: { email: username, password: password },
    };
    setIsLoading(true);
    setErrorMessage(null);
    setUsernameWarning(null);
    axios
      .post("/auth/login", loginData)
      .then((response) => {
        if (response.data.hasOwnProperty("errors")) {
          setErrorMessage(response.data.errors[0].source.detail);
        } else {
          authCtx.login();
        }
        setIsLoading(false);
      })
      .catch(() => {
        console.log("something went wrong.");
        setIsLoading(false);
      });
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const loginInterface = (
    <div className={classes.cardWrapper}>
      <Card>
        <div className={classes.login}>
          <h1>Sign in</h1>
          <form onSubmit={submitHandler}>
            <div className={classes.inputs}>
              <Input
                type="text"
                placeholder={"Email"}
                changed={usernameChangedHandler}
                warning={usernameWarning}
                autoFocus={true}
                round
                size="large"
              />
              <div className={classes.passwordInput}>
                <Input
                  type={passwordInputType}
                  placeholder={"Password"}
                  changed={passwordChangedHandler}
                  round
                  size="large"
                />
                {/* <span>
                  <p
                    className={classes.showPasswordToggler}
                    onClick={showPasswordChangedHandler}
                  >
                    {showPassword ? "hide" : "show"}
                  </p>
                </span> */}
              </div>
              {errorMessage && (
                <p className={classes.warning}>{errorMessage}</p>
              )}
            </div>
            <div className={classes.buttonWrapper}>
              <Button
                clicked={submitHandler}
                round
                primary
                size="large"
                color="blue"
              >
                {"Continue"}
              </Button>
            </div>
          </form>
          <Link
            to="#"
            className={classes.forgotPassword}
            onClick={forgotPasswordHandler}
          >
            {"forgot password?"}
          </Link>
          <div className={classes.signupPrompter}>
            {"First time here? "}
            <Link to="/signup">
              <p className={classes.signupLink}>Sign up</p>
            </Link>
          </div>
        </div>
      </Card>
    </div>
  );

  return (
    <Content>
      {isLoading && <Loading />}
      {!isLoading && loginInterface}
    </Content>
  );
};
export default Login;
