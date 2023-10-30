import { BrowserRouter, RouterProvider } from 'react-router-dom'
import { ConfigProvider } from 'antd'
import Router from './router'
import './App.less'

function App() {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#ed6c00',
        },
      }}
    >
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </ConfigProvider>
  )
}

export default App
