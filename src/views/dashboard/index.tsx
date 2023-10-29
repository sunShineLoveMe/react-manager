import { Descriptions, Card, Button } from 'antd'
import styles from './index.module.less'
import * as echarts from 'echarts'
import { useEffect, useState } from 'react'
import { useStore } from '@/store'
import { formatNum, formateState, formatMoney } from '@/utils'
import api from '@/api'
import { Dashboard } from '@/types/api'
import { useCharts } from '@/hook/useCharts'

export default function DashBoard() {
  const userInfo = useStore(state => state.userInfo)
  const [report, setReport] = useState<Dashboard.ReportData>()

  // 初始化折线图
  const [lineRef, lineChart] = useCharts()

  // 初始化饼图
  const [pieRef1, pieChart1] = useCharts()
  const [pieRef2, pieChart2] = useCharts()

  // 初始化雷达图
  const [radarRef, radarChart] = useCharts()
  useEffect(() => {
    lineChart?.setOption({
      tooltip: {
        trigger: 'axis',
      },
      legend: {
        data: ['订单', '流水'],
      },
      grid: {
        left: '5%',
        right: '15%',
        bottom: '10%',
      },
      xAxis: {
        data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
      },
      yAxis: {
        type: 'value',
      },
      series: [
        {
          name: '订单',
          type: 'line',
          data: [5, 20, 36, 10, 10, 20, 30, 40, 50, 60, 70, 80],
        },
        {
          name: '流水',
          type: 'line',
          data: [500, 1000, 1500, 2000, 2500, 3000, 3500, 4000, 2500, 3000, 3500, 4000],
        },
      ],
    })

    pieChart1?.setOption({
      title: {
        text: '司机城市分布',
        left: 'center',
      },
      tooltip: {
        trigger: 'item',
      },
      legend: {
        orient: 'vertical',
        left: 'left',
      },
      series: [
        {
          name: '城市分布',
          type: 'pie',
          radius: '50%',
          data: [
            { value: 335, name: '北京' },
            { value: 310, name: '上海' },
            { value: 234, name: '广州' },
            { value: 135, name: '深圳' },
            { value: 348, name: '杭州' },
          ],
        },
      ],
    })

    pieChart2?.setOption({
      title: {
        text: '司机年龄分布',
        left: 'center',
      },
      tooltip: {
        trigger: 'item',
      },
      legend: {
        orient: 'vertical',
        left: 'left',
      },
      series: [
        {
          name: '年龄分布',
          type: 'pie',
          roseType: 'area',
          radius: [50, 180],
          data: [
            { value: 30, name: '北京' },
            { value: 20, name: '上海' },
            { value: 34, name: '广州' },
            { value: 25, name: '深圳' },
            { value: 40, name: '杭州' },
          ],
        },
      ],
    })

    radarChart?.setOption({
      // title: {
      //   text: '司机模型诊断',
      //   left: 'center',
      // },
      legend: {
        data: ['司机模型诊断'],
      },
      radar: {
        indicator: [
          { name: '服务态度', max: 10 },
          { name: '在线时长', max: 600 },
          { name: '接单率', max: 100 },
          { name: '评分', max: 5 },
          { name: '关注度', max: 10000 },
        ],
      },
      series: [
        {
          name: '模型诊断',
          type: 'radar',
          data: [
            {
              value: [8, 300, 80, 4.6, 5000],
              name: '司机模型诊断',
            },
          ],
        },
      ],
    })
  }, [lineChart, pieChart1, pieChart2, radarChart])

  const getReportData = async () => {
    const data = await api.getReportData()
    setReport(data)
  }

  useEffect(() => {
    getReportData()
  }, [])

  return (
    <div className={styles.dashboard}>
      <div className={styles.userInfo}>
        <img src={userInfo.userImg} className={styles.userImg} />
        <Descriptions title='欢迎新同学，每天都要过的开心！'>
          <Descriptions.Item label='用户ID'>{userInfo._id}</Descriptions.Item>
          <Descriptions.Item label='邮箱'>{userInfo.userEmail}</Descriptions.Item>
          <Descriptions.Item label='状态'>{formateState(userInfo.state)}</Descriptions.Item>
          <Descriptions.Item label='手机号'>{userInfo.mobile}</Descriptions.Item>
          <Descriptions.Item label='岗位'>{userInfo.job}</Descriptions.Item>
          <Descriptions.Item label='部门'>{userInfo.deptName}</Descriptions.Item>
        </Descriptions>
      </div>
      <div className={styles.report}>
        <div className={styles.card}>
          <div className='title'>司机数量</div>
          <div className={styles.data}>{formatNum(report?.driverCount)}个</div>
        </div>
        <div className={styles.card}>
          <div className='title'>总流水</div>
          <div className={styles.data}>{formatMoney(report?.totalMoney)}元</div>
        </div>
        <div className={styles.card}>
          <div className='title'>总订单</div>
          <div className={styles.data}>{formatNum(report?.orderCount)}单</div>
        </div>
        <div className={styles.card}>
          <div className='title'>开通城市</div>
          <div className={styles.data}>{formatNum(report?.cityNum)}座</div>
        </div>
      </div>
      <div className={styles.chart}>
        <Card title='订单和流水走势图' extra={<Button type='primary'>刷新</Button>}>
          <div ref={lineRef} className={styles.itemChart}></div>
        </Card>
      </div>
      <div className={styles.chart}>
        <Card title='司机分布' extra={<Button type='primary'>刷新</Button>}>
          <div className={styles.pieChart}>
            <div ref={pieRef1} className={styles.itemPie}></div>
            <div ref={pieRef2} className={styles.itemPie}></div>
          </div>
        </Card>
      </div>
      <div className={styles.chart}>
        <Card title='模型诊断' extra={<Button type='primary'>刷新</Button>}>
          <div ref={radarRef} className={styles.itemChart}></div>
        </Card>
      </div>
    </div>
  )
}
