import React, { useState, useEffect, useReducer, useContext } from "react";
import classes from "./Settings.module.css";

import Content from "hoc/Content/Content";
import Card from "components/UI/Card/Card";
import Button from "components/UI/Button/Button";
import Input from "components/UI/Input/Input";

import AuthContext from "store/auth-context";
import axios from "store/axios";
import { validatePassword } from "pages/Signup/Signup";

const userDataReducer = (prevState, action) => {
  if (action.type === "NAME") {
    return { ...prevState, name: action.value };
  }
  if (action.type === "EMAIL") {
    return { ...prevState, email: action.value };
  }
  if (action.type === "PASSWORD") {
    return { ...prevState, password: action.value };
  }
  if (action.type === "CONFIRM_PASSWORD") {
    return { ...prevState, passwordConfirm: action.value };
  }
  if (action.type === "CURRICULUM") {
    return { ...prevState, curriculum: action.value };
  }
  if (action.type === "NEWSLETTER") {
    return {
      ...prevState,
      newsletter: action.value,
    };
  } else {
    console.log("invalid action type");
  }
};

const Settings = () => {
  const authCtx = useContext(AuthContext);
  const [userData, dispatchUserData] = useReducer(userDataReducer, {
    name: "",
    curriculum: "",
    email: "",
    password: "",
    passwordConfirm: "",
    newsletter: false,
  });

  const [errorMessage, setErrorMessage] = useState({
    profileFormError: null,
    emailError: null,
    passwordError: null,
    preferanceError: null,
    deleteAccountError: null,
  });

  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const [confirmDeleteInput, setConfirmDeleteInput] = useState("");

  const confirmText = "Delete my account";

  const nameInputChangedHandler = (e) => {
    dispatchUserData({ type: "NAME", value: e.target.value });
  };

  const curriculumSelectChangedHandler = (e) => {
    dispatchUserData({ type: "CURRICULUM", value: e.target.value });
  };

  const profileSubmitHandler = (event) => {
    event.preventDefault();
    const submitData = {
      first_name: userData.name,
    };
    // console.log(submitData);
    axios
      .post("/profiles/update", { data: submitData })
      .then((response) => {
        if (response.data.hasOwnProperty("errors")) {
          console.log(response.data.errors);
          setErrorMessage((prevState) => {
            return {
              ...prevState,
              profileFormError: response.data.errors[0].source.detail,
            };
          });
        } else {
          // success
          window.location.reload(false);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const emailInputChangedHandler = (e) => {
    dispatchUserData({ type: "EMAIL", value: e.target.value });
  };

  const submitEmailChangedHandler = (e) => {
    e.preventDefault();
    const submitData = {
      email: userData.email,
    };
    // console.log(submitData);

    axios
      .post("/profiles/update", { data: submitData })
      .then((response) => {
        if (response.data.hasOwnProperty("errors")) {
          setErrorMessage((prevState) => {
            return {
              ...prevState,
              emailError: response.data.errors[0].source.detail,
            };
          });
        } else {
          // success
          window.location.reload(false);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const passwordInputChangedHandler = (e) => {
    dispatchUserData({ type: "PASSWORD", value: e.target.value });
  };

  const confirmPasswordInputChangedHandler = (e) => {
    dispatchUserData({ type: "CONFIRM_PASSWORD", value: e.target.value });
  };

  const submitPasswordHandler = (e) => {
    e.preventDefault();
    const passwordIsValid = validatePassword(userData.password);


    if (!passwordIsValid) {
      setErrorMessage((prevState) => {
        return {
          ...prevState,
          passwordError:
            "Your password should be at least 8 characters long, upper and lower case letters and a number",
        };
      });
      return;
    }

    const confirmPasswordIsValid =
      userData.password === userData.passwordConfirm;

    if (!confirmPasswordIsValid) {
      setErrorMessage((prevState) => {
        return {
          ...prevState,
          passwordError: "Passwords do not match",
        };
      });
      return;
    }

    if (passwordIsValid && confirmPasswordIsValid) {
      axios
        .post("/profiles/update", { data: { password: userData.password } })
        .then((response) => {
          if (response.data.hasOwnProperty("errors")) {
            setErrorMessage((prevState) => {
              return {
                ...prevState,
                passwordError: response.data.errors[0].source.detail,
              };
            });
          } else {
            // success
            // console.log(response);
            window.location.reload(false);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const newsletterChangedHandler = () => {
    const submitData = { newsletter: !userData.newsletter };
    axios
      .post("/profiles/update", { data: submitData })
      .then((response) => {
        if (response.data.hasOwnProperty("errors")) {
          setErrorMessage((prevState) => {
            return {
              ...prevState,
              newsletterError: response.data.errors[0].source.detail,
            };
          });
        } else {
          window.location.reload(false);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const deleteButtonClickedHandler = () => {
    setShowConfirmDelete(true);
  };

  const confirmDeleteInputChangedHandler = (e) => {
    setConfirmDeleteInput(e.target.value);
  };

  const deleteHandler = () => {
    if (confirmDeleteInput === confirmText) {
      axios.post("/profiles/delete", { data: {} }).then();
      authCtx.logout()
    }
  };

  useEffect(() => {
    axios
      .get("/profiles/update")
      .then((response) => {
        if (response.data.hasOwnProperty("errors")) {
          console.log(response.data.errors);
          // setErrorMessage(response.data.errors[0].source.detail);
        } else {
          const data = response.data.data;
          // console.log(data);
          dispatchUserData({ type: "NAME", value: data.first_name });
          dispatchUserData({ type: "CURRICULUM", value: data.curriculum });
          dispatchUserData({ type: "EMAIL", value: data.email });
          dispatchUserData({
            type: "NEWSLETTER",
            value: data.newsletter,
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
    window.scrollTo(0, 0);
  }, []);

  let deleteAccount = (
    <div className={classes.buttonWrapper}>
      <Button color="red" narrow secondary clicked={deleteButtonClickedHandler}>
        Delete my account
      </Button>
    </div>
  );

  if (showConfirmDelete) {
    deleteAccount = (
      <div className={classes.confirmDeleteWrapper}>
        <p className={classes.confirmDeleteWarning}>
          This action is permanent, all of your data will be deleted
        </p>
        <p>
          Type <b>{confirmText}</b> below to confirm
        </p>
        <div className={classes.inputWrapper}>
          <Input
            changed={confirmDeleteInputChangedHandler}
            value={confirmDeleteInput}
          />
        </div>
        <div className={classes.buttonWrapper}>
          <Button color="red" narrow primary clicked={deleteHandler}>
            Confirm
          </Button>
        </div>
      </div>
    );
  }

  return (
    <Content withNav>
      <Card pageWrapper>
        <h1>Settings</h1>
        <div className={classes.settingsSection}>
          <h3>Profile</h3>
          <form onSubmit={profileSubmitHandler}>
            <div className={classes.profileFormWrapper}>
              <div className={classes.inputWrapper}>
                <Input
                  label="Name"
                  placeholder={userData.name}
                  changed={nameInputChangedHandler}
                />
              </div>
              <div className={classes.inputWrapper}>
                <Input
                  label="Curriculum"
                  disabled
                  placeholder={userData.curriculum}
                  changed={curriculumSelectChangedHandler}
                />
              </div>
              <p className={classes.errorMessage}>
                {errorMessage.profileFormError}
              </p>
              <div className={classes.buttonWrapper}>
                <Button color="grey" narrow clicked={profileSubmitHandler}>
                  Save Changes
                </Button>
              </div>
            </div>
          </form>
        </div>
        <div className={classes.settingsSection}>
          <h3>{"Email & Password"}</h3>
          <form onSubmit={submitEmailChangedHandler}>
            <div className={classes.emailFormWrapper}>
              <div className={classes.emailInputWrapper}>
                <Input
                  label="Email"
                  placeholder={userData.email}
                  changed={emailInputChangedHandler}
                />
              </div>
              <div
                className={[
                  classes.emailUpdateButtonWrapper,
                  classes.buttonWrapper,
                ].join(" ")}
              >
                <Button color="grey" narrow clicked={submitEmailChangedHandler}>
                  Update
                </Button>
              </div>
            </div>
            <p className={classes.errorMessage}>{errorMessage.emailError}</p>
          </form>
          <div className={classes.passwordFormWrapper}>
            <form onSubmit={submitPasswordHandler}>
              <div className={classes.inputWrapper}>
                <Input
                  label="New Password"
                  changed={passwordInputChangedHandler}
                  type="password"
                />
              </div>
              <div className={classes.inputWrapper}>
                <Input
                  label="Confirm New Password"
                  changed={confirmPasswordInputChangedHandler}
                  type="password"
                />
              </div>
              <p className={classes.errorMessage}>
                {errorMessage.passwordError}
              </p>
              <div className={classes.buttonWrapper}>
                <Button narrow color="grey" clicked={submitPasswordHandler}>
                  Change Password
                </Button>
              </div>
            </form>
          </div>
        </div>
        <div className={classes.settingsSection}>
          <h3>{"Preferances"}</h3>
          <div className={classes.buttonWrapper}>
            <Button
              color="grey"
              narrow
              secondary
              clicked={newsletterChangedHandler}
            >
              {userData.newsletter
                ? "Unsubscribe from newsletter"
                : "Subscribe to newsletter"}
            </Button>
          </div>
        </div>
        <div className={classes.settingsSection}>
          <h3>{"Delete Account"}</h3>
          {deleteAccount}
        </div>
      </Card>
    </Content>
  );
};

export default Settings;
