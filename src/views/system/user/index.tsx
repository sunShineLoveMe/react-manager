import { Button, Table, Form, Input, Select, Space } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import { User } from '@/types/api'

export default function UserList() {
  const dataSource = [
    {
      _id: '',
      userId: 0,
      userName: '',
      userEmail: '',
      deptId: '',
      state: 0,
      mobile: '',
      job: '',
      role: 0,
      roleList: '',
      createId: 0,
      deptName: '',
      userImg: '',
    },
  ]

  const columns: ColumnsType<User.UserItem> = [
    {
      title: '用户ID',
      dataIndex: 'userId',
      key: 'userId',
    },
    {
      title: '用户名称',
      dataIndex: 'userName',
      key: 'userName',
    },
    {
      title: '用户邮箱',
      dataIndex: 'userEmail',
      key: 'userEmail',
    },
    {
      title: '用户角色',
      dataIndex: 'role',
      key: 'role',
    },
    {
      title: '用户状态',
      dataIndex: 'state',
      key: 'state',
    },
    {
      title: '注册时间',
      dataIndex: 'createTime',
      key: 'createTime',
    },
    {
      title: '操作',
      dataIndex: 'address',
      key: 'address',
      render(record, values) {
        return (
          <Space>
            <Button type='text'>编辑</Button>
            <Button type='text' danger>
              删除
            </Button>
          </Space>
        )
      },
    },
  ]

  return (
    <div className='user-list'>
      <Form className='search-form' layout='inline' initialValues={{ state: 0 }}>
        <Form.Item name='userId' label='用户ID'>
          <Input placeholder='请输入用户ID' />
        </Form.Item>
        <Form.Item name='userName' label='用户名称'>
          <Input placeholder='请输入用户名称' />
        </Form.Item>
        <Form.Item name='state' label='状态'>
          <Select style={{ width: 120 }}>
            <Select.Option value={0}>所有</Select.Option>
            <Select.Option value={1}>在职</Select.Option>
            <Select.Option value={2}>试用期</Select.Option>
            <Select.Option value={3}>离职</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item>
          <Space>
            <Button type='primary'>搜索</Button>
            <Button type='default'>重置</Button>
          </Space>
        </Form.Item>
      </Form>
      <div className='base-table'>
        <div className='header-wrapper'>
          <div className='title'>用户列表</div>
          <div className='action'>
            <Button type='primary'>新增</Button>
            <Button type='primary' danger>
              批量删除
            </Button>
          </div>
        </div>
        <Table dataSource={dataSource} columns={columns} />
      </div>
    </div>
  )
}
