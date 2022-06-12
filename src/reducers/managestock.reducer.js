import * as constants from "../Constants";

const initialState = {
  cartItem: null,
  pagination: {
    currentPage: 1,
    pageSize: 10,
  },
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case constants.STOCK_SET_CARTITEM:
      return { ...state, cartItem: payload };
    case constants.STOCK_CLEAR:
      return { ...state, cartItem: null };
    case constants.STOCK_SET_PAGINATION:
      return { ...state, pagination: payload };
    default:
      return state;
  }
};
