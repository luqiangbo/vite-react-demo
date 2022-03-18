import { useState } from 'react'
import { Button, DatePicker } from 'antd'

import { apiDetail } from '@/api/user'
import { getSrc } from '@/utils'

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
        点击退出123
      </Button>
      <button
        bg='blue-400 hover:blue-500 dark:blue-500 dark:hover:blue-600'
        text='sm white'
        font='mono light'
        p='y-2 x-4'
        border='2 rounded blue-200'
      >
        Button
      </button>
      <div>
        <img src='/images/bj.jpg' alt='' />
        <img src={getSrc('bj.jpg')} alt='' />
      </div>
    </div>
  )
}

export default Index
