import * as constants from "../Constants";

const initialState = {
  data: null,
  pagination: {
    status: "",
    currentPage: 1,
    pageSize: 5,
    count: 0,
    totalPage: 0,
  },
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case constants.ORDER_SET_PAGINATION:
      return { ...state, pagination: payload };

    case constants.ORDER_SET_DATA:
      return { ...state, data: payload };

    case constants.ORDER_CLEAR:
      return {
        ...state,
        data: null,
        pagination: { currentPage: 1, pageSize: 5, status: "" },
      };
    default:
      return state;
  }
};
