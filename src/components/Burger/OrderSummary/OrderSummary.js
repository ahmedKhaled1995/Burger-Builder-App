import React from "react";
import { connect } from "react-redux";

import Aux from "../../hoc/Auxiliary/Auxiliary";
import Button from "../../UI/Button/Button";

const orderSummary = (props) => {
  // Forming array of the burger ingredients
  const ingredientsObj = props.ingredients;
  const ingredientsJSXArr = Object.keys(ingredientsObj).map((element) => {
    return (
      <li key={element}>
        <span style={{ textTransform: "capitalize" }}>{element}</span>:{" "}
        {ingredientsObj[element]}
      </li>
    );
  });

  // The Order Summary returned
  return (
    <Aux>
      <h3>Your delecious Burger: </h3>
      <ul>{ingredientsJSXArr}</ul>
      <p>
        Total Price: <strong>{props.totalPrice.toFixed(2)}$</strong>
      </p>
      <p>Continue to check out?</p>
      <Button buttonType="Success" buttonClicked={props.continueOrder}>
        Continue
      </Button>
      <Button buttonType="Danger" buttonClicked={props.cancelOrder}>
        Cancel
      </Button>
    </Aux>
  );
};

const mapStateToProps = (state) => {
  return {
    ingredients: state.burger.ingredients,
    totalPrice: state.burger.totalPrice,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(orderSummary);
