import { useState, useEffect } from 'react'

import { Button, DatePicker, Card, Affix } from 'antd'

import { getSrc, apiAll } from '@/utils'
import SvgIcon from '@c/SvgIcon'
import './index.less'

function Index() {
  const [top, setTop] = useState(10)
  const [bottom, setBottom] = useState(10)

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
      <div className='flex justify-between items-center'>
        <h1 className=''>index</h1>
        <Button type='primary'>点击</Button>
      </div>
      <Button
        onClick={() => {
          fetchDetail()
        }}
      >
        点击退出1234555
      </Button>
      <DatePicker
        onChange={(date, dateString) => {
          console.log(date, dateString)
        }}
      />
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
      <Card
        title='Default size card'
        extra={<a href='#'>More</a>}
        style={{
          width: 300,
        }}
      >
        <p>Card content</p>
        <p>Card content</p>
        <p>Card content</p>
        <p>Card content</p>
        <p>Card content</p>
        <p>Card content</p>
        <p>Card content</p>
        <p>Card content</p>
        <p>Card content</p>
        <p>Card content</p>
        <p>Card content</p>
        <p>Card content</p>
        <p>Card content</p>
        <p>Card content</p>
        <p>Card content</p>
      </Card>
      <Card
        title='Default size card'
        extra={<a href='#'>More</a>}
        style={{
          width: 300,
        }}
      >
        <p>Card content</p>
        <p>Card content</p>
        <p>Card content</p>
        <p>Card content</p>
        <p>Card content</p>
        <p>Card content</p>
        <p>Card content</p>
        <p>Card content</p>
        <p>Card content</p>
        <p>Card content</p>
        <p>Card content</p>
        <p>Card content</p>
        <p>Card content</p>
        <p>Card content</p>
        <p>Card content</p>
      </Card>
      <Card
        title='Default size card'
        extra={<a href='#'>More</a>}
        style={{
          width: 300,
        }}
      >
        <p>Card content</p>
        <p>Card content</p>
        <p>Card content</p>
        <p>Card content</p>
        <p>Card content</p>
        <p>Card content</p>
        <p>Card content</p>
        <p>Card content</p>
        <p>Card content</p>
        <p>Card content</p>
        <p>Card content</p>
        <p>Card content</p>
        <p>Card content</p>
        <p>Card content</p>
        <p>Card content</p>
      </Card>
      <Affix offsetTop={120}>
        <Button type='primary' onClick={() => setTop(top + 10)}>
          Affix top
        </Button>
      </Affix>
      <br />
      <Affix offsetBottom={bottom}>
        <Button type='primary' onClick={() => setBottom(bottom + 10)}>
          Affix bottom
        </Button>
      </Affix>
      <Card
        title='Default size card'
        extra={<a href='#'>More</a>}
        style={{
          width: 300,
        }}
      >
        <p>Card content</p>
        <p>Card content</p>
        <p>Card content</p>
        <p>Card content</p>
        <p>Card content</p>
        <p>Card content</p>
        <p>Card content</p>
        <p>Card content</p>
        <p>Card content</p>
        <p>Card content</p>
        <p>Card content</p>
        <p>Card content</p>
        <p>Card content</p>
        <p>Card content</p>
        <p>Card content</p>
      </Card>
      <Card
        title='Default size card'
        extra={<a href='#'>More</a>}
        style={{
          width: 300,
        }}
      >
        <p>Card content</p>
        <p>Card content</p>
        <p>Card content</p>
        <p>Card content</p>
        <p>Card content</p>
        <p>Card content</p>
        <p>Card content</p>
        <p>Card content</p>
        <p>Card content</p>
        <p>Card content</p>
        <p>Card content</p>
        <p>Card content</p>
        <p>Card content</p>
        <p>Card content</p>
        <p>Card content</p>
      </Card>
    </div>
  )
}

export default Index
