import { BrowserRouter, RouterProvider } from 'react-router-dom'
import { ConfigProvider, App as AntApp } from 'antd'
import router from './router'
import './App.less'
import AntdGlobal from './utils/AntdGlobal'

function App() {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#ed6c00',
        },
      }}
    >
      <AntApp>
        <AntdGlobal />
        <RouterProvider router={router} />
        {/* <BrowserRouter>
          <Router />
        </BrowserRouter> */}
      </AntApp>
    </ConfigProvider>
  )
}

export default App
