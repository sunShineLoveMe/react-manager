import { useState } from 'react'
import './App.css'

function App() {
  const [name, setName] = useState('河畔一角')
  const [user, setUser] = useState({ name: '河畔一角', age: 18 })
  const [list, setList] = useState(['tom', 'jack'])
  const handleUpdate = () => {
    setName('React')
  }

  const handleUser = () => {
    // setName('React')
    //解构赋值
    setUser({ ...user, age: 20 })
  }

  const handleList = () => {
    setList([...list, 'lucy'])
  }

  return (
    <div className='App'>
      <p>欢迎学习react的通用后台课程</p>
      <p>{name}</p>

      <p>
        <span>用户名称: {user.name}</span>
        <span style={{ marginLeft: 10, color: 'green', fontSize: 24 }}>用户年龄: {user.age}</span>
      </p>

      <p>
        {list.map(item => {
          return (
            <span key={item} style={{ marginRight: 10, color: 'red' }}>
              {item}
            </span>
          )
        })}
      </p>
      <p>
        <button onClick={handleUpdate}>修改名称</button>
        <button onClick={handleUser}>修改用户</button>
        <button onClick={handleList}>修改数组</button>
      </p>
    </div>
  )
}

export default App
