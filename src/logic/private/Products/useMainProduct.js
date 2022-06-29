import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import * as XLSX from "xlsx";

import * as accountActions from "../../../actions/account.action";
import * as accountService from "../../../services/account.service";
import * as productActions from "../../../actions/product.action";
import * as productService from "../../../services/product.service.js";
import * as manageStockService from "../../../services/manageStock.service";
import * as functionService from "../../../helper/functionService";
import { setCartItem } from "../../../actions/managestock.action";

const useMainProduct = () => {
  const navigation = useNavigate();
  const dispatch = useDispatch();
  const [data, setData] = useState();
  const { pagination } = useSelector((state) => state.product);
  const [search, setSearch] = useState("");

  const GetData = async () => {
    var response = await productService.GetProducts({
      ...pagination,
      search,
    });
    if (response.statusCode === 200) {
      setData(response.data);
      dispatch(
        productActions.setPagination({ ...pagination, ...response.pagination })
      );
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const onChangeCurrentPage = (page) => {
    pagination.currentPage = page;
    dispatch(productActions.setPagination(pagination));
    GetData();
  };

  const onChangePageSize = (pageSize) => {
    pagination.pageSize = pageSize;
    pagination.currentPage = 1;
    GetData();
  };

  const onDelete = async (item) => {
    Swal.fire({
      title: "ยืนยันการลบ?",
      text: `ลบสินค้า ${item.name}`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "ตกลง",
      cancelButtonText: "ยกเลิก",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const token = localStorage.getItem("token");
        var isToken = await accountService.IsCheckToken(token);
        if (isToken) {
          var response = await productService.DeleteProduct({
            id: item.id,
            token,
          });
          if (response.statusCode === 200) {
            GetData();
            Swal.fire("Deleted!", response.message, "success");
          } else if (response.response.status === 401) clearAuthen();
        }
      }
    });
  };

  const clearAuthen = () => {
    localStorage.removeItem("token");
    dispatch(accountActions.clear());
  };

  const GetAddStockAndSetState = async (token) => {
    var response = await manageStockService.GetAddStocks(token);
    if (response.statusCode == 200) dispatch(setCartItem(response.data));
    else console.log(response);
  };

  const onAddCartItem = async (values) => {
    const token = localStorage.getItem("token");
    var isToken = await accountService.IsCheckToken(token);
    if (isToken) {
      var response = await manageStockService.CraeteCartItem(values, token);
      if (response.statusCode == 200) {
        Swal.fire("Success!", response.message, "success");
        GetAddStockAndSetState(token);
      } else
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: response.message,
        });
    } else clearAuthen();
  };

  const handleExportExcel = async () => {
    var token = localStorage.getItem("token");
    var isToken = await accountService.IsCheckToken(token);
    if (isToken) {
      var response = await productService.GetForExcel(token);
      if (response.statusCode == 200) {
        var emp_data = response.data.map((item, i) => {
          item.createDate = functionService.Dateformat(item.createDate); 
          return item;
        });
        var wb = XLSX.utils.book_new();
        var ws = XLSX.utils.json_to_sheet(emp_data);
        XLSX.utils.book_append_sheet(wb, ws, "product_data");
        XLSX.writeFile(wb, "product_data.xlsx");
      }
    }
  };

  return {
    navigation,
    pagination,
    data,
    search,
    setSearch,
    onChangeCurrentPage,
    GetData,
    onChangePageSize,
    onDelete,
    GetAddStockAndSetState,
    onAddCartItem,
    handleExportExcel,
  };
};

export default useMainProduct;
