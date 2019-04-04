import request from "@/utils/request";

export function login(json, type) {
  return request({
    url: `/user/login/${type}`,
    method: "post",
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
