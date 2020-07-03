import * as actionTypes from "../actions/actionsTypes";
import { updateObject } from "../utility";

const initialState = {
  orders: [],
  loading: false,
  purchased: false,
};

const purchaseBurgerInit = (state) => {
  return updateObject(state, { purchased: false });
};

const purchaseBurgerStart = (state) => {
  return updateObject(state, { loading: true });
};

const purchaseBurgerSucceed = (state, action) => {
  const newOrder = updateObject(action.payload.orderData, {
    id: action.payload.orderId,
  });
  return updateObject(state, {
    orders: state.orders.concat(newOrder),
    loading: false,
    purchased: true,
  });
};

const purchaseBurgerFailed = (state) => {
  return updateObject(state, { loading: false });
};

const fetchOrdersInit = (state) => {
  return updateObject(state, { loading: true });
};

const fetchOrdersSucceed = (state, action) => {
  return updateObject(state, {
    orders: action.payload.orders,
    loading: false,
  });
};

const fetchOrdersFailed = (state) => {
  return updateObject(state, { loading: false });
};

const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.PURCHASE_BURGER_INIT:
      return purchaseBurgerInit(state);

    case actionTypes.PURCHASE_BURGER_START:
      return purchaseBurgerStart(state);

    case actionTypes.PURCHASE_BURGER_SUCCEED:
      return purchaseBurgerSucceed(state, action);

    case actionTypes.PURCHASE_BURGER_FAILED:
      return purchaseBurgerFailed(state);

    case actionTypes.FETCH_ORDERS_INIT:
      return fetchOrdersInit(state);

    case actionTypes.FETCH_ORDERS_SUCCEED:
      return fetchOrdersSucceed(state, action);

    case actionTypes.FETCH_ORDERS_FAILED:
      return fetchOrdersFailed(state);

    default:
      return state;
  }
};

export default orderReducer;
