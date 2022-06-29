import { useState } from "react";
import { useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";

import * as accountActions from "../../../actions/account.action";
import * as accountService from "../../../services/account.service";
import * as categoryService from "../../../services/category.service";
import * as productService from "../../../services/product.service";
import { IsCheckToken } from "../../../services/account.service";
import { DeleteImageProductById } from "../../../services/productImage.service";

const useFormProduct = () => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const navigation = useNavigate();
  const { id } = useParams();

  const [data, setData] = useState();
  const [category, setCategory] = useState();

  const fetchCategory = async () => {
    var response = await categoryService.GetCategory();
    if (response) setCategory(response);
    else console.log(response);
  };

  const onSubmitProduct = async (values) => {
    setIsLoading(true);
    if (values.categoryId != 3) {
      values.seed = "";
      values.level = "";
    }
    const token = localStorage.getItem("token");
    let isChkToken = await accountService.IsCheckToken(token);
    if (isChkToken)
      if (!id) onCreateProduct(values, token);
      else onUpdateProduct(values, token);
    else {
      localStorage.removeItem("token");
      dispatch(accountActions.clear());
    }
  };

  const onCreateProduct = async (values, token) => {
    var response = await productService.CreateProduct(values, token);
    DialogAlert(response);
  };

  const onUpdateProduct = async (values, token) => {
    var response = await productService.UpdateProduct({ ...values, id }, token);
    DialogAlert(response);
  };

  const DialogAlert = (response) => {
    if (response.statusCode === 200) {
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: response.message,
        showConfirmButton: false,
        timer: 1500,
      });
      navigation("/mainproducts", { replace: true });
    } else alrtError(response.message);
  };

  const alrtError = (msg) =>
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: msg,
    });
  const alertSuccess = (msg) => {
    GetProductById();
    return Swal.fire({
      icon: "success",
      title: "Success",
      text: msg,
    });
  };

  const DeleteImgById = async (id) => {
    let token = localStorage.getItem("token");
    let isToken = await IsCheckToken(token);
    if (isToken) {
      Swal.fire({
        title: "ยืนยัน?",
        text: "ต้องการลบรูปภาพ",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "ตกลง",
        cancelButtonText: "ยกเลิก",
      }).then(async (result) => {
        if (result.isConfirmed) {
          var response = await DeleteImageProductById(id, token);
          if (response.statusCode == 200) alertSuccess(response.message);
          else alrtError(response.message);
        }
      });
    } else {
      dispatch(accountActions.clear());
      localStorage.removeItem("token");
    }
  };

  const GetProductById = async () => {
    var response = await productService.GetById(id);
    if (response.statusCode === 200) setData(response.data);
    else console.log(response);
  };

  return {
    isLoading,
    setIsLoading,
    navigation,
    id,
    data,
    setData,
    category,
    setCategory,
    fetchCategory,
    onSubmitProduct,
    onCreateProduct,
    onUpdateProduct,
    DialogAlert,
    alrtError,
    alertSuccess,
    DeleteImgById,
    GetProductById,
  };
};

export default useFormProduct;
