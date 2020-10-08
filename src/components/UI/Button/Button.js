import React from "react";

import classes from "./Button.css";

const button = (props) => {
  /* props.buttonType is either Success or Danger */
  return (
    <button
      className={`${classes.Button} ${classes[props.buttonType]}`}
      onClick={props.buttonClicked}
    >
      {props.children}
    </button>
  );
};

export default button;
