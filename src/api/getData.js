import request from "@/utils/request";

// 获取验证码 resetPassword getCode
export function getAuthCode(mobile, page) {
  return request({
    url: `/sms/${page}/getCode/${mobile}`
  });
}

export function trialApply(json) {
  return request({
    url: `/user/apply`,
    data: json
  });
}
export function resetPassword(json) {
  return request({
    url: `/user/resetPassword`,
    data: json
  });
}

// 公司搜索匹配
export function getSearchCompany(name) {
  return request({
    url: `/chainv2/company/search`,
    method: "get",
    data: {
      keyword: name
    }
  });
}
// 产业资讯推荐
export function getChainSuggest() {
  return request({
    url: `/chainv2/node/suggest`,
    method: "get"
  });
}
// 产业机会推荐
export function getCompanySuggest() {
  return request({
    url: `/chainv2/company/suggest`,
    method: "get"
  });
}
// 产业关键词搜索
export function chainSearch(keyword) {
  return request({
    url: `/chainv2/searchIcByName?keyword=${keyword}`,
    method: "get"
  });
}
// 单个产业链搜索
export function chainItemSearch(json) {
  return request({
    url: `/chainv2/getIcInfoById?uuid=${json.id}`,
    method: "get"
  });
}

// 获取可探寻产业链列表
export function getExplorableIcList(id) {
  return request({
    url: `/chainv2/getExplorableNodeInfosById/?uuid=${id}`,
    method: "get"
  });
}

// 产业链节点收藏添加
export function getNodeCollectionsAdd(id) {
  return request({
    url: `/chainv2/chain/collection/add?chainId=${id}`,
    method: "get"
  });
}
// 产业链节点收藏删除
export function getNodeCollectionsDelete(id) {
  return request({
    url: `/chainv2/chain/collection/delete?chainId=${id}`,
    method: "get"
  });
}
