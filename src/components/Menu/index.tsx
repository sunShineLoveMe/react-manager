import React from 'react'
import { Menu } from 'antd'
import styles from './index.module.less'
import { useNavigate, useRouteLoaderData, useLocation } from 'react-router-dom'
import { useStore } from '@/store'
import type { MenuProps } from 'antd'
import { useEffect, useState } from 'react'
import { Menu as IMenu } from '@/types/api'
import * as Icons from '@ant-design/icons'

const SideMenu = () => {
  const [menuList, setMenuList] = useState<MenuItem[]>([])
  const data: any = useRouteLoaderData('layout')
  const navigate = useNavigate()
  const collapsed = useStore(state => state.collapsed)

  const [selectedKeys, setSelectedKeys] = useState<string[]>([])
  const { pathname } = useLocation()

  type MenuItem = Required<MenuProps>['items'][number]

  useEffect(() => {
    const treeMenuList = getTreeMenu(data.menuList)
    setMenuList(treeMenuList)
    setSelectedKeys([pathname])
  }, [])

  // 生成每一个菜单项
  function getItem(label: React.ReactNode, key: React.Key, icon?: React.ReactNode, children?: MenuItem[]): MenuItem {
    return {
      label,
      key,
      icon,
      children,
    } as MenuItem
  }

  // 动态生成菜单图标
  function createIcon(name?: string) {
    if (!name) return <></>
    const customerIcons: { [key: string]: any } = Icons
    const icon = customerIcons[name]
    if (!icon) return <></>
    return React.createElement(icon)
  }

  // 递归生成菜单
  const getTreeMenu = (menuList: IMenu.MenuItem[], treeList: MenuItem[] = []) => {
    menuList.forEach((item, index) => {
      if (item.menuType === 1 && item.menuState === 1) {
        if (item.buttons) return treeList.push(getItem(item.menuName, item.path || index, createIcon(item.icon)))
        treeList.push(
          getItem(item.menuName, item.path || index, createIcon(item.icon), getTreeMenu(item.children || [])),
        )
      }
    })
    return treeList
  }

  // logo点击
  const handleClickLogo = () => {
    navigate('/welcome')
  }

  // 菜单点击
  const handleClickMenu = ({ key }: { key: string }) => {
    setSelectedKeys([key])
    navigate(key)
  }
  return (
    <div>
      <div className={styles.logo} onClick={handleClickLogo}>
        <img src='/imgs/logo.png' className={styles.img} />
        {collapsed ? '' : <span>栉云科技</span>}
      </div>
      <Menu
        mode='inline'
        style={{ width: collapsed ? 80 : 'auto' }}
        theme='dark'
        onClick={handleClickMenu}
        items={menuList}
        selectedKeys={selectedKeys}
      />
    </div>
  )
}

export default SideMenu
