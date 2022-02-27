import { useState } from 'react'
import { Button } from 'antd'
import * as mqtt from 'mqtt/dist/mqtt.min'

import './index.less'

function App() {
  return (
    <div className='page-app'>
      <Button type='primary'>点击</Button>
      <img src='/images/bj.jpg' alt='' />
      123
    </div>
  )
}

export default App
