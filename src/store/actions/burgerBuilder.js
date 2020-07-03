import * as actionTypes from "./actionsTypes";
import axios from "../../axios-order";

export const addIngredient = (ingredientName) => {
  return {
    type: actionTypes.ADD_INGREDIENT,
    payload: {
      ingredientName: ingredientName,
    },
  };
};

export const removeIngredient = (ingredientName) => {
  return {
    type: actionTypes.REMOVE_INGREDIENT,
    payload: {
      ingredientName: ingredientName,
    },
  };
};

const setIngredients = (ingredients) => {
  return {
    type: actionTypes.SET_INGREDIENTS,
    payload: {
      ingredients,
    },
  };
};

const fetchIngredientsFailed = () => {
  return {
    type: actionTypes.FETCH_INGREDIENTS_FAILED,
  };
};

export const initIngredients = () => {
  return (dispatch) => {
    axios
      .get("/ingredients.json")
      .then((res) => {
        dispatch(setIngredients(res.data));
      })
      .catch((e) => {
        console.log(e);
        dispatch(fetchIngredientsFailed());
      });
  };
};
