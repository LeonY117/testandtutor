import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import classes from "./Toolbar.module.css";

import Logo from "components/Logo/Logo";
import NavigationItems from "../NavigationItems/NavigationItems";
import Button from "components/UI/Button/Button";

const Toolbar = (props) => {
  const [showDropdown, setShowDropdown] = useState(false);

  let toolbarDropdownClasses = showDropdown
    ? [classes.toolbarDropdown, classes.toolbarFadeIn]
    : [classes.toolbarDropdown, classes.toolbarFadeOut];
  const dropdownToggleHandler = () => {
    setShowDropdown((prevState) => !prevState);
  };

  const dropdownHideHandler = () => {
    setShowDropdown(false);
  };

  return (
    <header>
      <div className={classes.toolbar}>
        <div className={classes.toolbarDeskop}>
          {props.mode === "user" ? (
            <div className={classes.navLogo}>
              <Link to="/user">
                <Logo color="black" />
              </Link>
            </div>
          ) : (
            <div className={classes.navLogo}>
              <Link to="/">
                <Logo color="black" />
              </Link>
            </div>
          )}

          <div className={classes.navItems}>
            <NavigationItems mode={props.mode} />
          </div>
        </div>
        <div className={classes.toolbarMobile}>
          <div className={classes.navLogo}>
            <Link to="/">
              <Logo color="black" />
            </Link>
          </div>
          {props.mode === "user" && (
            <React.Fragment>
              <div className={classes.menuButtonWrapper}>
                <Button
                  narrow
                  tertiary
                  color="black"
                  clicked={dropdownToggleHandler}
                >
                  <FontAwesomeIcon icon={faBars} />
                </Button>
              </div>
              {showDropdown && (
                <div className={toolbarDropdownClasses.join(" ")}>
                  <div className={classes.navItems}>
                    <NavigationItems
                      mode={props.mode}
                      clicked={dropdownHideHandler}
                    />
                  </div>
                </div>
              )}
            </React.Fragment>
          )}
          {props.mode === "visitor" && (
            <div className={classes.navItems}>
              <NavigationItems
                mode={props.mode}
                clicked={dropdownHideHandler}
              />
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Toolbar;
