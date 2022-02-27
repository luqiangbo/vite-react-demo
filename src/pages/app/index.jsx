import { useState } from 'react'
import CMqtt from '@c/mqtt'
import './index.less'

function App() {
  return (
    <div className='page-app'>
      <CMqtt />
    </div>
  )
}

export default App
