import { useState, lazy } from 'react'
import { BrowserRouter, HashRouter } from 'react-router-dom'
import { PageRoutes } from '@c/PageRoutes'
import Auth from '@c/Auth'
import { useStore } from '@/store'
import { useStoreAll } from '@/store/all'

function App(props) {
  useStore()
  useStoreAll()
  const user = useStore((state) => state.user)
  console.log({ user })
  return (
    <div>
      {user.isAuth ? (
        <HashRouter>
          <PageRoutes />
        </HashRouter>
      ) : (
        <Auth />
      )}
    </div>
  )
}

export default App
