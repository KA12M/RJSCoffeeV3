import { useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";

import { IsCheckToken } from "../../../services/account.service";
import * as accountActions from "../../../actions/account.action";
import { default as jsonTransportationStatus } from "../../../helper/json/TransportationStatus.json";

import * as orderService from "../../../services/order.service";
import * as transportationService from "../../../services/transportation.service";

const useDetailOrder = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.account);

  const [idIsUpdate, setIdIsUpdate] = useState();
  const [isUpdate, setIsUpdate] = useState(false);
  const [data, setData] = useState();

  const [status, setStatus] = useState("");
  const [detail, setDetail] = useState("");
  const [indexUpdateTransportation, setIndexUpdateTransportation] = useState();
  const [isFormTransportation, setIsFormTransportation] = useState(false);

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

  const handleConfirmPayment = () => {
    Swal.fire({
      title: "ยืนยัน?",
      text: `ยืนยันการชำระเงิน คำสั่งซื้อ: ${id}!`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      cancelButtonText: "ยกเลิก",
      confirmButtonText: "ตกลง",
    }).then(async (result) => {
      if (result.isConfirmed) {
        var response = await orderService.ConfirmStatusOrder(id, token);
        if (response.statusCode === 200) {
          Swal.fire("success!", response.message, "success");
          GetOrderDetail();
        } else Swal.fire("error!", response.message, "errors");
      }
    });
  };

  const handleUpdatePayment = async (values) => {
    var response = await orderService.UpdatePayment(values, token);
    if (response.statusCode === 200) {
      setIsUpdate(false);
      setIdIsUpdate();
      GetOrderDetail();
    } else console.log(response.message);
  };

  const handleSubmitFormTransportation = async () => {
    if (status == "" || detail == "") return null;
    if (indexUpdateTransportation) {
      var response = await transportationService.EditTransportation(
        {
          id: data.transportation[indexUpdateTransportation].id,
          status,
          detail,
        },
        token
      );
      if (response.statusCode === 200) {
        setStateNull();
        GetOrderDetail();
      } else alert(response.message);
    } else {
      var response = await transportationService.CreateTransportation(
        { orderId: data.id, status, detail },
        token
      );
      if (response.statusCode === 200) {
        setStateNull();
        GetOrderDetail();
      } else alert(response.message);
    }
  };

  const setStateNull = () => {
    setStatus("");
    setDetail("");
    setIsFormTransportation(false);
    setIndexUpdateTransportation();
  };

  const handleDeleteTransportation = async (id) => {
    Swal.fire({
      title: "ยืนยันการลบ?",
      text: "ลบสถานะการจัดส่งสินค้า!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "ตกลง",
      cancelButtonText: "ยกเลิก",
    }).then(async (result) => {
      if (result.isConfirmed) {
        var response = await transportationService.DeleteTransportation(
          id,
          token
        );
        if (response.statusCode === 200) {
          GetOrderDetail();
          setStateNull();
          Swal.fire("ลบ", response.message, "success");
        } else alert(response.message);
      }
    });
  };

  return {
    data,
    GetOrderDetail,
    handleConfirmPayment,
    idIsUpdate,
    setIdIsUpdate,
    isUpdate,
    setIsUpdate,
    handleUpdatePayment,
    indexUpdateTransportation,
    setIndexUpdateTransportation,
    isFormTransportation,
    setIsFormTransportation,
    status,
    setStatus,
    detail,
    setDetail,
    handleSubmitFormTransportation,
    handleDeleteTransportation,
    jsonTransportationStatus,
  };
};

export default useDetailOrder;
