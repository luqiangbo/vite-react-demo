import { useState, useEffect } from 'react'
import { useUpdateEffect } from 'ahooks'
import { apiRobotRmapStart } from '@/api/map'

import './index.less'

function App() {
  useEffect(() => {
    init()
  })
  useUpdateEffect(() => {}, [])

  const init = () => {
    fatchInit()
  }
  const fatchInit = async () => {
    const [err, res] = await apiRobotRmapStart()
  }
  return <div className='app'>home</div>
}

export default App
