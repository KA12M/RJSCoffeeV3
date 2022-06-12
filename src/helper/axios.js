import axios from "axios"; 

const BASE_URL = "http://tee.kru.ac.th/cs63/s11/coffeev3/backend/";
 
export default axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "multipart/form-data",
  },
});
