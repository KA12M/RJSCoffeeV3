import * as constants from "../Constants";

export const setData = (payload) => (dispatch) =>
  dispatch({
    type: constants.ORDER_SET_DATA,
    payload,
  });

export const setPagination = (payload) => (dispatch) =>
  dispatch({
    type: constants.ORDER_SET_PAGINATION,
    payload,
  });

export const clear = () => (dispatch) =>
  dispatch({
    type: constants.ORDER_CLEAR,
  });
