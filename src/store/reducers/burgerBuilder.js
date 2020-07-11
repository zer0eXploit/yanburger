import * as actionTypes from "../actions/actionsTypes";
import { updateObject } from "../utility";

const INGREDIENT_PRICES = {
  salad: 0.2,
  bacon: 2,
  cheese: 0.4,
  meat: 2,
};

const initialState = {
  ingredients: null,
  totalPrice: 2,
  error: false,
  building: false,
};

const addIngredient = (state, action) => {
  const addedIg = {
    [action.payload.ingredientName]:
      state.ingredients[action.payload.ingredientName] + 1,
  };
  const igsWithAddedIg = updateObject(state.ingredients, addedIg);
  const propsWithAddedIg = {
    ingredients: igsWithAddedIg,
    totalPrice:
      state.totalPrice + INGREDIENT_PRICES[action.payload.ingredientName],
    building: true,
  };

  return updateObject(state, propsWithAddedIg);
};

const removeIngredient = (state, action) => {
  const removedIg = {
    [action.payload.ingredientName]:
      state.ingredients[action.payload.ingredientName] - 1,
  };
  const igsWithRemovedIg = updateObject(state.ingredients, removedIg);
  const propsWithRemovedIg = {
    ingredients: igsWithRemovedIg,
    totalPrice:
      state.totalPrice - INGREDIENT_PRICES[action.payload.ingredientName],
    building: true,
  };

  return updateObject(state, propsWithRemovedIg);
};

const setIngredients = (state, action) => {
  return updateObject(state, {
    ingredients: action.payload.ingredients,
    totalPrice: 2,
    error: false,
    building: false,
  });
};

const fetchIngredientsFailed = (state) => {
  return updateObject(state, { error: true });
};

const ingredientsReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_INGREDIENT:
      return addIngredient(state, action);

    case actionTypes.REMOVE_INGREDIENT:
      return removeIngredient(state, action);

    case actionTypes.SET_INGREDIENTS:
      return setIngredients(state, action);

    case actionTypes.FETCH_INGREDIENTS_FAILED:
      return fetchIngredientsFailed(state);

    default:
      return state;
  }
};

export default ingredientsReducer;
