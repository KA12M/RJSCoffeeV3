import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { IsCheckToken } from "../../../services/account.service";
import { GetById } from "../../../services/manageStock.service";

const useDetailManageStock = () => {
  const navigation = useNavigate();
  const { id } = useParams();
  const [data, setData] = useState();

  const GetManageStockById = async () => {
    var token = localStorage.getItem("token");
    var isToken = await IsCheckToken(token);
    if (isToken) {
      var response = await GetById(id, token);
      if (response.statusCode === 200) setData(response.data);
      else console.log(response.message);
    }
  };

  return { navigation, id, data, setData, GetManageStockById };
};

export default useDetailManageStock;
