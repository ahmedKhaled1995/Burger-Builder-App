import * as actionTypes from "./actionTypes";
import axios from "../../axios-instance";

export const updateIngredientsAndPrice = (payload) => {
  return {
    type: actionTypes.UPDATE_INGREDIENTS_AND_PRICE,
    ...payload,
  };
};

export const addIngredient = (payload) => {
  return {
    type: actionTypes.ADD_INGREDIENT,
    ...payload,
  };
};

export const removeIngredient = (payload) => {
  return {
    type: actionTypes.REMOVE_INGREDIENT,
    ...payload,
  };
};

const loadIngredientsHelper = (ingredients) => {
  return {
    type: actionTypes.LOAD_INGREDIENTS,
    ingredients,
  };
};

const errorFound = () => {
  return {
    type: actionTypes.ERROR_FOUND,
  };
};

export const loadIngredients = () => {
  return async (dispatch) => {
    try {
      const res = await axios.get(
        "https://react-burger-ab7b0.firebaseio.com/ingredients.json"
      );
      dispatch(loadIngredientsHelper(res.data));
    } catch (e) {
      dispatch(errorFound());
    }
  };
};
