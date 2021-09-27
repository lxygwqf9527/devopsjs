import request from "@/utils/request";

export function login(data) {
  return request({
    url: "/api/v1/account/login",
    method: "post",
    data
  });
}

export function getInfo() {
  return request({
    url: "/api/v1/account/user/info",
    method: "get",
  });
}

export function logout() {
  return request({
    url: "/api/v1/account/logout",
    method: "post"
  });
}


export function getCodeTest(data) {
  return request({
    url: "/api/v1/account/user/testcode",
    method: "post",
    data
  })
}

/**
 * @description 获取验证码
 * @returns {number} code
 */
 export function getPhoneCode(data) {
  return request({
    url: "/api/v1/account/user/code",
    method: "post",
    data
  })
}