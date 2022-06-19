import API from "../helper/axios";

export const GetOrders = async ({ status, currentPage, pageSize }, token) => {
  try {
    let url = "ApiOrders/GetOrders";
    url += `?status=${status}&pageSize=${pageSize}&currentPage=${currentPage}`;
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
