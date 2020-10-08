import React from "react";

import classes from "./HamburgerIcon.css";

const hamburgerIcon = (props) => {
  return (
    <div onClick={props.hamIconClicked} className={classes.DrawerToggle}>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
};

export default hamburgerIcon;
