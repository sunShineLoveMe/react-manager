import DashBoard from '@/views/dashboard'

export interface Result<T = any> {
  code: number
  msg: string
  data: T
}

export interface ResultData<T = any> {
  list: T[]
  page: {
    pageNum: number
    pageSize: number
    total: number | 0
  }
}

export namespace Login {
  export interface params {
    userName: string
    userPwd: string
  }
}

export interface PageParams {
  pageNum: number
  pageSize?: number
}

// 部门信息类型
export namespace Dept {
  export interface Params {
    deptName?: string
  }

  export interface CreateParams {
    deptName: string
    parentId?: string
    userName: string
  }

  export interface EditParams extends CreateParams {
    _id: string
  }

  export interface DelParams {
    _id: string
  }

  export interface DeptItem {
    _id: string
    createTime: string
    updateTime: string
    deptName: string
    parentId: string
    userName: string
    children: DeptItem[]
  }
}

export namespace User {
  export interface Params extends PageParams {
    userId?: number
    userName?: string
    state?: number
  }
  export interface UserItem {
    _id: string
    userId: number
    userName: string
    userEmail: string
    deptId: string
    state: number
    mobile: string
    job: string
    role: number
    roleList: string
    createId: number
    deptName: string
    userImg: string
  }

  export interface CreateParams {
    userName: string
    userEmail: string
    mobile?: number
    job?: string
    deptId: string
    state?: number
    roleList: string[]
    userImg: string
  }

  export interface EditParams extends CreateParams {
    userId: number
  }
}

export namespace Dashboard {
  export interface ReportData {
    driverCount: number
    totalMoney: number
    orderCount: number
    cityNum: number
  }

  export interface LineData {
    label: string[]
    order: string[]
    money: string[]
  }

  export interface PieData {
    name: string
    value: number
  }

  export interface RadarData {
    indicator: Array<{ name: string; max: number }>
    data: {
      name: string
      value: number[]
    }
  }
}
