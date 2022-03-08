import { Outlet } from 'react-router-dom'

function Index() {
  return (
    <div>
      <h1>layout</h1>
      <Outlet />
    </div>
  )
}

export default Index
