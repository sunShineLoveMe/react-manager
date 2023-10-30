import { Descriptions, Card, Button } from 'antd'
import styles from './index.module.less'
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
    renderLineChart()
    renderPieChart1()
    renderPieChart2()
    renderRadarChart()
  }, [lineChart, pieChart1, pieChart2, radarChart])

  const getReportData = async () => {
    const data = await api.getReportData()
    setReport(data)
  }

  const renderPieChart1 = async () => {
    if (!pieChart1) return
    const data = await api.getPieCityData()
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
          data: data,
        },
      ],
    })
  }

  const renderPieChart2 = async () => {
    if (!pieChart2) return
    const data = await api.getPieAgeData()
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
          data: data,
        },
      ],
    })
  }

  const renderRadarChart = async () => {
    if (!radarChart) return
    const data = await api.getRadarData()
    radarChart?.setOption({
      legend: {
        data: ['司机模型诊断'],
      },
      radar: {
        indicator: data.indicator,
      },
      series: [
        {
          name: '模型诊断',
          type: 'radar',
          data: data.data,
        },
      ],
    })
  }
  const renderLineChart = async () => {
    if (!lineChart) return
    const data = await api.getLineData()
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
        data: data.label,
      },
      yAxis: {
        type: 'value',
      },
      series: [
        {
          name: '订单',
          type: 'line',
          data: data.order,
        },
        {
          name: '流水',
          type: 'line',
          data: data.money,
        },
      ],
    })
  }
  // 刷新饼图
  const handleRefreshPie = () => {
    renderPieChart1()
    renderPieChart2()
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
        <Card
          title='订单和流水走势图'
          extra={
            <Button type='primary' onClick={renderLineChart}>
              刷新
            </Button>
          }
        >
          <div ref={lineRef} className={styles.itemChart}></div>
        </Card>
      </div>
      <div className={styles.chart}>
        <Card
          title='司机分布'
          extra={
            <Button type='primary' onClick={handleRefreshPie}>
              刷新
            </Button>
          }
        >
          <div className={styles.pieChart}>
            <div ref={pieRef1} className={styles.itemPie}></div>
            <div ref={pieRef2} className={styles.itemPie}></div>
          </div>
        </Card>
      </div>
      <div className={styles.chart}>
        <Card
          title='模型诊断'
          extra={
            <Button type='primary' onClick={renderRadarChart}>
              刷新
            </Button>
          }
        >
          <div ref={radarRef} className={styles.itemChart}></div>
        </Card>
      </div>
    </div>
  )
}
