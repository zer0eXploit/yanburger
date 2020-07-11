import * as actionTypes from "./actionsTypes";
import axios from "axios";

const authStart = () => {
  return {
    type: actionTypes.AUTH_START,
  };
};

const authSucceed = (authData) => {
  return {
    type: actionTypes.AUTH_SUCCEED,
    payload: authData,
  };
};

const authFailed = (error) => {
  return {
    type: actionTypes.AUTH_FAILED,
    payload: error,
  };
};

const logOutTimeout = (timeoutPeriod) => {
  return (dispatch) => {
    console.log("Token expiring in: " + timeoutPeriod + " seconds.");
    setTimeout(() => {
      dispatch(authLogout());
    }, timeoutPeriod * 1000);
  };
};

export const setAuthRedirectPath = (path) => {
  return {
    type: actionTypes.SET_AUTH_REDIRECT_PATH,
    payload: {
      path,
    },
  };
};

export const authLogout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("expirationDate");
  localStorage.removeItem("userId");
  return {
    type: actionTypes.AUTH_LOGOUT,
  };
};

export const autoAuth = () => {
  return (dispatch) => {
    const token = localStorage.getItem("token");
    const localId = localStorage.getItem("userId");
    const expirationDate = localStorage.getItem("expirationDate"); // standard format
    const currentTime = new Date().getTime(); // in milliseconds
    const expirationTime = new Date(expirationDate).getTime(); // in milliseconds

    if (!token) {
      dispatch(authLogout());
    } else {
      if (expirationTime > currentTime) {
        const authData = {
          idToken: token,
          localId,
        };
        dispatch(authSucceed(authData));
        dispatch(logOutTimeout((expirationTime - currentTime) / 1000));
      } else {
        dispatch(authLogout());
      }
    }
  };
};

export const auth = (email, password, isSignUp) => {
  return (dispatch) => {
    dispatch(authStart());
    const authData = {
      email,
      password,
      returnSecureToken: true,
    };

    let uri =
      "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBL_PUR70BgIPICQpirUAWDd3S63fzktl8";
    if (!isSignUp) {
      uri =
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBL_PUR70BgIPICQpirUAWDd3S63fzktl8";
    }
    axios
      .post(uri, authData)
      .then((response) => {
        const exiprationDate = new Date(
          new Date().getTime() + response.data.expiresIn * 1000
        );
        localStorage.setItem("token", response.data.idToken);
        localStorage.setItem("expirationDate", exiprationDate);
        localStorage.setItem("userId", response.data.localId);
        dispatch(logOutTimeout(response.data.expiresIn));
        dispatch(authSucceed(response.data));
      })
      .catch((error) => {
        console.log(error.response.data);
        dispatch(authFailed(error.response.data));
      });
  };
};
