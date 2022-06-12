import API from "../helper/axios";

export const GetCategory = async () => {
  try {
    let url = "apicategories";
    var response = await API.get(url);
    return response.data;
  } catch (e) {
    console.log(e);
    return e;
  }
};
