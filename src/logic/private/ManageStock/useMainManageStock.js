import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as XLSX from "xlsx";

import * as manageStockService from "../../../services/manageStock.service";
import { IsCheckToken } from "../../../services/account.service";
import { setPagination } from "../../../actions/managestock.action";

const useMainManageStock = () => {
  const dispatch = useDispatch();
  const { pagination } = useSelector((state) => state.manageStock);
  const [data, setData] = useState();

  const GetManageStock = async () => {
    var token = localStorage.getItem("token");
    var isToken = await IsCheckToken(token);
    if (isToken) {
      var response = await manageStockService.GetManageStocks(
        pagination,
        token
      );
      if (response.statusCode === 200) {
        setData(response.data);
        dispatch(setPagination({ ...pagination, ...response.pagination }));
      } else console.log(response.message);
    }
  };

  const onChangeCurrentPage = (page) => {
    pagination.currentPage = page;
    dispatch(setPagination(pagination));
    GetManageStock();
  };

  const onChangePageSize = (pageSize) => {
    pagination.pageSize = pageSize;
    pagination.currentPage = 1;
    GetManageStock();
  };

  const handleExportExcel = async () => {
    var token = localStorage.getItem("token");
    var isToken = await accountService.IsCheckToken(token);
    if (isToken) {
      var response = await accountService.GetForExcel(token);
      if (response.statusCode == 200) {
        var emp_data = response.data.map(
          (item, i) =>
            (emp_data = {
              ลำดับ: i + 1,
              รหัส: item.id,
              ชื่อผู้ใข้งาน: item.username,
              ชื่อ: item.name,
              สถานะ: item.role,
              วันที่เข้าสู่ระบบ: functionService.Dateformat(item.createDate),
            })
        );
        var wb = XLSX.utils.book_new();
        var ws = XLSX.utils.json_to_sheet(emp_data, { header: ["ลำดับ"] });
        XLSX.utils.book_append_sheet(wb, ws, "account_data");
        XLSX.writeFile(wb, "account_data.xlsx");
      }
    }
  };

  return {
    handleExportExcel,
    dispatch,
    pagination,
    data,
    setData,
    GetManageStock,
    onChangeCurrentPage,
    onChangePageSize,
  };
};

export default useMainManageStock;
