import request from '@/utils/request'
import { Login, User, Dashboard } from '@/types/api'

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
}
