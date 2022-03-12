import { BrowserRouter, HashRouter } from 'react-router-dom'
import { ConfigProvider } from 'antd'
import zhCN from 'antd/lib/locale/zh_CN'
import en_US from 'antd/lib/locale/en_US'

import { PageRoutes } from '@c/PageRoutes'
import Auth from '@c/Auth'
import { useStore } from '@/store'
import { useStoreAll } from '@/store/all'

function App() {
  useStore()
  useStoreAll()
  const state = useStore((state) => state)
  return (
    <div>
      {state.user.isAuth ? (
        <ConfigProvider locale={en_US}>
          <HashRouter>
            <PageRoutes auth={state.user.auth} />
          </HashRouter>
        </ConfigProvider>
      ) : (
        <Auth />
      )}
    </div>
  )
}

export default App
