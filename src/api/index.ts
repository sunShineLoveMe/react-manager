import request from '@/utils/request'
import { Login, User, Dashboard, ResultData } from '@/types/api'

export default {
  login(params: Login.params) {
    return request.post<string>('/users/login', params, { showLoading: false })
  },

  getUserInfo() {
    return request.get<User.UserItem>('/users/getUserInfo')
  },
  // 获取工作台汇总数据
  getReportData() {
    return request.get<Dashboard.ReportData>('/order/dashboard/getReportData')
  },
  // 获取折线图数据
  getLineData() {
    return request.get<Dashboard.LineData>('/order/dashboard/getLineData')
  },

  // 获取城市数据
  getPieCityData() {
    return request.get<Dashboard.PieData[]>('/order/dashboard/getPieCityData')
  },

  // 获取年龄数据
  getPieAgeData() {
    return request.get<Dashboard.PieData[]>('/order/dashboard/getPieAgeData')
  },
  // 获取雷达数据
  getRadarData() {
    return request.get<Dashboard.RadarData>('/order/dashboard/getRadarData')
  },

  // 获取用户列表
  getUserList() {
    return request.get<ResultData<User.UserItem>>('/users/list')
  },
}
