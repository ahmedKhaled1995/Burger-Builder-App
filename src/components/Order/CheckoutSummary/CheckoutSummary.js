import React from "react";

import Burger from "../../Burger/Burger";
import Button from "../../UI/Button/Button";
import classes from "./CheckoutSummary.css";

const checkoutSummary = (props) => {
  return (
    <div className={classes.CheckOut}>
      <h1>Here's your tasty Burger!</h1>
      <div className={classes.Burger}>
        <Burger ingredients={props.ingredients} />
      </div>
      <div style={{ textAlign: "center" }}>
        <Button buttonType="Success" buttonClicked={props.continueClicked}>
          Continue
        </Button>
        <Button buttonType="Danger" buttonClicked={props.cancelClicked}>
          Cancel
        </Button>
      </div>
    </div>
  );
};

export default checkoutSummary;
