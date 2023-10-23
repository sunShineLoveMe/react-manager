import { useEffect } from 'react'
import request from '@/utils/request'

export default function Login() {
  useEffect(() => {
    request
      .post<string>('/users/login', {
        id: 123456,
      })
      .then(res => {
        const token = res
      })
  }, [])
  return <div>Login</div>
}
