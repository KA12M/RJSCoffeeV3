import * as constants from "../Constants";

const initialState = {
  pagination: {
    currentPage: 1,
    pageSize: 5,
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
