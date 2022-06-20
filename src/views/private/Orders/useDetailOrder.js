import { useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";

import { IsCheckToken } from "./../../../services/account.service";
import * as accountActions from "../../../actions/account.action";

import * as orderService from "../../../services/order.service";

const useDetailOrder = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const [data, setData] = useState();

  const GetOrderDetail = async () => {
    var token = localStorage.getItem("token");
    var isToken = await IsCheckToken(token);
    if (isToken) {
      var response = await orderService.GetById(id, token);
      if (response.statusCode === 200) setData(response.data);
      else console.log(response.message);
    } else {
      dispatch(accountActions.clear());
      localStorage.removeItem("token");
    }
  };
  return { data, GetOrderDetail };
};

export default useDetailOrder;
