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
    }&orderField=${json.orderField}&order=${json.order}`,
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
// v2.02协会联盟
// 协会联盟基础信息
export function getSocialOrganBaseInfo() {
  return request({
    url: `/socialOrgan/baseInfo`,
    method: "get"
  });
}
// 关键词+热门行业查询
export function getSocialOrganList(json) {
  return request({
    url: `/socialOrgan/list?keyword=${json.keyword}&hotIndustryName=${
      json.hotIndustryName
    }&page=${json.page}&pageSize=${json.pageSize}`,
    method: "get"
  });
}
// 协会联盟简介信息
export function getSocialOrganInfo(id) {
  return request({
    url: `/socialOrgan/info?id=${id}`,
    method: "get"
  });
}
// 协会联盟成员列表
export function getSocialOrganMembers(json) {
  return request({
    url: `/socialOrgan/member/list?id=${json.id}&page=${json.page}&pageSize=${
      json.pageSize
    }&orderFieldNum=${json.orderField}&orderNum=${json.order}`,
    method: "get"
  });
}
// 协会联盟谱系信息
export function getSocialOrganPedigree(json) {
  return request({
    url: `/socialOrgan/pedigree?id=${json.id}`,
    method: "get"
  });
}
// v2.03
// 产业基金全量搜索基本信息
export function getCbcBaseInfo() {
  return request({
    url: `/cbc/baseInfo`,
    method: "get"
  });
}
// 产业基金全量搜索
export function getCbcSearch(json) {
  return request({
    url: `/cbc/search?base=${json.base}&district=${
      json.district
    }&regCapitalJson=${json.regCapitalJson}&paidInCapitalJson=${
      json.paidInCapitalJson
    }&establishDateJson=${json.establishDateJson}&chainName=${
      json.chainName
    }&keyword=${json.keyword}&page=${json.page}&pageSize=${json.pageSize}`,
    method: "get"
  });
}
// 基金公司投资图谱
export function getCbcPedigree(json) {
  return request({
    url: `/cbc/pedigree?companyId=${json.id}`,
    method: "get"
  });
}
// 产业基金投资的公司列表
export function getCbcCompany(json) {
  return request({
    url: `/cbc/company?companyId=${json.id}&page=${json.page}&pageSize=${
      json.pageSize
    }&orderField=${json.orderField}&order=${json.order}`,
    method: "get"
  });
}
// 产业基金匹配投资分布图
export function getCbcBaseStatics(json) {
  return request({
    url: `/cbc/baseStatics?chainId=${json.chainId}`,
    method: "get"
  });
}

// 产业基金匹配投资分布图
export function getCbcProfile(json) {
  return request({
    url: `/cbc/profile?chainId=${json.chainId}&profileKeepNum=${
      json.profileKeepNum
    }`,
    method: "get"
  });
}
// 产业基金匹配对应基金公司基本信息列表
export function getCbcChain(json) {
  return request({
    url: `/cbc/cbcChain?chainId=${json.chainId}&page=${json.page}&pageSize=${
      json.pageSize
    }`,
    method: "get"
  });
}
// 公司简介
export function getCompanyInfo(json) {
  return request({
    url: `/company/park/companyInfo?companyId=${json.companyId}`,
    method: "get"
  });
}
