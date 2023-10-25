export interface Result<T = any> {
  code: number
  msg: string
  data: T
}

export namespace Login {
  export interface params {
    userName: string
    userPwd: string
  }
}
