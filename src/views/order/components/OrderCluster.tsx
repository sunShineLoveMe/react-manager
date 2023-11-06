import orderApi from '@/api/orderApi'
import { Select } from 'antd'
import { useEffect, useState } from 'react'

export default function OrderCluster() {
  const [cityId, setCityId] = useState(10001)

  useEffect(() => {
    getCityData()
  }, [cityId])

  const getCityData = async () => {
    const data = await orderApi.getCityData(cityId)
    setTimeout(() => {
      renderMap(data)
    })
  }

  const renderMap = (data: Array<{ lng: string; lat: string }>) => {
    const map = new window.BMapGL.Map('clusterMap')
    map.enableScrollWheelZoom()
    const zoomCtrl = new window.BMapGL.ZoomControl() // 添加比例尺
    map.addControl(zoomCtrl)
    const cityName: { [k: number]: string } = {
      10001: '长沙',
      20001: '武汉',
      30001: '杭州',
      40001: '惠州',
      50001: '昆明'
    }
    map.centerAndZoom(cityName[cityId], 12)
    const markers = []
    for (let i = 0; i < data.length; i++) {
      const { lng, lat } = data[i]
      const point = new window.BMapGL.Point(lng, lat)
      const marker = new window.BMapGL.Marker(point)
      markers.push(marker)
    }
    if (markers.length > 0) {
      new window.BMapLib.MarkerClusterer(map, { markers: markers })
      1
    }
  }
  const handleChange = (val: number) => {
    setCityId(val)
  }
  return (
    <div style={{ backgroundColor: '#fff', padding: 10 }}>
      <Select style={{ width: 100, marginBottom: 10 }} value={cityId} onChange={handleChange}>
        <Select.Option value={10001}>长沙</Select.Option>
        <Select.Option value={20001}>武汉</Select.Option>
        <Select.Option value={30001}>杭州</Select.Option>
        <Select.Option value={40001}>惠州</Select.Option>
        <Select.Option value={50001}>昆明</Select.Option>
      </Select>
      <div id='clusterMap' style={{ height: 'calc(100vh - 192px)' }}></div>
    </div>
  )
}
