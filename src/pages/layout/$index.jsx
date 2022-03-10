import { useState } from 'react'
import { Outlet } from 'react-router-dom'

import { useStore } from '@/store/index'
import { useStoreAll } from '@/store/all'

function Index() {
  const fishes = useStore((state) => state.fishes)
  const fishesAll = useStoreAll((state) => state.fishes)
  return (
    <div>
      <h1>
        layout fishes:{fishes} fishesAll:{fishesAll}
      </h1>
      <Outlet />
    </div>
  )
}

export default Index
