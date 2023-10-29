import { Descriptions } from 'antd'
import type { DescriptionsProps } from 'antd'
import styles from './index.module.less'

export default function DashBoard() {
  return (
    <div className={styles.dashboard}>
      <div className={styles.userInfo}>
        <img
          src='https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
          alt='头像'
          className={styles.userImg}
        />
        <Descriptions title='欢迎新同学，每天都要过的开心！'>
          <Descriptions.Item label='用户ID'>10001</Descriptions.Item>
          <Descriptions.Item label='邮箱'>1834343@qq.com</Descriptions.Item>
          <Descriptions.Item label='状态'>在线</Descriptions.Item>
          <Descriptions.Item label='手机号'>1763434343</Descriptions.Item>
          <Descriptions.Item label='岗位'>总经理</Descriptions.Item>
          <Descriptions.Item label='部门'>大前端</Descriptions.Item>
        </Descriptions>
      </div>
      <div className={styles.report}>
        <div className={styles.card}>
          <div className='title'>司机数量</div>
          <div className={styles.data}>100个</div>
        </div>
        <div className={styles.card}>
          <div className='title'>总流水</div>
          <div className={styles.data}>10000元</div>
        </div>
        <div className={styles.card}>
          <div className='title'>总订单</div>
          <div className={styles.data}>10023单</div>
        </div>
        <div className={styles.card}>
          <div className='title'>开通城市</div>
          <div className={styles.data}>120座</div>
        </div>
      </div>
    </div>
  )
}
