import { useState } from 'react'
import { Button, DatePicker } from 'antd'

import { apiDetail } from '@/api/user'

function Index() {
  const fetchDetail = async () => {
    const [err, res] = await apiDetail()
    console.log({ err, res })
  }

  const onChange = (date, dateString) => {
    console.log(date, dateString)
  }

  return (
    <div>
      <h1>********</h1>
      <DatePicker onChange={onChange} />
      <Button
        onClick={() => {
          fetchDetail()
        }}
      >
        点击详情
      </Button>
    </div>
  )
}

export default Index
