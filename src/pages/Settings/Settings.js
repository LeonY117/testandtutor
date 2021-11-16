import React, { useState, useEffect } from "react";
import classes from "./Settings.module.css";

import Content from "hoc/Content/Content";
import Card from "components/UI/Card/Card";
import Button from "components/UI/Button/Button";
import Input from "components/UI/Input/Input";

import AuthContext from "store/auth-context";

const Settings = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Content withNav>
      <Card pageWrapper>
        <h1>Settings</h1>
        <div className={classes.settingsSection}>
          <h3>Profile</h3>
          <form>
            <div className={classes.profileFormWrapper}>
              <div className={classes.inputWrapper}>
                <Input label="Name" />
              </div>
              <div className={classes.inputWrapper}>
                <Input label="Curriculum" />
              </div>
              <div className={classes.buttonWrapper}>
                <Button color="grey" narrow>
                  Save Changes
                </Button>
              </div>
            </div>
          </form>
        </div>
        <div className={classes.settingsSection}>
          <h3>{"Email & Password"}</h3>
          <form>
            <div className={classes.emailFormWrapper}>
              <div className={classes.emailInputWrapper}>
                <Input label="Email" />
              </div>
              <div
                className={[
                  classes.emailUpdateButtonWrapper,
                  classes.buttonWrapper,
                ].join(" ")}
              >
                <Button color="grey" narrow>
                  Update
                </Button>
              </div>
            </div>
          </form>
          <div className={classes.passwordFormWrapper}>
            <form>
              <div className={classes.inputWrapper}>
                <Input label="New Password" />
              </div>
              <div className={classes.inputWrapper}>
                <Input label="Confirm New Password" />
              </div>
              <div className={classes.buttonWrapper}>
                <Button narrow color="grey">
                  Change Password
                </Button>
              </div>
            </form>
          </div>
        </div>
        <div className={classes.settingsSection}>
          <h3>{"Preferances"}</h3>
          <div className={classes.buttonWrapper}>
            <Button color="grey" narrow secondary>
              Unsubscribe from newsletter
            </Button>
          </div>
        </div>
        <div className={classes.settingsSection}>
          <h3>{"Delete Account"}</h3>
          <div className={classes.buttonWrapper}>
            <Button color="red" narrow secondary>
              Delete my account
            </Button>
          </div>
        </div>
      </Card>
    </Content>
  );
};

export default Settings;
