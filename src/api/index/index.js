import axios from "../config.js"


// get方法请求接口
// export function selectUserLikeMe(userId) {
//   const url = "/web/card/selectUserLikeMe"
//   const data = {
//     userId: userId
//   }
//   return axios.get(url, {params:data})
// }

// 官网首页初始化
export function init() {
  const url = "/api/officialWebsite/init"
  const data = {};
  return axios.get(url, {
    params: data
  })
}

// 分页展示新闻列表
export function initNews(page) {
  const url = "/api/officialWebsite/initNews"
  const data = page;
  return axios.post(url, data)
}
// 分页展示行业动态
export function initIndustry(page) {
  const url = "/api/officialWebsite/initIndustry"
  const data = page;
  return axios.post(url, data)
}


// 新闻详情
export function newsDetails(newsId) {
  const url = "/api/officialWebsite/newsDetails"
  const data = newsId;
  return axios.post(url, data)
}


// 登录页面
// 判断是否为管理员  并获取信息
export function getMangerInfo(phoneNumber) {
  const url = "/api/mapUser/isLogin"
  const data = phoneNumber;
  return axios.post(url, data)
}

// 获取短信验证码
export function sendMessage(phoneNumber) {
  const url = "/api/mapUser/sendMessage"
  const data = phoneNumber;
  return axios.post(url, data)
}

// 注册
export function register(datas) {
  const url = "/api/mapUser/register"
  const data = datas;
  return axios.post(url, data)
}

// 登录
export function login(datas) {
  const url = "/api/mapUser/login"
  const data = datas;
  return axios.post(url, data)
}

// 品牌创建
// 行业接口
export function industryInit(datas) {
  const url = "/api/mapBusiness/industryInit"
  const data = datas;
  return axios.post(url, data)
}

// 创建品牌
export function addBrand(datas) {
  const url = "/api/mapBusiness/addBrand"
  const data = datas;
  return axios.post(url, data)
}


// 地图首页初始化
export function businessInit(datas) {
  const url = "/api/mapBusiness/businessInit"
  const data = datas;
  return axios.post(url, data)
}

// 品牌回显数据
export function selectBrand(datas) {
  const url = "/api/mapBusiness/selectBrand"
  const data = datas;
  return axios.post(url, data)
}

// 修改品牌
export function updateBrand(datas) {
  const url = "/api/mapBusiness/updateBrand"
  const data = datas;
  return axios.post(url, data)
}


// 删除品牌
export function deleteBrand(datas) {
  const url = "/api/mapBusiness/deleteBrand"
  const data = datas;
  return axios.post(url, data)
}

// 个人中心
// 我的商圈
export function myBusinessZone(datas) {
  const url = "/api/mapUser/myBusinessZone"
  const data = datas;
  return axios.post(url, data)
}

// 创建子账号
export function createSubAccount(datas) {
  const url = "/api/mapUser/createSubAccount"
  const data = datas;
  return axios.post(url, data)
}

// 我的子账号
export function mySubAccount(datas) {
  const url = "/api/mapUser/mySubAccount"
  const data = datas;
  return axios.post(url, data)
}

// 删除子账号
export function deleteSubAccount(datas) {
  const url = "/api/mapUser/deleteSubAccount"
  const data = datas;
  return axios.post(url, data)
}

// 会员中心
export function memberInit(datas) {
  const url = "/api/mapUser/memberInit"
  const data = datas;
  return axios.post(url, data)
}

// 提交定制服
export function customizedService(datas) {
  const url = "/api/mapUser/customizedService"
  const data = datas;
  return axios.post(url, data)
}

// 我的关注
export function myConcern(datas) {
  const url = "/api/mapUser/myConcern"
  const data = datas;
  return axios.post(url, data)
}

// 饼形图数据
export function pieChartBySix(datas) {
  const url = "/api/mapUser/pieChartBySix"
  const data = datas;
  return axios.post(url, data)
}


// 品牌分布图
export function distributionMap(datas) {
  const url = "/api/mapUser/distributionMap"
  const data = datas;
  return axios.post(url, data)
}

//支付二维码
export function qrCode(datas) {
  const url = "/api/mapUser/qrCode"
  const data = datas;
  return axios.post(url, data)
}

//支付宝支付
export function aliPay(datas) {
  const url = "/aliPay"
  const data = datas;
  return axios.post(url, data)
}

