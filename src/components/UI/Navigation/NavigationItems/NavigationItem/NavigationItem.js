import React from "react";
import { NavLink } from "react-router-dom";

import classes from "./NavigationItem.css";

const navigationItem = (props) => {
  return (
    <li className={classes.NavigationItem}>
      {/* className={props.active ? classes.active : null} */}
      <NavLink
        to={props.link}
        activeClassName={classes.active}
        exact={props.exact}
      >
        {props.children}
      </NavLink>
    </li>
  );
};

export default navigationItem;
