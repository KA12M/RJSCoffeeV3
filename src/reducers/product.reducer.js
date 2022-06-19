import * as constants from "../Constants";

const initialState = {
  pagination: {
    categoryId: 0,
    currentPage: 1,
    pageSize: 5,
    count: 0,
    totalPage: 0,
  },
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case constants.PRODUCT_SET_PAGINATION:
      return { ...state , pagination: payload };

    default:
      return state;
  }
};
