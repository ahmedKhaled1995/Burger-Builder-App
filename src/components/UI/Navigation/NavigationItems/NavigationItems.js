import React from "react";
import { connect } from "react-redux";

import NavigationItem from "./NavigationItem/NavigationItem";
import classes from "./NavigationItems.css";

const navigationItems = (props) => {
  return (
    <ul className={classes.NavigationItems}>
      <NavigationItem link="/" exact={true}>
        Burger Builder
      </NavigationItem>
      {props.token ? (
        <NavigationItem
          link={{
            pathname: "/orders",
          }}
        >
          Orders
        </NavigationItem>
      ) : null}

      {props.token ? (
        <NavigationItem link="/logout">Logout</NavigationItem>
      ) : (
        <NavigationItem link="/auth">Auth</NavigationItem>
      )}
    </ul>
  );
};

const mapStateToProps = (state) => {
  return {
    token: state.auth.token,
  };
};

export default connect(mapStateToProps)(navigationItems);
