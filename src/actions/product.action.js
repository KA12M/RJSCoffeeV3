import * as constants from "../constants/redux";

export const setPagination = (payload) => (dispatch) =>
  dispatch({
    type: constants.PRODUCT_SET_PAGINATION,
    payload,
  });
