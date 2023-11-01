import { Form, Input, Button, Table, Space, Modal } from 'antd'
import { useAntdTable } from 'ahooks'
import { Role } from '@/types/api'
import api from '@/api/roleApi'
import { formatDate } from '@/utils'
import CreateRole from './CreateRole'
import { useRef } from 'react'
import { IAction } from '@/types/modal'
import { ColumnsType } from 'antd/es/table'
import { message } from '@/utils/AntdGlobal'

export default function RoleList() {
  const [form] = Form.useForm()
  const roleRef = useRef<{
    open: (type: IAction, data?: Role.RoleItem) => void
  }>()

  const getTableData = ({ current, pageSize }: { current: number; pageSize: number }, formData: Role.Params) => {
    return api
      .getRoleList({
        ...formData,
        pageNum: current,
        pageSize: pageSize,
      })
      .then(data => {
        return {
          total: data.page.total,
          list: data.list,
        }
      })
  }
  const { tableProps, search } = useAntdTable(getTableData, {
    form,
    defaultPageSize: 10,
  })

  const columns: ColumnsType<Role.RoleItem> = [
    {
      title: '角色名称',
      dataIndex: 'roleName',
      key: 'roleName',
    },
    {
      title: '备注',
      dataIndex: 'remark',
      key: 'remark',
    },
    {
      title: '更新时间',
      dataIndex: 'updateTime',
      key: 'updateTime',
      render(updateTime: string) {
        return formatDate(updateTime)
      },
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      key: 'createTime',
      render(createTime: string) {
        return formatDate(createTime)
      },
    },
    {
      title: '操作',
      key: 'action',
      render(_, record) {
        return (
          <Space>
            <Button type='text' onClick={() => handleEdit(record)}>
              编辑
            </Button>
            <Button type='text'>设置权限</Button>
            <Button type='text' danger onClick={() => handleDelete(record._id)}>
              删除
            </Button>
          </Space>
        )
      },
    },
  ]

  // 创建角色
  const handleCreate = () => {
    roleRef.current?.open('create')
  }
  // 编辑角色
  const handleEdit = (data: Role.RoleItem) => {
    roleRef.current?.open('edit', data)
  }
  // 删除角色
  const handleDelete = (_id: string) => {
    Modal.confirm({
      title: '确认',
      content: <span>确认删除该角色吗？</span>,
      async onOk() {
        await api.delRole({ _id })
        message.success('删除成功')
        search.submit()
      },
    })
  }
  return (
    <div className='role-wrapper'>
      <Form form={form} className='search-form' layout='inline'>
        <Form.Item name='roleName' label='角色名称'>
          <Input placeholder='请输入角色名称' />
        </Form.Item>
        <Form.Item>
          <Space>
            <Button type='primary' onClick={search.submit}>
              搜索
            </Button>
            <Button type='default' onClick={search.reset}>
              重置
            </Button>
          </Space>
        </Form.Item>
      </Form>
      <div className='base-table'>
        <div className='header-wrapper'>
          <div className='title'></div>
          <div className='action'>
            <Button type='primary' onClick={handleCreate}>
              新增
            </Button>
          </div>
        </div>
        <Table bordered rowKey='_id' columns={columns} {...tableProps} />
      </div>
      {/* 创建角色组件弹窗 */}
      <CreateRole mRef={roleRef} update={search.submit} />
    </div>
  )
}