// 判断是否支付成功
export function isPay(datas) {
  const url = "/isPay"
  const data = datas;
  return axios.post(url, data)
}


// 商圈

// 商圈初始化
export function initBusinessZone(datas) {
  const url = "/api/mapBusinessZone/initBusinessZone"
  const data = datas;
  return axios.post(url, data)
}

// 创建商圈
export function createBusinessZone(datas) {
  const url = "/api/mapBusinessZone/createBusinessZone"
  const data = datas;
  return axios.post(url, data)
}

// 商圈筛选
export function showBusinessZone(datas) {
  const url = "/api/mapBusinessZone/showBusinessZone"
  const data = datas;
  return axios.post(url, data)
}

// 默认地址
export function defaultAddress(datas) {
  const url = "/api/mapBusinessZone/defaultAddress"
  const data = datas;
  return axios.post(url, data)
}

// 商圈报告
export function showBusinessReport(datas) {
  const url = "/api/mapBusinessZone/showBusinessReport"
  const data = datas;
  return axios.post(url, data)
}

// 修改商圈前回显数据
export function showBusinessZoneById(datas) {
  const url = "/api/mapBusinessZone/showBusinessZoneById"
  const data = datas;
  return axios.post(url, data)
}

// 修改商圈
export function updateBusinessZone(datas) {
  const url = "/api/mapBusinessZone/updateBusinessZone"
  const data = datas;
  return axios.post(url, data)
}

// 缩放地图
export function zoomBusiness(datas) {
  const url = "/api/mapBusinessZone/zoomBusiness"
  const data = datas;
  return axios.post(url, data)
}

// 商圈报告热力图截图
export function updThermodynamicChart(datas) {
  const url = "/api/mapBusinessZone/updThermodynamicChart"
  const data = datas;
  return axios.post(url, data)
}


// 标签

// 创建标签选择的名称/我的标签
export function createLabelShowBusinessName(datas) {
  const url = "/api/mapLabel/createLabelShowBusinessName"
  const data = datas;
  return axios.post(url, data)
}

// 展示所有标签样式
export function showLabelStyle(datas) {
  const url = "/api/mapLabel/showLabelStyle"
  const data = datas;
  return axios.post(url, data)
}

// 创建标签
export function createLabel(datas) {
  const url = "/api/mapLabel/createLabel"
  const data = datas;
  return axios.post(url, data)
}

// 展示所有标签/ 标签的筛选
export function showLabel(datas) {
  const url = "/api/mapLabel/showLabel"
  const data = datas;
  return axios.post(url, data)
}

// 修改标签前回显数据
export function selectLabelById(datas) {
  const url = "/api/mapLabel/selectLabelById"
  const data = datas;
  return axios.post(url, data)
}

// 修改标签
export function updateLabelById(datas) {
  const url = "/api/mapLabel/updateLabelById"
  const data = datas;
  return axios.post(url, data)
}

// 删除标签
export function deleteLabel(datas) {
  const url = "/api/mapLabel/deleteLabel"
  const data = datas;
  return axios.post(url, data)
}

// 热力图
// 热力图初始化
export function initHeatMap(datas) {
  const url = "/api/heatMap/initHeatMap"
  const data = datas;
  return axios.post(url, data)
}

// 商圈热力图
export function showThermodynamic(datas) {
  const url = "/api/thermodynamic/showThermodynamic"
  const data = datas;
  return axios.post(url, data)
}



// 新增功能

// 删除热力图点位
export function deleteThermodynamic(datas) {
  const url = "/api/thermodynamic/deleteThermodynamic"
  const data = datas;
  return axios.post(url, data)
}

// 热力图新增点位
export function addThermodynamic(datas) {
  const url = "/api/thermodynamic/addThermodynamic"
  const data = datas;
  return axios.post(url, data)
}

// 删除商圈
export function deleteBusinessZone(datas) {
  const url = "/api/mapBusinessZone/deleteBusinessZone"
  const data = datas;
  return axios.post(url, data)
}

// 会员中心的城市初始化
export function memberCityInit(datas) {
  const url = "/api/mapUser/memberCityInit"
  const data = datas;
  return axios.post(url, data)
}

// 微信支付接口
export function wxPay(datas) {
  const url = "/qrcode"
  const data = datas;
  return axios.post(url, data)
}