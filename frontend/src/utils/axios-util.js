import axios from "axios";
import { useToast } from "vue-toastification";

const axiosUtils = axios.create({
  baseURL: "",
  // baseURL: `${process.env.REACT_APP_BASE_URI}`,
  // timeout: 30000
});

async function responseValidate(error) {
  const toast = useToast();

  // 네트워크 연결 오류
  if (!error.response) {
    toast.error("네트워크 연결 오류");
    return "network fail";
  }

  console.log(error.response);

  // API 서버 접속 오류
  if (error.response.status === 404 || error.response.status === 504) {
    toast.error("API 서버 연결 오류");
    return "api server connection error";
  }

  if (error.response.data) {
    toast.error(error.response.data);

    if (error.response.status === 401) {
      sessionStorage.removeItem("id");
      sessionStorage.removeItem("token");

      setTimeout(() => {
        window.location.replace("/");
      }, 2000);
    }
  }

  return error.response.status;
}

axiosUtils.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem("token");

    if (token && config.headers) {
      config.headers['Authorization'] = `Bearer ${token}`
      // config.headers["x-access-token"] = token;
    }

    if (config.headers) {
      config.headers["Content-Type"] = "application/json";
    }

    return config;
  },
  (error) => {
    toast.error("axios 요청 에러");
    return Promise.reject(error);
  }
);

axiosUtils.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(responseValidate(error));
  }
);

export default axiosUtils;
