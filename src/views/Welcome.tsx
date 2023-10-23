import request from '@/utils/request'
import { Button } from 'antd'

export default function Loign() {
  const handleClick = () => {
    request.get('/users/login', {})
  }

  return (
    <div className='welcome'>
      <p>Welcome</p>
      <p>
        <Button onClick={handleClick}>点击事件</Button>
      </p>
    </div>
  )
}
