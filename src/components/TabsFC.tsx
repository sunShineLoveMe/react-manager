import { IAuthLoader } from '@/router/AuthLoader'
import { Tabs } from 'antd'
import { useEffect } from 'react'
import { useRouteLoaderData } from 'react-router-dom'

export default function TabsFC() {
  // 权限判断
  const data = useRouteLoaderData('layout') as IAuthLoader

  useEffect(() => {}, [])
  const items = [
    {
      key: '1',
      label: 'Tab1'
    }
  ]
  return (
    <Tabs
      hideAdd
      type='editable-card'
      items={items}
      tabBarStyle={{ height: 40, marginBottom: 0, backgroundColor: '#fff' }}
    />
  )
}
