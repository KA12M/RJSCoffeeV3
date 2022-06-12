import API from "../helper/axios";

export const DeleteImageProductById = async (id, token) => {
  try {
    let url = "apiproductimage/" + id;
    var config = {
      headers: { Authorization: "Bearer " + token },
    };
    var response = await API.delete(url,config);
    return response.data;
  } catch (e) {
    console.log(e);
    return e;
  }
};
