import axios from "axios";
import { message } from "ant-design-vue";
import store from "../store";
import { getCache } from "@/utils/session";

function handleResponse(response) {
  let result;
  if (response.status === 401) {
    result = response.data.message
  } else if (response.status === 200) {
    if (response.data.error) {
      result = response.data.error;
      
    } else if (Object.prototype.hasOwnProperty.call(response,"data")) {
      return Promise.resolve(response.data.data);
    } else if (
      response.headers["content-type"] === "application/octet-stream"
    ) {
      return Promise.resolve(response);
    } else {
      result = "无效的数据格式";
    }
  } else {
    result = `请求失败: ${response.status} ${response.data.message}`;
  }
  message.error("error: " + result)
  // return Promise.reject("error: " + result);
}

// 创建axios实例
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // api的base_url
  timeout: 15000 // 请求超时时间
});

// request拦截器
service.interceptors.request.use(
  config => {
    if (store.getters.token) {
      config.headers["x-token"] = getCache('TOKEN'); // 让每个请求携带自定义token 请根据实际情况自行修改
    }
    return config;
  },
  error => {
    // Do something with request error
    console.log(error); // for debug
    Promise.reject(error);
  }
);

// respone拦截器
service.interceptors.response.use(
  response => {
    return handleResponse(response);
  },
  error => {
    return handleResponse(error.response);
  }
);

export default service;
