import { BrowserRouter, HashRouter } from 'react-router-dom'
import { ConfigProvider } from 'antd'
import zh_CN from 'antd/es/locale/zh_CN'
import en_US from 'antd/es/locale/en_US'

import PageRoutes from '@c/PageRoutes'
import Auth from '@c/Auth'
import { useStore } from '@/store'

function App() {
  const isAuth = useStore((state) => state.isAuth)
  console.log('app')
  return (
    <div>
      {isAuth ? (
        <ConfigProvider locale={zh_CN}>
          <HashRouter>
            <PageRoutes />
          </HashRouter>
        </ConfigProvider>
      ) : (
        <Auth />
      )}
    </div>
  )
}

export default App
