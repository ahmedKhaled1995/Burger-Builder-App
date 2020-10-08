import * as actionTypes from "../actions/actionTypes";
import {
  INGREDIENTS_PRICES,
  INGREDIENTS,
} from "../../components/Burger/BurgerIngredients/BurgerIngredients";

// Defining constants
const BASE_PRICE = 4; // 4$ is the base price of the burger

// Initial state object
const initialState = {
  ingredients: null,
  totalPrice: BASE_PRICE,
  error: false,
  buldingBurger: false,
};

// Takes the ingredients object and returns it after doing some arranging
const getIngredients = (ingredients) => {
  const arrangedIngredients = {};
  arrangedIngredients[INGREDIENTS.Salad] = ingredients[INGREDIENTS.Salad];
  arrangedIngredients[INGREDIENTS.Bacon] = ingredients[INGREDIENTS.Bacon];
  arrangedIngredients[INGREDIENTS.Cheese] = ingredients[INGREDIENTS.Cheese];
  arrangedIngredients[INGREDIENTS.Meat] = ingredients[INGREDIENTS.Meat];
  return arrangedIngredients;
};

// Defining the reducer function
const reducer = (state = initialState, action) => {
  switch (action.type) {
    // case actionTypes.UPDATE_INGREDIENTS_AND_PRICE:
    //   return {
    //     ...action.payload,
    //   };
    case actionTypes.ADD_INGREDIENT:
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.ingredient]: state.ingredients[action.ingredient] + 1,
        },
        totalPrice: state.totalPrice + INGREDIENTS_PRICES[action.ingredient],
        buldingBurger: true,
      };
    case actionTypes.REMOVE_INGREDIENT:
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.ingredient]: state.ingredients[action.ingredient] - 1,
        },
        totalPrice: state.totalPrice - INGREDIENTS_PRICES[action.ingredient],
        buldingBurger: true,
      };
    case actionTypes.LOAD_INGREDIENTS:
      return {
        ...state,
        ingredients: getIngredients(action.ingredients),
        error: false,
        totalPrice: BASE_PRICE,
        buldingBurger: false,
      };
    case actionTypes.ERROR_FOUND:
      return {
        ...state,
        error: true,
      };
    default:
      return state;
  }
};

// Exporting the reducer ti be used in index.js in the createStore method
export default reducer;
