import * as constants from "../constants/redux";

const initialState = {
  cartItem: null,
  total: 0,
  pagination: {
    currentPage: 1,
    pageSize: 10,
  },
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case constants.STOCK_SET_CARTITEM:
      return { ...state, cartItem: payload };
    case constants.STOCK_SET_TOTAL:
      return { ...state, total: payload };
    case constants.STOCK_CLEAR:
      return { ...state, cartItem: null, total: 0 };
    case constants.STOCK_SET_PAGINATION:
      return { ...state, pagination: payload };
    default:
      return state;
  }
};
