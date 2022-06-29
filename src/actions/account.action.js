import * as constants from "../constants/redux";

export const setToken = (payload) => (dispatch) =>
  dispatch({
    type: constants.ACCOUNT_SET_TOKEN,
    payload,
  });

export const clear = () => (dispatch) =>
  dispatch({
    type: constants.ACCOUNT_CLEAR_TOKEN_USER,
  });

export const setUser = (payload) => (dispatch) =>
  dispatch({
    type: constants.ACCOUNT_SET_USER,
    payload,
  });
