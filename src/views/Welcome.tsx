import request from '@/utils/request'
import { Button } from 'antd'
import { formatMoney, toLocalDate } from '@/utils'

export default function Loign() {
  const handleClick = () => {
    console.log(formatMoney(323423.234234))
    console.log(toLocalDate(new Date(), 'yyyy-MM-dd'))
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
