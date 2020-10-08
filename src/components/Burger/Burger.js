import React from "react";
import { connect } from "react-redux";

import BurgerIngredients from "./BurgerIngredients/BurgerIngredients";
import { INGREDIENTS } from "./BurgerIngredients/BurgerIngredients";
import classes from "./Burger.css";

const burger = (props) => {
  // We we will pass props.ingredients as an object not an array, so I am extracting the keys and values to loop throught them and form an array of ingredients
  const ingredients = Object.keys(props.ingredients); // [Salad, Meat, ...etc]
  const ingredientsQty = Object.values(props.ingredients); //[1, 3, ..etc]
  let ingredientsArr = []; // Will hold the JSX, a list of BurgerIngredients
  let counter;
  for (let i = 0; i < ingredientsQty.length; i++) {
    counter = 1;
    for (let j = 0; j < ingredientsQty[i]; j++) {
      ingredientsArr.push(
        <BurgerIngredients
          type={ingredients[i]}
          key={ingredients[i] + counter}
        ></BurgerIngredients>
      );
      counter++;
    }
  }

  // Check to see if the ingredients array is empty, meaning the user still hadn't enter any ingredients
  ingredientsArr =
    ingredientsArr.length === 0 ? (
      <p>Start Adding ingredients</p>
    ) : (
      ingredientsArr
    );

  return (
    <div className={classes.Burger}>
      <BurgerIngredients type={INGREDIENTS.BreadTop}></BurgerIngredients>
      {ingredientsArr}
      <BurgerIngredients type={INGREDIENTS.BreadBottom}></BurgerIngredients>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    ingredients: state.burger.ingredients,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(burger);
