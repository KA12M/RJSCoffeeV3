import API from "../helper/axios";

export const GetProducts = async ({
  currentPage,
  pageSize,
  categoryId,
  search,
}) => {
  try {
    let url = "apiproducts/getproducts";
    url += `?currentPage=${currentPage}&pageSize=${pageSize}&categoryId=${categoryId}&search=${search}`;
    var response = await API.get(url);
    return response.data;
  } catch (e) {
    console.log(e);
    return e;
  }
};

export const GetById = async (id) => {
  try {
    let url = "apiproducts/GetById/" + id; 
    var response = await API.get(url);
    return response.data;
  } catch (e) {
    console.log(e);
    return e;
  }
};

export const GetRandom = async (num) => {
  try {
    let url = "apiproducts/GetRandom/" + num;
    var response = await API.get(url);
    return response.data;
  } catch (e) {
    console.log(e);
    return e;
  }
};

export const DeleteProduct = async ({ id, token }) => {
  try {
    let url = "apiproducts/deleteproduct/" + id;
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

export const CreateProduct = async (values, token) => {
  try {
    let url = "apiproducts/CreateProduct";
    var config = {
      headers: { Authorization: "Bearer " + token },
    };
    let formData = new FormData();
    formData.append("name", values.name);
    formData.append("price", values.price);
    formData.append("detail", values.detail);
    formData.append("seed", values.seed);
    formData.append("level", values.level);
    formData.append("categoryId", parseInt(values.categoryId));
    if (values.upfileList)
      for (let i = 0; i < values.upfileList.length; i++) {
        formData.append("upfile", values.upfileList[i]);
      }
    var response = await API.post(url, formData, config);
    return response.data;
  } catch (e) {
    console.log(e);
    return e;
  }
};

export const UpdateProduct = async (values, token) => {
  try {
    let url = "ApiProducts/UpdateProduct";
    var config = {
      headers: { Authorization: "Bearer " + token },
    };
    let formData = new FormData();
    formData.append("id", values.id);
    formData.append("name", values.name);
    formData.append("price", values.price);
    formData.append("detail", values.detail);
    formData.append("seed", values.seed);
    formData.append("level", values.level);
    formData.append("categoryId", parseInt(values.categoryId));
    if (values.upfileList)
      for (let i = 0; i < values.upfileList.length; i++) {
        formData.append("upfile", values.upfileList[i]);
      }
    var response = await API.put(url, formData, config);
    return response.data;
  } catch (e) {
    console.log(e);
    return e;
  }
};
