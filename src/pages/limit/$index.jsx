import { useEffect } from 'react'
import { Button } from 'antd'

import { useStoreAll } from '@/store/all'

import './index.less'

function Index() {
  const fishes = useStoreAll((state) => state.fishes)
  const addAFishAll = useStoreAll((state) => state.addAFish)
  const cutAFishAll = useStoreAll((state) => state.cutAFish)

  useEffect(() => {
    init()
  })
  const init = () => {
    fatchInit()
  }
  const fatchInit = async () => {}
  return (
    <div className='app'>
      home
      <h1>{fishes}</h1>
      <Button
        onClick={() => {
          addAFishAll()
        }}
      >
        加all
      </Button>
      <Button
        onClick={() => {
          cutAFishAll()
        }}
      >
        减all
      </Button>
    </div>
  )
}

export default Index
