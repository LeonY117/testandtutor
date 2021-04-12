import React, { Component } from "react";
import axios from "../../axios";
import Input from "../../components/Input/Input";
import Content from "../../hoc/Content/Content";
import Card from "../../components/UI/Card/Card";
import Button from "../../components/UI/Button/Button";
import classes from "./Signup.module.css";
import Select from "../../components/Select/Select";
class signup extends Component {
  state = {
    auth: false,
    showPassword: false,
    warnings: {
      email: null,
      password: null,
      passwordConfirm: null,
      firstName: null,
      lastName: null,
    },
    userData: {
      email: null,
      password: null,
      passwordConfirm: null,
      firstName: null,
      lastName: null,
      curriculum: "AA SL",
    },
  };

  inputChangedHandler = (id, event) => {
    const userDataCopy = { ...this.state.userData };
    userDataCopy[id] = event.target.value;
    this.setState({ userData: userDataCopy });
  };

  showPasswordHandler = () => {
    console.log("clicked");
    this.setState((prevState) => {
      return { showPassword: !prevState.showPassword };
    });
  };

  buttonClickedHandler = () => {
    const data = {
      email: this.state.userData.email,
      password: this.state.userData.password,
      firstName: this.state.userData.firstName,
      lastName: this.state.userData.lastName,
      curriculum: this.state.userData.curriculum,
      role: "student",
    };

    const warningsCopy = { ...this.state.warnings };
    let valid = true;
    for (let field in data) {
      if (data[field] === null) {
        warningsCopy[field] = "This field cannot be empty";
        valid = false;
      }
    }
    if (this.state.userData.password !== this.state.userData.passwordConfirm) {
      warningsCopy["passwordConfirm"] = "Passwords do not match";
      valid = false;
    }

    this.setState({ warnings: warningsCopy });

    if (valid) {
      // console.log("all good, sending user data");
      // console.log("Request to back end", data);
      axios
        .post("users/register", { data: data })
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      // console.log(data);
      // console.log("displaying warnings");
      // console.log(this.state.warnings);
    }
  };
  submitHandler = (event) => {
    this.buttonClickedHandler();
    event.preventDefault();
  };

  render() {
    let passwordInputType = "password";
    if (this.state.showPassword) {
      passwordInputType = "text";
    }

    return (
      <div className={classes.Signup}>
        <Content>
          <Card>
            <div className={classes.CardWrapper}>
              <form onSubmit={this.submitHandler}>
                <h1>Sign up</h1>
                <div className={classes.InputFields}>
                  <Input
                    inputName="Email"
                    type="text"
                    changed={(e) => this.inputChangedHandler("email", e)}
                    warning={this.state.warnings["email"]}
                  />
                  <div className={classes.Names}>
                    <Input
                      inputName="First Name"
                      type="text"
                      changed={(e) => this.inputChangedHandler("firstName", e)}
                      warning={this.state.warnings["firstName"]}
                    />

                    <Input
                      inputName="Last Name"
                      type="text"
                      changed={(e) => this.inputChangedHandler("lastName", e)}
                      warning={this.state.warnings["lastName"]}
                    />
                  </div>

                  <p style={{ margin: "1rem 0 0.5rem 0" }}>Curriculum </p>
                  <Select
                    changed={(e) => this.inputChangedHandler("curriculum", e)}
                    options={["AA SL", "AI SL", "AA HL", "AI HL "]}
                  />

                  <Input
                    inputName="Password"
                    type={passwordInputType}
                    changed={(e) => this.inputChangedHandler("password", e)}
                    warning={this.state.warnings["password"]}
                  />
                  <p style={{ fontSize: "12px" }}>
                    Your password should be at least 8 characters long with a
                    symbol, upper and lower case letters and a number
                  </p>
                  <Input
                    inputName="Confirm Password"
                    type={passwordInputType}
                    changed={(e) =>
                      this.inputChangedHandler("passwordConfirm", e)
                    }
                    warning={this.state.warnings["passwordConfirm"]}
                  />

                  <div className={classes.ShowPassword}>
                    <input type="checkbox" onClick={this.showPasswordHandler} />
                    <p>Show password</p>
                  </div>
                </div>

                <Button round clicked={this.buttonClickedHandler}>
                  Sign up
                </Button>
              </form>
            </div>
          </Card>
        </Content>
      </div>
    );
  }
}

export default signup;
