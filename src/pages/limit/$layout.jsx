import { useState } from 'react'
import { Outlet } from 'react-router-dom'

function Index() {
  return (
    <div>
      <h1>layout home</h1>
      <Outlet />
    </div>
  )
}

export default Index
