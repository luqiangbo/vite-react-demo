import { BrowserRouter, HashRouter } from 'react-router-dom'
import { ConfigProvider } from 'antd'
import zhCN from 'antd/lib/locale/zh_CN'
import en_US from 'antd/lib/locale/en_US'

import PageRoutes from '@c/PageRoutes'
import Auth from '@c/Auth'
import { useStore } from '@/store'

function App() {
  const isAuth = useStore((state) => state.isAuth)
  console.log('app')
  return (
    <div>
      {isAuth ? (
        <ConfigProvider locale={en_US}>
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
