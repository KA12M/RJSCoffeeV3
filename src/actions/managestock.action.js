import * as constants from "../Constants";

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
