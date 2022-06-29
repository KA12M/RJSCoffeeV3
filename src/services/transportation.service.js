import API from "../helper/axios";

export const CreateTransportation = async (values, token) => {
  try {
    var url = "ApiTransportations/CreateTransportation";
    var config = {
      headers: { Authorization: "Bearer " + token },
    };
    var formData = new FormData();
    formData.append("orderId", values.orderId);
    formData.append("status", values.status);
    formData.append("detail", values.detail);
    var response = await API.post(url, formData, config);
    return response.data;
  } catch (e) {
    console.log(e);
    return e;
  }
};

export const EditTransportation = async (values, token) => {
  try {
    var url = "ApiTransportations/EditTransportation";
    var config = {
      headers: { Authorization: "Bearer " + token },
    };
    var formData = new FormData();
    formData.append("id", values.id);
    formData.append("status", values.status);
    formData.append("detail", values.detail);
    var response = await API.put(url, formData, config);
    return response.data;
  } catch (e) {
    console.log(e);
    return e;
  }
};

export const DeleteTransportation = async (id, token) => {
    try {
      var url = "ApiTransportations/DeleteTransportation/" + id;
      var config = {
        headers: { Authorization: "Bearer " + token },
      }; 
      var response = await API.delete(url, config);
      return response.data;
    } catch (e) {
      console.log(e);
      return e;
    }
  };
