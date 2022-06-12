import * as constants from "../Constants";

export const setPagination = (payload) => ({
  type: constants.PRODUCT_SET_PAGINATION,
  payload,
});
