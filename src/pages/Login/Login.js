import React, { Component } from "react";
import Input from "components/UI/Input/Input";
import Content from "../../hoc/Content/Content";
import Card from "../../components/UI/Card/Card";
import Loading from "../../components/Loading/Loading";
import Button from "../../components/UI/Button/Button";
import classes from "./Login.module.css";
import axios from "../../stores/axios";

class login extends Component {
  state = {
    username: null,
    password: null,
    warning: false,
    errorMessage: null,
    showPassword: false,
    userID: null,
    accessToken: null,
    loading: false,
  };

  usernameInputChangedHandler = (event) => {
    this.setState({ username: event.target.value });
  };
  passwordInputChangedHandler = (event) => {
    this.setState({ password: event.target.value });
  };
  showPasswordHandler = () => {
    console.log("clicked");
    this.setState((prevState) => {
      return { showPassword: !prevState.showPassword };
    });
  };

  buttonClickedHandler = () => {
    const loginData = {
      data: { email: this.state.username, password: this.state.password },
    };
    this.setState({ loading: true });
    axios
      .post("/auth/login", loginData, { withCredentials: true })
      .then((response) => {
        const data = response.data;
        // console.log(data)
        if (data.hasOwnProperty("errors")) {
          this.setState({
            warning: true,
            errorMessage: data.errors[0].source.detail,
            loading: false,
          });
        } else {
          this.props.loginSuccessHandler(data.data.userId);
        }
      });
    //TODO catch own errors
  };

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  render() {
    let passwordInputType = "password";
    if (this.state.showPassword) {
      passwordInputType = "text";
    }

    let warningMessage = null;
    if (this.state.warning) {
      warningMessage = (
        <p className={classes.Warning}>{this.state.errorMessage}</p>
      );
    }
    return (
      <div className={classes.Login}>
        <Content>
          {this.state.loading ? <Loading /> : null}
          <div className={classes.CardWrapper}>
            <Card>
              <h1>Log in </h1>
              <div className={classes.InputFields}>
                <p>Username: </p>
                <Input type="text" changed={this.usernameInputChangedHandler} />
                <p>Password:</p>
                <Input
                  type={passwordInputType}
                  changed={this.passwordInputChangedHandler}
                />
                <div className={classes.ShowPassword}>
                  <input type="checkbox" onClick={this.showPasswordHandler} />
                  <p>Show password</p>
                </div>
              </div>
              {warningMessage}
              <Button round clicked={this.buttonClickedHandler}>
                Log in
              </Button>
            </Card>
          </div>
        </Content>
      </div>
    );
  }
}

export default login;
