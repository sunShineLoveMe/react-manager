import request from '@/utils/request'
import { Login, User, Dashboard, ResultData, Dept, Menu } from '@/types/api'

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
  getUserList(params: User.Params) {
    return request.get<ResultData<User.UserItem>>('/users/list', params)
  },

  // 创建用户
  createUser(params: User.CreateParams) {
    return request.post('/users/create', params)
  },

  // 编辑用户
  editUser(params: User.CreateParams) {
    return request.post('/users/edit', params)
  },

  // 删除用户
  delUser(params: { userIds: number[] }) {
    return request.post('/users/delete', params)
  },

  // 部门管理-获取部门列表
  getDeptList(params?: Dept.Params) {
    return request.get<Dept.DeptItem[]>('/dept/list', params)
  },

  // 获取当前账号下的所有用户
  getAllUserList() {
    return request.get<User.UserItem[]>('/users/all/list')
  },

  // 创建部门信息
  createDept(params: Dept.CreateParams) {
    return request.post('/dept/create', params)
  },

  // 修改部门信息
  editDept(params: Dept.EditParams) {
    return request.post('/dept/edit', params)
  },

  // 删除部门信息
  delDept(params: Dept.DelParams) {
    return request.post('/dept/delete', params)
  },
  // 菜单管理
  getMenuList(params?: Menu.Params) {
    return request.get<Menu.MenuItem[]>('/menu/list', params)
  },
}
