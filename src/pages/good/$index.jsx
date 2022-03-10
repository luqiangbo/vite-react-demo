import { useState } from 'react'
import { Button } from 'antd'

import { useStore } from '@/store/index'

function Index() {
  const addAFish = useStore((state) => state.addAFish)
  const cutAFish = useStore((state) => state.cutAFish)
  return (
    <div>
      good
      <Button
        onClick={() => {
          addAFish()
        }}
      >
        加
      </Button>
      <Button
        onClick={() => {
          cutAFish()
        }}
      >
        减
      </Button>
    </div>
  )
}

export default Index
