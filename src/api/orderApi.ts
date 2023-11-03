import request from '@/utils/request'
import { ResultData, Role } from '@/types/api'
import { Order } from '@/types/api'

export default {
  getOrderList(params: Order.Params) {
    return request.get<ResultData<Order.OrderItem>>('/order/list', params)
  }
}
