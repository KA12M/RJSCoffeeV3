import { useState } from "react";
import { useNavigate } from "react-router-dom"; 

import * as accountService from "../../services/account.service";
import * as productService from "../../services/product.service";
import * as orderService from "../../services/order.service";

const UseHome = () => { 

  const navigation = useNavigate();
  const [accountData, setAccountData] = useState();
  const [productData, setProductData] = useState();
  const [orderData, setOrderData] = useState();

  const GetData = async () => {
    var token = localStorage.getItem("token");
    var isToken = await accountService.IsCheckToken(token);
    if (isToken) {
      await GetProductData();
      await GetOrderData(token);
      var response = await accountService.GetByCraeteDateLast(3, token);
      if (response.statusCode === 200) setAccountData(response.data);
      else console.log(response.message);
    }
  };

  const GetProductData = async () => {
    var response = await productService.GetProducts({ pageSize: 3 });
    if (response.statusCode === 200) setProductData(response.data);
    else console.log(response.message);
  };

  const GetOrderData = async (token) => {
    var response = await orderService.GetOrders({ pageSize: 3 }, token);
    if (response.statusCode === 200) setOrderData(response.data);
    else console.log(response.message);
  };

  return { accountData, GetData, productData, navigation, orderData };
};

export default UseHome;
