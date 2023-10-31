import { Form, Input, Button, Table, Space, Modal, Select } from 'antd'
import { useEffect, useState, useRef } from 'react'
import api from '@/api'
import { Menu } from '@/types/api'
import { ColumnsType } from 'antd/es/table'
import { message } from '@/utils/AntdGlobal'
import { formatDate } from '@/utils'
import { IAction } from '@/types/modal'
import CreateMenu from './CreateMenu'

export default function DeptList() {
  const [form] = Form.useForm()
  const [data, setData] = useState<Menu.MenuItem[]>([])

  const menuRef = useRef<{
    open: (type: IAction, data?: Menu.EditParams | { parentId: string }) => void
  }>()

  useEffect(() => {
    getMenuList()
  }, [])

  const getMenuList = async () => {
    const data = await api.getMenuList(form.getFieldsValue())
    setData(data)
  }
  // 创建部门信息
  const handleCreate = () => {
    menuRef.current?.open('create')
  }
  // 重置搜索条件
  const handleReset = () => {
    form.resetFields()
  }
  // 编辑部门信息
  const handleEdit = (record: Menu.MenuItem) => {
    menuRef.current?.open('edit', record)
  }

  // 删除部门
  const handleDelete = (id: string) => {
    Modal.confirm({
      title: '确认',
      content: '确认删除该部门吗？',
      okText: '确认',
      cancelText: '取消',
      onOk() {
        handleDelSubmit(id)
      },
    })
  }
  // 删除提交
  const handleDelSubmit = async (_id: string) => {
    await api.delDept({ _id })
    message.success('删除成功')
    getMenuList()
  }

  const handleSubCreate = (id: string) => {
    // menuRef.current?.open('create', { parentId: id })
  }

  const columns: ColumnsType<Menu.MenuItem> = [
    {
      title: '菜单名称',
      dataIndex: 'menuName',
      key: 'menuName',
    },
    {
      title: '菜单图标',
      dataIndex: 'icon',
      key: 'icon',
    },
    {
      title: '菜单类型',
      dataIndex: 'menuType',
      key: 'menuType',
      render(menuType: number) {
        return {
          1: '菜单',
          2: '按钮',
          3: '页面',
        }[menuType]
      },
    },
    {
      title: '权限标识',
      dataIndex: 'menuCode',
      key: 'menuCode',
    },
    {
      title: '路由地址',
      dataIndex: 'path',
      key: 'path',
    },
    {
      title: '组件名称',
      dataIndex: 'component',
      key: 'component',
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      key: 'createTime',
      render(createTime) {
        return formatDate(createTime)
      },
    },
    {
      title: '操作',
      key: 'action',
      width: 200,
      render(_, record) {
        return (
          <Space>
            <Button type='text' onClick={() => handleSubCreate(record._id)}>
              新增
            </Button>
            <Button type='text' onClick={() => handleEdit(record)}>
              编辑
            </Button>
            <Button type='text' onClick={() => handleDelete(record._id)}>
              删除
            </Button>
          </Space>
        )
      },
    },
  ]
  return (
    <div>
      <Form className='search-form' layout='inline' form={form}>
        <Form.Item label='菜单名称' name='menuName'>
          <Input placeholder='菜单名称' />
        </Form.Item>
        <Form.Item label='菜单状态' name='menuState'>
          <Select style={{ width: 100 }}>
            <Select.Option value={1}>正常</Select.Option>
            <Select.Option value={2}>停用</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item>
          <Button type='primary' className='mr10' onClick={getMenuList}>
            搜索
          </Button>
          <Button type='default' onClick={handleReset}>
            重置
          </Button>
        </Form.Item>
      </Form>
      <div className='base-table'>
        <div className='header-wrapper'>
          <div className='title'>菜单列表</div>
          <div className='action'>
            <Button type='primary' onClick={handleCreate}>
              新增
            </Button>
          </div>
        </div>
        <Table bordered rowKey='_id' columns={columns} dataSource={data} pagination={false} />
      </div>
      <CreateMenu mRef={menuRef} update={getMenuList} />
    </div>
  )
}
