import { Form, Input, Button, Table, Space } from 'antd'
import { useAntdTable } from 'ahooks'
import { Role } from '@/types/api'
import api from '@/api/roleApi'
import { formatDate } from '@/utils'

export default function RoleList() {
  const [form] = Form.useForm()

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

  const columns = [
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
      render() {
        return (
          <Space>
            <Button type='text'>编辑</Button>
            <Button type='text'>设置权限</Button>
            <Button type='text' danger>
              删除
            </Button>
          </Space>
        )
      },
    },
  ]
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
            <Button type='primary'>新增</Button>
          </div>
        </div>
        <Table bordered rowKey='userId' columns={columns} {...tableProps} />
      </div>
    </div>
  )
}
