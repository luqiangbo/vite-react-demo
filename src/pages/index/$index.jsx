import { useEffect } from 'react'

import { Button } from 'antd'

import { getSrc, apiAll } from '@/utils'
import SvgIcon from '@c/SvgIcon'

function Index() {
  useEffect(() => {
    fetchDetail()
    console.log('page-index-init')
  }, [])

  const fetchDetail = async () => {
    const [err, res] = await apiAll().user.apiDetail()
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
        <SvgIcon name='pc' />
      </div>
    </div>
  )
}

export default Index
