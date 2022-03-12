import { useState } from 'react'
import { Button, DatePicker } from 'antd'

import { apiDetail } from '@/api/user'

function Index() {
  const fetchDetail = async () => {
    const [err, res] = await apiDetail()
    console.log({ err, res })
  }
  return (
    <div>
      <h1>index</h1>
      <Button
        onClick={() => {
          fetchDetail()
        }}
      >
        点击退出
      </Button>
    </div>
  )
}

export default Index
