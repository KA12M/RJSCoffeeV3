import * as constants from "../constants/redux";

export const setCartItem = (payload) => (dispatch) =>
  dispatch({
    type: constants.STOCK_SET_CARTITEM,
    payload,
  });

export const clear = () => (dispatch) =>
  dispatch({
    type: constants.STOCK_CLEAR,
  });

export const setPagination = (payload) => (dispatch) =>
  dispatch({
    type: constants.STOCK_SET_PAGINATION,
    payload,
  });

export const setTotal = (payload) => (dispatch) =>
  dispatch({
    type: constants.STOCK_SET_TOTAL,
    payload,
  });
