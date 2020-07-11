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

export const purchaseBurger = (orderData, token) => {
  return (dispatch) => {
    dispatch(purchaseBurgerStart());
    axios
      .post("/orders.json?auth=" + token, orderData)
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

export const fetchOrdersStart = (token, userId) => {
  return (dispatch) => {
    dispatch(fetchOrdersInit());
    const queryParams =
      "?auth=" + token + '&orderBy="userId"&equalTo="' + userId + '"';
    axios
      .get("/orders.json" + queryParams)
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
