import { useState } from 'react'
import { Button } from 'antd'

import { useStoreAll } from '@/store/all'

function Index() {
  const fishes = useStoreAll((state) => state.fishes)
  const addAFish = useStoreAll((state) => state.addAFish)
  const cutAFish = useStoreAll((state) => state.cutAFish)
  return (
    <div>
      good
      <h1>{fishes}</h1>
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
