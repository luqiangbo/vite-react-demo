import { useState, useEffect } from 'react'
import { useUpdateEffect } from 'ahooks'
import { Button } from 'antd'

import { useStore } from '@/store/index'
import { useStoreAll } from '@/store/all'

import './index.less'

function Index() {
  const addAFish = useStore((state) => state.addAFish)
  const cutAFish = useStore((state) => state.cutAFish)
  const addAFishAll = useStoreAll((state) => state.addAFish)
  const cutAFishAll = useStoreAll((state) => state.cutAFish)

  useEffect(() => {
    init()
  })
  useUpdateEffect(() => {}, [])

  const init = () => {
    fatchInit()
  }
  const fatchInit = async () => {}
  return (
    <div className='app'>
      home
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
