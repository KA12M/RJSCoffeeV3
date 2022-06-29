import API from "../helper/axios";

export const GetOrders = async (
  { status = "", currentPage = 1, pageSize = 5 },
  token
) => {
  try {
    let url = "ApiOrders/GetOrders";
    url += `?status=${
      status ? status : ""
    }&pageSize=${pageSize}&currentPage=${currentPage}`;
    var config = {
      headers: { Authorization: "Bearer " + token },
    };
    var response = await API.get(url, config);
    return response.data;
  } catch (e) {
    console.log(e);
    return e;
  }
};

export const GetForExcel = async (token) => {
  try {
    let url = "ApiOrders/GetForExcel";
    var config = {
      headers: { Authorization: "Bearer " + token },
    };
    var response = await API.get(url, config);
    return response.data;
  } catch (e) {
    console.log(e);
    return e;
  }
};

export const GetById = async (id, token) => {
  try {
    let url = "ApiOrders/GetById/" + id;
    var config = {
      headers: { Authorization: "Bearer " + token },
    };
    var response = await API.get(url, config);
    return response.data;
  } catch (e) {
    console.log(e);
    return e;
  }
};

export const ConfirmStatusPayment = async (id, token) => {
  try {
    let url = "ApiOrders/ConfirmStatusPayment/" + id;
    var config = {
      headers: { Authorization: "Bearer " + token },
    };
    var response = await API.put(url, null, config);
    return response.data;
  } catch (e) {
    console.log(e);
    return e;
  }
};

export const ConfirmStatusOrder = async (id, token) => {
  try {
    let url = "ApiOrders/ConfirmStatusOrder/" + id;
    var config = {
      headers: { Authorization: "Bearer " + token },
    };
    var response = await API.put(url, null, config);
    return response.data;
  } catch (e) {
    console.log(e);
    return e;
  }
};

export const SuccessStatusOrder = async (id, token) => {
  try {
    let url = "ApiOrders/SuccessStatusOrder/" + id;
    var config = {
      headers: { Authorization: "Bearer " + token },
    };
    var response = await API.put(url, null, config);
    return response.data;
  } catch (e) {
    console.log(e);
    return e;
  }
};

export const UpdatePayment = async (values, token) => {
  try {
    let url = "ApiPayments/UpdatePayment";
    var config = {
      headers: { Authorization: "Bearer " + token },
    };
    var formData = new FormData();
    formData.append("id", values.id);
    formData.append("ImgPay", values.imgPay);
    formData.append("Status", values.status);
    formData.append("Detail", values.detail);
    formData.append("Createdate", values.createdate);
    formData.append("OrderId", values.orderId);
    var response = await API.put(url, formData, config);
    return response.data;
  } catch (e) {
    console.log(e);
    return e;
  }
};
