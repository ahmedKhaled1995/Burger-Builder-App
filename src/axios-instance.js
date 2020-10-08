import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://react-burger-ab7b0.firebaseio.com", //'https://react-burger-ab7b0.firebaseio.com'
});

export default axiosInstance;
