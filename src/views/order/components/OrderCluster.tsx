import orderApi from '@/api/orderApi'
import { Select } from 'antd'
import { useEffect, useState } from 'react'

export default function OrderCluster() {
  const [cityId, setCityId] = useState(10001)

  useEffect(() => {}, [])

  const getCityData = async () => {
    const data = await orderApi.getCityData(cityId)
  }

  const renderMap = () => {
    const map = new window.BMapGL.Map('clusterMap')
    map.enableScrollWheelZoom()
  }
  return (
    <div>
      <Select>
        <Select.Option value={10001}>北京</Select.Option>
      </Select>
      <div id='clusterMap'></div>
    </div>
  )
}
