import { BrowserRouter, HashRouter } from 'react-router-dom'

import { PageRoutes } from './components/PageRoutes'
import { useStore } from '@/store/index'
import { useStoreAll } from '@/store/all'

function App() {
  useStore()
  useStoreAll()
  return (
    <HashRouter>
      <PageRoutes />
    </HashRouter>
  )
}

export default App
