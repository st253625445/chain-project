import axios from "axios";
import { Message, MessageBox } from "element-ui";
import store from "../store";
import { getToken } from "@/utils/auth"; //取消请求

let CancelToken = axios.CancelToken;
let pending = []; // 声明一个数组存储每个请求的取消函数跟标识
let removePending = config => {
  for (let p in pending) {
    if (pending[p].u.split("?")[0] === config.url.split("?")[0]) {
      pending[p].f(); // 执行取消请求
      pending.splice(p, 1); // 数组中删除该请求
    }
  }
};
// 创建axios实例
const service = axios.create({
  timeout: 60000 // 请求超时时间
});

service.defaults.baseURL = "/api";

// request拦截器
service.interceptors.request.use(
  config => {
    removePending(config); //执行取消操作
    config.cancelToken = new CancelToken(c => {
      pending.push({ u: config.url, f: c });
    });

    if (store.getters.token) {
      config.headers["authToken"] = getToken(); // 让每个请求携带自定义token 请根据实际情况自行修改
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
    /**
     * msg为非success是抛错 可结合自己业务进行修改
     */
    const res = response.data;
    if (res.type === "application/x-download") {
      return response.data;
    } else if (res.msg && res.msg !== "success") {
      Message({
        message: res.msg,
        type: "error",
        duration: 5 * 1000
      });

      // 50008:非法的token; 50012:其他客户端登录了;  50014:Token 过期了;
      if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
        MessageBox.confirm(
          "你已被登出，可以取消继续留在该页面，或者重新登录",
          "确定登出",
          {
            confirmButtonText: "重新登录",
            cancelButtonText: "取消",
            type: "warning"
          }
        ).then(() => {
          store.dispatch("LogOut").then(() => {
            location.reload(); // 为了重新实例化vue-router对象 避免bug
          });
        });
      }
      return Promise.reject("error");
    } else if (res.code === 90003) {
      // debugger;
      store.dispatch("LogOut").then(() => {
        location.reload(); // 为了重新实例化vue-router对象 避免bug
      });
    } else {
      return response.data;
    }
  },
  error => {
    return Promise.reject(error);
  }
);

export default service;
