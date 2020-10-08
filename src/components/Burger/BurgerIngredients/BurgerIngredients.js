import React, { Component } from "react";
import PropTypes from "prop-types";

import classes from "./BurgerIngredients.css";

// Defining constants
const INGREDIENTS = {
  BreadBottom: "bred-bottom",
  BreadTop: "bread-top",
  Meat: "meat",
  Cheese: "cheese",
  Salad: "salad",
  Bacon: "bacon",
};

const INGREDIENTS_PRICES = {};
INGREDIENTS_PRICES[INGREDIENTS.Meat] = 1.3;
INGREDIENTS_PRICES[INGREDIENTS.Cheese] = 0.4;
INGREDIENTS_PRICES[INGREDIENTS.Salad] = 0.5;
INGREDIENTS_PRICES[INGREDIENTS.Bacon] = 0.7;

// Note that was a functional componet, but we changed it to class based component just for practise
// There's nothing wrong if it had remained a functional componet, everthing would have worked the same
class BurgerIngredients extends Component {
  render() {
    let ingredient = null;

    switch (this.props.type) {
      case INGREDIENTS.BreadBottom:
        ingredient = <div className={classes.BreadBottom}></div>;
        break;
      case INGREDIENTS.BreadTop:
        ingredient = (
          <div className={classes.BreadTop}>
            <div className={classes.Seeds1}></div>
            <div className={classes.Seeds2}></div>
          </div>
        );
        break;
      case INGREDIENTS.Meat:
        ingredient = <div className={classes.Meat}></div>;
        break;
      case INGREDIENTS.Cheese:
        ingredient = <div className={classes.Cheese}></div>;
        break;
      case INGREDIENTS.Salad:
        ingredient = <div className={classes.Salad}></div>;
        break;
      case INGREDIENTS.Bacon:
        ingredient = <div className={classes.Bacon}></div>;
        break;
      default:
        ingredient = null;
    }

    return ingredient;
  }
}

// Setting proptypes of burgerIngredients
BurgerIngredients.propTypes = {
  type: PropTypes.string.isRequired,
};

export default BurgerIngredients;
export { INGREDIENTS, INGREDIENTS_PRICES };
