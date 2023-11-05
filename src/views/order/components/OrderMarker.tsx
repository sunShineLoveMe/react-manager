import { IDetailProp } from '@/types/modal'
import { Modal, message } from 'antd'
import { useState, useImperativeHandle } from 'react'
import orderApi from '@/api/orderApi'
import { Order } from '@/types/api'

export default function OrderMarker(props: IDetailProp) {
  const [visible, setVisible] = useState(false)
  const [orderId, setOrderId] = useState('')
  const [markers, setMarkers] = useState<{ lng: string; lat: string; id: number }[]>([])

  useImperativeHandle(props.mRef, () => {
    return {
      open
    }
  })
  // 弹框
  const open = async (orderId: string) => {
    setOrderId(orderId)
    setVisible(true)
    const detail = await orderApi.getOrderDetail(orderId)
    renderMap(detail)
  }

  // 渲染地图
  const renderMap = (detail: Order.OrderItem) => {
    const map = new window.BMapGL.Map('markerMap')
    map.centerAndZoom(detail.cityName, 12)
    const scaleCtrl = new window.BMapGL.ScaleControl() // 添加比例尺
    map.addControl(scaleCtrl)
    const zoomCtrl = new window.BMapGL.ZoomControl() // 添加比例尺
    map.enableScrollWheelZoom()
    map.addControl(zoomCtrl)
    detail.route?.map(item => {
      createMarker(map, item.lng, item.lat)
    })

    // 绑定事件
    map.addEventListener('click', function (e: any) {
      createMarker(map, e.latlng.lng, e.latlng.lat)
    })
  }

  // 创建marker
  const createMarker = (map: any, lng: string, lat: string) => {
    const id = Math.random()
    const marker = new window.BMapGL.Marker(new window.BMapGL.Point(lng, lat))
    markers.push({ lng: lng, lat: lat, id })
    marker.id = id
    const markMenu = new window.BMapGL.ContextMenu()
    markMenu.addItem(
      new window.BMapGL.MenuItem('删除', function () {
        map.removeOverlay(marker)
        const index = markers.findIndex(item => item.id === marker.id)
        markers.splice(index, 1)
        setMarkers([...markers])
      })
    )
    setMarkers([...markers])
    marker.addContextMenu(markMenu)
    map.addOverlay(marker)
  }

  // 更新打点
  const handleOk = async () => {
    await orderApi.updateOrderInfo({
      orderId,
      route: markers
    })
    message.success('打点成功')
    handleCancel()
  }
  // 关闭弹窗
  const handleCancel = () => {
    setVisible(false)
    setMarkers([])
  }
  return (
    <Modal
      title='地图打点'
      width={1100}
      open={visible}
      okText='确定'
      cancelText='取消'
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <div id='markerMap' style={{ height: 500 }}></div>
    </Modal>
  )
}
