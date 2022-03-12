import { BrowserRouter, HashRouter } from 'react-router-dom'
import { PageRoutes } from '@c/PageRoutes'
import Auth from '@c/Auth'
import { useStore } from '@/store'
import { useStoreAll } from '@/store/all'

function App(props) {
  useStore()
  useStoreAll()
  const state = useStore((state) => state)
  return (
    <div>
      {state.user.isAuth ? (
        <HashRouter>
          <PageRoutes auth={state.user.auth} />
        </HashRouter>
      ) : (
        <Auth />
      )}
    </div>
  )
}

export default App
