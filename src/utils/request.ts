import axios, { AxiosError } from 'axios'
import { message } from 'antd'
import { hideLoading, showLoading } from './loading'
import storage from './storage'
import env from '@/config'
import { Result } from '@/types/api'

// 创建实例
const instance = axios.create({
  // baseURL: import.meta.env.VITE_BASE_API,
  timeout: 8000,
  timeoutErrorMessage: '请求超时，请稍后再试',
  withCredentials: true,
})

// 请求拦截器
instance.interceptors.request.use(
  config => {
    showLoading()
    const token = storage.get('token')
    if (token) {
      config.headers.Authorization = 'Token::' + token
    }
    config.headers.icode = '1E53900BEB862EDD'
    if (env.mock) {
      config.baseURL = env.mockApi // mock数据
    } else {
      config.baseURL = env.baseApi // 真实数据
    }
    return {
      ...config,
    }
  },
  (error: AxiosError) => {
    return Promise.reject(error)
  },
)

// 响应拦截器
instance.interceptors.response.use(
  response => {
    const data: Result = response.data
    hideLoading()
    if (data.code === 50001) {
      message.error(data.msg)
      storage.remove('token')
    } else if (data.code != 0) {
      message.error(data.msg)
      return Promise.reject(data)
    }
    return data.data
  },
  error => {
    hideLoading()
    message.error(error.message)
    return Promise.reject(error.message)
  },
)

export default {
  get<T>(url: string, params?: object): Promise<T> {
    return instance.get(url, { params })
  },

  post<T>(url: string, params?: object): Promise<T> {
    return instance.post(url, params)
  },
}
