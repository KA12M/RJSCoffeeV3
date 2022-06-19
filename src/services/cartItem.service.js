import API from "../helper/axios";

export const GetByAccountId = async (id, token) => {
  try {
    let url = "apicartitems/getbyaccountid/" + id;
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
