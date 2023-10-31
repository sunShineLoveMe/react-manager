import { Menu } from 'antd'
import { DesktopOutlined, SettingOutlined, TeamOutlined } from '@ant-design/icons'
import styles from './index.module.less'
import { useNavigate } from 'react-router-dom'
import { useStore } from '@/store'

const SideMenu = () => {
  const navigate = useNavigate()
  const collapsed = useStore(state => state.collapsed)
  const items = [
    {
      label: '工作台',
      key: '1',
      icon: <DesktopOutlined />,
    },
    {
      label: '系统管理',
      key: '2',
      icon: <SettingOutlined />,
      children: [
        {
          label: '用户管理',
          key: '3',
          icon: <TeamOutlined />,
        },
        {
          label: '部门管理',
          key: '4',
          icon: <TeamOutlined />,
        },
      ],
    },
  ]

  const handleClickLogo = () => {
    navigate('/welcome')
  }

  return (
    <div>
      <div className={styles.logo} onClick={handleClickLogo}>
        <img src='/imgs/logo.png' className={styles.img} />
        {collapsed ? '' : <span>栉云科技</span>}
      </div>
      <Menu
        defaultSelectedKeys={['1']}
        mode='inline'
        style={{ width: collapsed ? 80 : 'auto' }}
        theme='dark'
        items={items}
      />
    </div>
  )
}

export default SideMenu
