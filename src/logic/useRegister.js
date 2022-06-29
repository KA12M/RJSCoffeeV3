import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

import { Register } from "../services/account.service";

const useRegister = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigate();

  const onRegister = async (values) => {
    setIsLoading(true);
    var response = await Register(values);
    setIsLoading(false);
    if (response.statusCode == 200) {
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: response.message,
        showConfirmButton: false,
        timer: 1500,
      });
      navigation("/");
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: response.message,
        showConfirmButton: false,
        timer: 1500,
      });
    } else
      Swal.fire({
        icon: "error",
        title: response.message,
      });
  };

  return { isLoading, onRegister,navigation };
};

export default useRegister;
