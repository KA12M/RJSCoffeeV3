import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import * as productService from "../../../services/product.service";

const useDetailProduct = () => {
  const { id } = useParams();
  const navigation = useNavigate();
  const [data, setData] = useState();

  const GetProductDetail = async () => {
    var response = await productService.GetById(id);
    if (response.statusCode == 200) setData(response.data);
    else console.log(response.message);
  };
  return { id, navigation, data, setData, GetProductDetail };
};

export default useDetailProduct;
