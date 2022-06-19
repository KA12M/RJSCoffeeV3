import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";

import * as accountActions from "../../../actions/account.action";
import * as functionService from "../../../helper/functionService";
import * as accountService from "../../../services/account.service";

const UseMainAccount = () => {
  // State
  const navigation = useNavigate();
  const dispatch = useDispatch();

  const [data, setData] = useState();
  const [pagination, setPagination] = useState({
    currentPage: 1,
    pageSize: 5,
  });
  const [search, setSearch] = useState("");

  // Call back function
  const GetData = async () => {
    const token = localStorage.getItem("token");
    let isChkToken = await accountService.IsCheckToken(token);
    if (isChkToken) {
      var response = await accountService.GetAccounts({
        ...pagination,
        search,
        token,
      });
      if (response.statusCode === 200) {
        setData(response.data);
        setPagination({ ...pagination, ...response.pagination });
      }
    } else {
      localStorage.removeItem("token");
      dispatch(accountActions.clear());
    }
    functionService.ScrollToTop();
  };

  const onChangeCurrentPage = (page) => {
    pagination.currentPage = page;
    setPagination(pagination);
    GetData();
  };

  const onChangePageSize = (pageSize) => {
    pagination.pageSize = pageSize;
    pagination.currentPage = 1;
    GetData();
  };

  const onDeleteAccount = async (item) => {
    Swal.fire({
      title: "ยืนยันการลบ?",
      text: `ต้องการลบบัญชีผู้ใช้ ${item.name}`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "ตกลง",
      cancelButtonText: "ยกเลิก",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const token = localStorage.getItem("token");
        var isChkToken = await accountService.IsCheckToken(token);
        if (isChkToken) {
          var response = await accountService.DeleteAccount({
            id: item.id,
            token,
          });
          DialogAlert(response);
        }
      }
    });
  };

  const DialogAlert = (response) => {
    if (response.statusCode == 200) {
      Swal.fire("Deleted!", response.message, "success");
      GetData();
    } else
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: response.message,
      });
  };

  return {
    data,
    navigation,
    setData,
    pagination,
    setPagination,
    search,
    setSearch,
    GetData,
    onChangeCurrentPage,
    onChangePageSize,
    onDeleteAccount,
    DialogAlert,
  };
};

export default UseMainAccount;
