import API from "../helper/axios";

export const GetAddStocks = async (token) => {
  try {
    let url = "ApiAddStocks/GetAddStocks";
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

export const CraeteCartItem = async (values, token) => {
  try {
    console.log(JSON.stringify(values));
    let url = "ApiAddStocks/CreateAddStock";
    var config = {
      headers: { Authorization: "Bearer " + token },
    };
    var formData = new FormData();
    formData.append("amount", values.amount);
    formData.append("productId", values.productId);
    var response = await API.post(url, formData, config);
    return response.data;
  } catch (e) {
    console.log(e);
    return e;
  }
};

export const Plus = async (id, token) => {
  try {
    let url = "ApiAddStocks/Plus/" + id;
    var config = {
      headers: { Authorization: "Bearer " + token },
    };
    var response = await API.put(url, {}, config);
    return response.data;
  } catch (e) {
    console.log(e);
    return e;
  }
};

export const Remove = async (id, token) => {
  try {
    let url = "ApiAddStocks/Remove/" + id;
    var config = {
      headers: { Authorization: "Bearer " + token },
    };
    var response = await API.put(url, {}, config);
    return response.data;
  } catch (e) {
    console.log(e);
    return e;
  }
};

export const Delete = async (id, token) => {
  try {
    let url = "ApiAddStocks/Delete/" + id;
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

export const CreateManageStock = async (total, cartItems, token) => {
  try {
    let url = "ApiManageStock/CreateManageStock";
    var config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    };
    var list = [];
    cartItems.forEach((item) =>
      list.push({
        addStockId: item.id,
        amount: item.amount,
        productId: item.product.id,
      })
    );
    var json = { total, items: list };
    var response = await API.post(url, json, config);
    return response.data;
  } catch (e) {
    console.log(e);
    return e;
  }
};

export const GetManageStocks = async (pagination, token) => {
  try {
    let url = "ApiManageStock/GetManageStocks";
    url += `?currentPage=${pagination.currentPage}&pageSize=${pagination.pageSize}`;
    var config = {
      headers: {
        Authorization: "Bearer " + token,
      },
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
    let url = "ApiManageStock/GetById/" + id;
    var config = {
      headers: {
        Authorization: "Bearer " + token,
      },
    };
    var response = await API.get(url, config);
    return response.data;
  } catch (e) {
    console.log(e);
    return e;
  }
};
