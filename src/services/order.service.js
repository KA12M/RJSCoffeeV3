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
