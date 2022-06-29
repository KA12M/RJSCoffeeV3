import * as constants from "../constants/redux";

const initialState = {
  token: null,
  user: { roleId: "0" }, 
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case constants.ACCOUNT_SET_TOKEN:
      return { ...state, token: payload };
    case constants.ACCOUNT_SET_USER:
      return { ...state, user: payload };
    case constants.ACCOUNT_CLEAR_TOKEN_USER:
      return { ...state, token: null, user: { roleId: "0" }}; 

    default:
      return state;
  }
};
