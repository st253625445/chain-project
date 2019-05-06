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
    url: `/company/search?keyword=${name}`,
    method: "get",
    data: {
      keyword: name
    }
  });
}
// 产业资讯推荐
export function getChainSuggest() {
  return request({
    url: `/chain/suggest`,
    method: "get"
  });
}
// 产业机会推荐
export function getCompanySuggest() {
  return request({
    url: `/company/suggest`,
    method: "get"
  });
}
// 产业关键词搜索
export function chainSearch(keyword) {
  return request({
    url: `/chain/search?keyword=${keyword}`,
    method: "get"
  });
}
// 产业链分类
export function chainCategories() {
  return request({
    url: `/chain/categories`,
    method: "get"
  });
}
// 单个产业链搜索
export function chainItemSearch(json) {
  return request({
    url: `/chain/get/${json.id}`,
    method: "get"
  });
}

// 获取可探寻产业链列表
export function getExplorableIcList(json) {
  return request({
    url: `/node/explore/list?nodeName=${json.name}&page=${json.page}`,
    method: "get"
  });
}

// 产业链节点收藏添加
export function getNodeCollectionsAdd(id) {
  return request({
    url: `/chain/collection/add?chainId=${id}`,
    method: "get"
  });
}
// 产业链节点收藏删除
export function getNodeCollectionsDelete(id) {
  return request({
    url: `/chain/collection/delete?chainId=${id}`,
    method: "get"
  });
}
// 节点公司
export function getRelatedList(name) {
  return request({
    url: `/node/company/relatedList?nodeName=${name}`,
    method: "get"
  });
}
// 节点分布
export function getDistribution(json) {
  return request({
    url: `/node/distribution/get?nodeName=${json.name}&areaType=${json.type}`,
    method: "get"
  });
}
// 节点新闻
export function getNewsList(json) {
  return request({
    url: `/node/news/list?nodeName=${json.name}&page=${json.page}`,
    method: "get"
  });
}

// 节点研究
export function getResearchList(json) {
  return request({
    url: `/node/research/list?nodeName=${json.name}&page=${json.page}`,
    method: "get"
  });
}
// 节点研究PDF下载
export function getResearchDownload(file) {
  return request({
    url: `/node/research/fileDownload?file=${file}`,
    method: "get"
  });
}

// 节点政策
export function getPolicyList(json) {
  return request({
    url: `/node/policy/list?nodeName=${json.name}&page=${
      json.page
    }&department=${json.department}`,
    method: "get"
  });
}
// 产业园区相关
// 首次加载基本信息: 行政区划等
export function getParkBaseInfo() {
  return request({
    url: `/park/baseInfo`,
    method: "get"
  });
}

//地址+产业链名字，搜索，数据统计
export function getParkSearch(json) {
  return request({
    url: `/park/search?base=${json.base}&chainName=${json.chainName}&keyword=${
      json.keyword
    }&page=${json.page}&district=${json.district}&pageSize=${json.pageSize}`,
    method: "get"
  });
}
// 园区简介
export function getParkInfo(json) {
  return request({
    url: `/park/info?id=${json.id}`,
    method: "get"
  });
}
// 园区相关的产业链(集群)
export function getParkChainList(json) {
  return request({
    url: `/park/chain/list?id=${json.id}`,
    method: "get"
  });
}
// 园区相关企业
export function getParkCompanyList(json) {
  return request({
    url: `/park/company/list?id=${json.id}&page=${json.page}&pageSize=${
      json.pageSize
    }`,
    method: "get"
  });
}
// 园区相关政策和新闻
export function getParkNewsPolicy(json) {
  return request({
    url: `/park/newsPolicy?id=${json.id}&type=${json.type}&page=${
      json.page
    }&pageSize=${json.pageSize}`,
    method: "get"
  });
}
