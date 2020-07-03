import * as actionTypes from "../actions/actionsTypes";
import axios from "../../axios-order";

export const purchaseBurgerInit = () => {
  return {
    type: actionTypes.PURCHASE_BURGER_INIT,
  };
};

const purchaseBurgerStart = () => {
  return {
    type: actionTypes.PURCHASE_BURGER_START,
  };
};

const purchaseBurgerSucceed = (id, orderData) => {
  return {
    type: actionTypes.PURCHASE_BURGER_SUCCEED,
    payload: {
      orderId: id,
      orderData,
    },
  };
};

const purchaseBurgerFailed = (error) => {
  return {
    type: actionTypes.PURCHASE_BURGER_FAILED,
    payload: {
      error,
    },
  };
};

export const purchaseBurger = (orderData) => {
  return (dispatch) => {
    dispatch(purchaseBurgerStart());
    axios
      .post("/orders.json", orderData)
      .then((res) => {
        dispatch(purchaseBurgerSucceed(res.data.name, orderData));
      })
      .catch((e) => {
        dispatch(purchaseBurgerFailed(e));
      });
  };
};

const fetchOrdersInit = () => {
  return {
    type: actionTypes.FETCH_ORDERS_INIT,
  };
};

const fetchOrdersSucced = (orders) => {
  return {
    type: actionTypes.FETCH_ORDERS_SUCCEED,
    payload: {
      orders,
    },
  };
};

const fetchOrdersFailed = (error) => {
  return {
    type: actionTypes.FETCH_ORDERS_FAILED,
    payload: {
      error,
    },
  };
};

export const fetchOrdersStart = () => {
  return (dispatch) => {
    dispatch(fetchOrdersInit());
    axios
      .get("/orders.json")
      .then((res) => {
        const fetchedData = [];
        for (const key in res.data) {
          fetchedData.push({
            ...res.data[key],
            id: key,
          });
        }
        dispatch(fetchOrdersSucced(fetchedData));
      })
      .catch((e) => {
        console.log(e.message);
        dispatch(fetchOrdersFailed(e));
      });
  };
};
