import React from "react";

import classes from "./Order.css";

const order = (props) => {
  let buttonStyle = props.disabled
    ? [classes.Button, classes.Disabled]
    : [classes.Button];
  //let buttonStyle = [classes.Button, classes.Disabled];
  return (
    <div className={classes.Order}>
      <p>Ingredients: {props.ingredients}</p>
      <p>
        Price: <strong>USD {props.price}</strong>
      </p>
      <div className={classes.ButtonContainer}>
        <button
          className={buttonStyle.join(" ")}
          onClick={props.deleteClicked}
          disabled={props.disabled}
        >
          <span style={{ fontWeight: "bold" }}>Delete</span>
        </button>
      </div>
    </div>
  );
};

export default order;
