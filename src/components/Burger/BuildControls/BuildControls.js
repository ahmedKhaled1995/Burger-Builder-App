import React from "react";
import { connect } from "react-redux";

import BuildControl from "./BuildControl/BuildControl";
import { INGREDIENTS } from "../BurgerIngredients/BurgerIngredients";
import classes from "./BuildControls.css";

const controls = [
  { label: "Salad", type: INGREDIENTS.Salad },
  { label: "Bacon", type: INGREDIENTS.Bacon },
  { label: "Cheese", type: INGREDIENTS.Cheese },
  { label: "Meat", type: INGREDIENTS.Meat },
];

const buildControls = (props) => {
  return (
    <div className={classes.BuildControls}>
      {/* Price Paragraph */}
      <p>
        Your total is: <strong>{props.totalPrice.toFixed(2)}</strong>
      </p>
      {/* Controls Buttons */}
      {controls.map((control) => {
        return (
          <BuildControl
            key={control.label}
            label={control.label}
            moreClicked={() => {
              props.moreHandler(control.type);
            }}
            lessClicked={() => {
              props.lessHandler(control.type);
            }}
            disabled={props.disabled[control.type]}
          ></BuildControl>
        );
      })}
      {/* Order Button */}
      <button className={classes.OrderButton} onClick={props.orderBurger}>
        {props.isAuth ? "Order Now" : "Sign Up to continue"}
      </button>
    </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(buildControls);
