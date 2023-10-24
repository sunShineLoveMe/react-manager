import request from '@/utils/request'
import { Button } from 'antd'
import { formatMoney } from '@/utils'

export default function Loign() {
  const handleClick = () => {
    console.log(formatMoney(323423.234234))
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
