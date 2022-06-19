import { combineReducers } from "redux";
import account from "./account.reducer";
import product from "./product.reducer";
import manageStock from "./managestock.reducer";
import order from "./order.reducer";

export default combineReducers({ account, product, manageStock, order });
