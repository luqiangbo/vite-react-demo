import { BrowserRouter, HashRouter } from 'react-router-dom'
import { ConfigProvider } from 'antd'
import dayjs from 'dayjs'
import zh_CN from 'antd/es/locale/zh_CN'
import en_US from 'antd/es/locale/en_US'

import 'dayjs/locale/zh-cn'

import PageRoutes from '@c/PageRoutes'
import Auth from '@c/Auth'
import { useStore } from '@/store'

dayjs.locale('zh-cn')

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
