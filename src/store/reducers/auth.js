import * as actionTypes from "../actions/actionsTypes";
import { updateObject } from "../../shared/utility";

const initialState = {
  token: null,
  userId: null,
  error: null,
  loading: false,
  authRedirectPath: "/",
};

const authStart = (state) => {
  return updateObject(state, {
    error: null,
    loading: true,
  });
};

const setAuthRedirectPath = (state, action) => {
  return updateObject(state, {
    authRedirectPath: action.payload.path,
  });
};

const authSucceed = (state, action) => {
  return updateObject(state, {
    token: action.payload.idToken,
    userId: action.payload.localId,
    error: null,
    loading: false,
  });
};

const authFailed = (state, action) => {
  return updateObject(state, {
    error: action.payload.error,
    loading: false,
  });
};

const authLogout = (state) => {
  return updateObject(state, {
    token: null,
    userId: null,
  });
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_START:
      return authStart(state);
    case actionTypes.AUTH_SUCCEED:
      return authSucceed(state, action);
    case actionTypes.AUTH_FAILED:
      return authFailed(state, action);
    case actionTypes.AUTH_LOGOUT:
      return authLogout(state);
    case actionTypes.SET_AUTH_REDIRECT_PATH:
      return setAuthRedirectPath(state, action);
    default:
      return state;
  }
};

export default authReducer;
