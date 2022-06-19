import * as constants from "../Constants";

export const setPagination = (payload) => (dispatch) =>
  dispatch({
    type: constants.PRODUCT_SET_PAGINATION,
    payload,
  });
