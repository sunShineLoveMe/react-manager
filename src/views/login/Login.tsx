import './index.less'
import { Button, Form, Input, Checkbox } from 'antd'

export default function Login() {
  const onFinish = () => {
    console.log('完成')
  }

  return (
    <div className='login'>
      <div className='login-wrapper'>
        <div className='title'>系统登陆</div>
        <Form name='basic' initialValues={{ remember: true }} onFinish={onFinish} autoComplete='off'>
          <Form.Item name='username' rules={[{ required: true, message: 'Please input your username!' }]}>
            <Input />
          </Form.Item>

          <Form.Item name='password' rules={[{ required: true, message: 'Please input your password!' }]}>
            <Input.Password />
          </Form.Item>

          <Form.Item>
            <Button type='primary' block htmlType='submit'>
              登陆
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}
