import axios, { AxiosRequestConfig } from "axios";
import { RegisterUser } from "../pages/register/Register";
import { UpdatePassword } from "../pages/updatepassword/UpdatePassword";
import { UserInfo } from "../pages/updateInfo/UpdateInfo";
import { message } from "antd";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3000",
  timeout: 3000,
});
axiosInstance.interceptors.request.use(function (req) {
  const accessToken = localStorage.getItem("access_token");
  if (accessToken) {
    req.headers.Authorization = "Bearer" + " " + accessToken;
  }
  return req;
});
// 实现了一个用于处理 Axios 请求的响应拦截器，主要功能是当请求返回 401 未授权错误时自动刷新 token，并重新发送之前的请求。
// 定义了一个 PendingTask 接口，包含 config 和 resolve 两个属性。config 是 Axios 请求配置对象，resolve 是一个函数，用于在 token 刷新成功后重新发送请求并返回响应。
interface PendingTask {
  config: AxiosRequestConfig;
  resolve: Function;
}
// 定义了一个布尔值 refreshing，用于表示当前是否正在刷新 token。
let refreshing = false;
// 定义了一个 queue 数组，用于存储在 token 刷新过程中需要重新发送的请求。
const queue: PendingTask[] = [];
axiosInstance.interceptors.response.use(
  // 用于处理成功响应
  (response) => {
    return response;
  },
  // 用于处理错误响应。
  async (error) => {
    // 请求没有发送成功的情况的
    // 请求没有发送成功时，错误对象没有 response 属性
    if (!error.response) {
      return Promise.reject(error);
    }
    // 从 error.response 中解构出 data 和 config。
    let { data, config } = error.response;
    if (refreshing) {
      // 如果当前正在刷新 token，将当前请求添加到 queue 队列中，并返回一个 Promise，该 Promise 会在 token 刷新成功后被解析。
      return new Promise((resolve) => {
        queue.push({
          config: config,
          resolve: resolve,
        });
      });
    }
    // 检查响应状态码是否为 401 且请求 URL 不包含 "/user/refresh"（避免在刷新 token 的请求中再次触发刷新逻辑）。
    if (
      data.code === 401 &&
      !(config as AxiosRequestConfig).url?.includes("/user/refresh")
    ) {
      // 如果满足条件，将 refreshing 设为 true，调用 refreshToken 函数刷新 token。
      refreshing = true;
      const res = await refreshToken();

      // 如果刷新 token 成功（状态码为 200 或 201），遍历 queue 队列中的请求，重新发送并解析这些请求。
      if (res.status === 200 || res.status === 201) {
        // refreshing过程中 请求的数据
        queue.forEach(({ config, resolve }) => {
          // 重新发送当前的失败请求。
          resolve(axiosInstance(config));
        });
        // 重新发送当前的失败请求并返回结果。
        return axiosInstance(config);
      } else {
        console.log("login");
        message.error(res.data);
        // 如果刷新 token 失败，显示错误信息并在 1.5 秒后重定向到登录页面。
        setTimeout(() => {
          window.location.href = "/login";
        }, 1500);
      }
    } else {
      // 如果错误响应不满足以上条件，直接返回错误响应。
      return error.response;
    }
  }
);
export async function refreshToken() {
  const res = await axiosInstance.get("/user/refresh", {
    params: {
      refresh_token: localStorage.getItem("refresh_token"),
    },
  });
  console.log(res.data.data.access_token);
  console.log(res.data.data.refresh_token);
  localStorage.setItem("access_token", res.data.data.access_token || "");
  localStorage.setItem("refresh_token", res.data.data.refresh_token || "");
  return res;
}
export async function login(username: string, password: string) {
  return await axiosInstance.post("/user/login", { username, password });
}
export async function registerCaptcha(email: string) {
  return await axiosInstance.get("/user/register-captcha", {
    params: {
      address: email,
    },
  });
}
export async function register(values: RegisterUser) {
  return await axiosInstance.post("/user/register", values);
}
export async function updatePasswordCaptcha(email: string) {
  return await axiosInstance.get("/user/update_password/captcha", {
    params: {
      address: email,
    },
  });
}
export async function updatePassword(data: UpdatePassword) {
  return await axiosInstance.post("/user/update_password", data);
}
export async function getUserInfo() {
  return await axiosInstance.get("/user/info");
}

export async function updateInfo(data: UserInfo) {
  return await axiosInstance.post("/user/update", data);
}

export async function updateUserInfoCaptcha() {
  return await axiosInstance.get("/user/update/captcha");
}
