import React, { useEffect, useState } from "react";

// Redux SetUp
import { Provider, useDispatch } from "react-redux";
import { applyMiddleware, legacy_createStore } from "redux";
import logger from "redux-logger";
import thunk from "redux-thunk";
import reducers from "./reducers";
const store = legacy_createStore(reducers, applyMiddleware(thunk, logger));
// End Redux SetUp

import * as manageStockService from "./services/manageStock.service";
import * as accountActions from "./actions/account.action";
import * as accountService from "./services/account.service";
import ManageRoute from "./Routes";
import { setCartItem } from "./actions/managestock.action";

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) getAccountData(token);
    else setIsLoading(false);
  }, []);

  const getAccountData = async (token) => {
    var response = await accountService.GetByToken(token);
    if (response.statusCode === 200) {
      dispatch(accountActions.setToken(token));
      dispatch(accountActions.setUser(response.data));
      var response1 = await manageStockService.GetAddStocks(token);
      if (response1.statusCode == 200) dispatch(setCartItem(response1.data));
      else console.log(response);
    } else if (response.response.status === 401) {
      localStorage.removeItem("token");
      dispatch(accountActions.clear());
    }
    setIsLoading(false);
  };

  if (isLoading)
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <img src="/src/isloading.gif" alt="Loading" />
      </div>
    );
  return <ManageRoute />;
};

export default () => (
  <Provider store={store}>
    <App />
  </Provider>
);
