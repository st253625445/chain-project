import request from "@/utils/request";

// 用户登录
export function login(json) {
  return request({
    url: `/user/account/login`,
    method: "post",
    dataType: "json",
    data: json
  });
}
// 用户注册
export function regist(json) {
  return request({
    url: `/user/account/regist`,
    method: "post",
    dataType: "json",
    data: json
  });
}
export function getInfo(token) {
  return request({
    url: "/user/info",
    method: "get",
    params: { token }
  });
}

export function logout() {
  return request({
    url: "/user/logout",
    method: "post"
  });
}
