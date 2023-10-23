import { useEffect } from 'react'
import request from '@/utils/request'

export default function Login() {
  useEffect(() => {
    request
      .get('/users/login', {
        id: 123456,
      })
      .catch(err => {
        console.log(err)
      })
  }, [])
  return <div>Login</div>
}
