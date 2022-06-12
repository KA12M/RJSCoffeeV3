import API from "../helper/axios";

export const GetByToken = async token => {
  try {
    let url = "apiaccounts/GetByToken";
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

export const GetByCraeteDateLast = async (num,token) => {
  try {
    let url = "ApiAccounts/GetByCreateDateLast?num="+num;
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

export const IsCheckToken = async (token) => { 
  var response = await GetByToken(token);
  if (response.statusCode == 200) return true;
  else if (response.response.status == 401)  return false; 
  else return false;
};

export const Login = async (values) => {
  try {
    let url = "apiaccounts/login/";
    var formData = new FormData();
    formData.append("username", values.username);
    formData.append("password", values.password);
    var response = await API.post(url, formData);
    return response.data;
  } catch (e) {
    alert(e);
  }
};

export const Register = async (values, upfiles) => {
  try {
    let url = "apiaccounts/register/";
    var formData = new FormData();
    formData.append("username", values.username);
    formData.append("password", values.password);
    formData.append("name", values.name);
    formData.append("roleId", 2);
    if (upfiles) formData.append("profileImage", upfiles);
    var response = await API.post(url, formData);
    return response.data;
  } catch (e) {
    console.log(e);
  }
};

export const GetById = async ({ id, token }) => {
  try {
    let url = "apiaccounts/getbyid/" + id;
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

export const GetAccounts = async ({ currentPage, pageSize, search, token }) => {
  try {
    let url = "apiaccounts/GetAccounts";
    url += `?currentPage=${currentPage}&pageSize=${pageSize}&search=${search}`;
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

export const DeleteAccount = async ({ id, token }) => {
  try {
    let url = "apiaccounts/" + id;
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
