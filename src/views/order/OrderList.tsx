import { Button, Form, Input, Table, Space, Modal, Select } from 'antd'
import { useState, useEffect, useRef } from 'react'
import { useAntdTable } from 'ahooks'
import orderApi from '@/api/orderApi'
import { Order } from '@/types/api'
import { ColumnsType } from 'antd/es/table'
import CreateOrder from './components/OrderCreate'
import OrderDetail from './components/orderDetail'
import OrderMarker from './components/OrderMarker'
import { formatDate, formatMoney } from '@/utils'
import OrderRoute from './components/OrderRoute'

export default function OrderList() {
  const [form] = Form.useForm()
  const orderRef = useRef<{
    open: () => void
  }>()
  // 订单详情
  const detailRef = useRef<{ open: (orderId: string) => void }>()
  //地图打点
  const markerRef = useRef<{ open: (orderId: string) => void }>()
  // 地图轨迹
  const routeRef = useRef<{ open: (orderId: string) => void }>()
  const getTableData = ({ current, pageSize }: { current: number; pageSize: number }, formData: Order.SearchParams) => {
    return orderApi
      .getOrderList({
        ...formData,
        pageNum: current,
        pageSize: pageSize
      })
      .then(data => {
        return {
          total: data.page.total,
          list: data.list
        }
      })
  }
  const { tableProps, search } = useAntdTable(getTableData, {
    form,
    defaultParams: [{ current: 1, pageSize: 10 }, { state: 1 }]
  })

  const columns: ColumnsType<Order.OrderItem> = [
    {
      title: '订单编号',
      dataIndex: 'orderId',
      key: 'orderId'
    },
    {
      title: '城市',
      dataIndex: 'cityName',
      key: 'cityName'
    },
    {
      title: '下单地址',
      dataIndex: 'startAddress',
      key: 'startAddress',
      render(_, record) {
        return (
          <div>
            <p>开始地址：{record.startAddress}</p>
            <p>结束地址：{record.endAddress}</p>
          </div>
        )
      }
    },
    {
      title: '下单时间',
      dataIndex: 'createTime',
      key: 'createTime',
      render(createTime) {
        return formatDate(createTime)
      }
    },
    {
      title: '订单价格',
      dataIndex: 'orderAmount',
      key: 'orderAmount',
      render(orderAmount) {
        return formatMoney(orderAmount)
      }
    },
    {
      title: '订单状态',
      dataIndex: 'state',
      key: 'state',
      render(state: number) {
        return {
          1: '进行中',
          2: '已完成',
          3: '超时',
          4: '取消'
        }[state]
      }
    },
    {
      title: '用户名称',
      dataIndex: 'userName',
      key: 'userName'
    },
    {
      title: '司机名称',
      dataIndex: 'driverName',
      key: 'driverName'
    },
    {
      title: '操作',
      key: 'action',
      render(_, record) {
        return (
          <Space>
            <Button type='text' onClick={() => handleDetail(record.orderId)}>
              详情
            </Button>
            <Button type='text' onClick={() => handleMarker(record.orderId)}>
              打点
            </Button>
            <Button type='text' onClick={() => handleRoute(record.orderId)}>
              轨迹
            </Button>
            <Button type='text' danger>
              删除
            </Button>
          </Space>
        )
      }
    }
  ]
  // 订单详情
  const handleDetail = (orderId: string) => {
    detailRef.current?.open(orderId)
  }
  // 创建订单
  const handleCreate = () => {
    orderRef.current?.open()
  }

  // 地图打点
  const handleMarker = (orderId: string) => {
    markerRef.current?.open(orderId)
  }
  // 地图轨迹
  const handleRoute = (orderId: string) => {
    routeRef.current?.open(orderId)
  }
  return (
    <div className='OrderList'>
      <Form className='search-form' form={form} layout='inline'>
        <Form.Item name='userId' label='订单ID'>
          <Input placeholder='请输入用户ID' />
        </Form.Item>
        <Form.Item name='userName' label='用户名称'>
          <Input placeholder='请输入用户名称' />
        </Form.Item>
        <Form.Item name='state' label='订单状态'>
          <Select style={{ width: 120 }}>
            <Select.Option value={1}>进行中</Select.Option>
            <Select.Option value={2}>已完成</Select.Option>
            <Select.Option value={3}>超时</Select.Option>
            <Select.Option value={4}>取消</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item>
          <Space>
            <Button type='primary'>搜索</Button>
            <Button type='default'>重置</Button>
          </Space>
        </Form.Item>
      </Form>
      <div className='base-table'>
        <div className='header-wrapper'>
          <div className='title'>用户列表</div>
          <div className='action'>
            <Button type='primary' onClick={handleCreate}>
              新增
            </Button>
          </div>
        </div>
        <Table bordered rowKey='_id' columns={columns} {...tableProps} />
      </div>
      {/* 创建订单组件 */}
      <CreateOrder mRef={orderRef} update={search.submit} />
      <OrderDetail mRef={detailRef} />
      <OrderMarker mRef={markerRef} />
      <OrderRoute mRef={routeRef} />
    </div>
  )
}
