import { useState } from "react";
import Swal from "sweetalert2";
import { useSelector, useDispatch } from "react-redux";

import * as manageStockService from "../../../services/manageStock.service";
import { IsCheckToken } from "../../../services/account.service";
import { clear } from "../../../actions/account.action";
import { setCartItem, setTotal } from "../../../actions/managestock.action";

const useCartItem = () => {
  const dispatch = useDispatch();
  const { cartItem, total } = useSelector((state) => state.manageStock);
  const [isLoading, setIsLoading] = useState(false);

  const GetCartItem = async () => {
    var token = localStorage.getItem("token");
    var isToken = await IsCheckToken(token);
    if (isToken) {
      var response = await manageStockService.GetAddStocks(token);
      if (response.statusCode == 200) {
        dispatch(setCartItem(response.data));
        dispatch(setTotal(response.total));
      } else console.log(response);
    } else {
      localStorage.removeItem("token");
      dispatch(clear());
    }
  };

  const onDeleteItem = async (id) => {
    Swal.fire({
      title: "ยืนยัน?",
      text: "ลบรายการสั่งซื้อ!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "ตกลง",
      cancelButtonText: "ยกเลิก",
    }).then(async (result) => {
      if (result.isConfirmed) {
        var token = localStorage.getItem("token");
        var isToken = await IsCheckToken(token);
        if (isToken) {
          var response = await manageStockService.Delete(id, token);
          if (response.statusCode == 200) {
            GetCartItem();
            Swal.fire("Deleted!", response.message, "success");
          } else
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: response.message,
            });
        } else {
          localStorage.removeItem("token");
          dispatch(clear());
        }
      }
    });
  };

  const onPlusItem = async (id) => {
    var token = localStorage.getItem("token");
    var isToken = await IsCheckToken(token);
    if (isToken) {
      var response = await manageStockService.Plus(id, token);
      if (response.statusCode == 200) GetCartItem();
      else console.log(response);
    } else {
      localStorage.removeItem("token");
      dispatch(clear());
    }
  };

  const onRemoveItem = async (id) => {
    var token = localStorage.getItem("token");
    var isToken = await IsCheckToken(token);
    if (isToken) {
      var response = await manageStockService.Remove(id, token);
      if (response.statusCode == 200) GetCartItem();
      else console.log(response);
    } else {
      localStorage.removeItem("token");
      dispatch(clear());
    }
  };

  const onSubmitStock = async () => {
    Swal.fire({
      title: "ยืนยัน?",
      text: "ยืนยันการสั่งซื้อสินค้า!",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "ตกลง",
      cancelButtonText: "ยกเลิก",
    }).then(async (result) => {
      if (result.isConfirmed) {
        setIsLoading(true);
        var token = localStorage.getItem("token");
        var isToken = await IsCheckToken(token);
        if (isToken) {
          var response = await manageStockService.CreateManageStock(
            total,
            cartItem,
            token
          );
          if (response.statusCode == 200) {
            GetCartItem();
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: response.message,
              showConfirmButton: false,
              timer: 1500,
            });
          } else console.log(response);
        } else {
          localStorage.removeItem("token");
          dispatch(clear());
        }
        setIsLoading(false);
      }
    });
  };

  return {
    dispatch,
    cartItem,
    total,
    isLoading,
    setIsLoading,
    GetCartItem,
    onDeleteItem,
    onPlusItem,
    onRemoveItem,
    onSubmitStock,
  };
};

export default useCartItem;
