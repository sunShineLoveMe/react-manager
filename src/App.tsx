import { useEffect, useMemo, useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  const total1 = () => {
    console.log('total1...')
    const list = [1, 3, 5, 7, 9]
    return list.reduce((total, item) => total + item, 0)
  }
  const total2 = useMemo(() => {
    console.log('total2...')
    const list = [1, 3, 5, 7, 9]
    return list.reduce((total, item) => total + item, 0)
  }, [])

  const handleClick = () => {
    setCount(count + 1)
  }
  return (
    <div className='App'>
      <p>欢迎学习React后台课程</p>
      <p>
        <span>Count值: {count}</span>
        <button onClick={handleClick}>按钮</button>
      </p>
      <p>{total1()}</p>
      <p>{total2}</p>
    </div>
  )
}

export default App
