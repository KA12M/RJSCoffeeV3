import { useState } from "react";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";

import * as actionAccounts from "../actions/account.action";
import * as accountService from "../services/account.service";

const useLogin = () => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const getAccountData = async (token) => {
    const response = await accountService.GetByToken(token);
    if (response.statusCode === 200) {
      dispatch(actionAccounts.setUser(response.data));
      dispatch(actionAccounts.setToken(token));
      localStorage.setItem("token", token);
    } else alert(response.message);
  };
  
  const onLogin = async (values) => {
    setIsLoading(true);
    var res = await accountService.Login(values);
    setIsLoading(false);
    if (res.statusCode === 200) {
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: res.message,
        showConfirmButton: false,
        timer: 1500,
      });
      getAccountData(res.token);
    } else
      Swal.fire({
        icon: "error",
        text: res.message,
      });
  };

  return { isLoading, onLogin };
};

export default useLogin;
