import React from "react";

import classes from "./Backdrop.css";

const backdrop = (props) => {
  return props.showBackdrop ? (
    <div className={classes.Backdrop} onClick={props.backDropClicked}></div>
  ) : null;
};

export default backdrop;
