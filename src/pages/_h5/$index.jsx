import { useState } from 'react'
import './index.less'
import { Button } from 'antd-mobile/2x'
import { AntOutline } from 'antd-mobile-icons'

function Index() {
  return (
    <div className='page-h5'>
      404
      <div className='item item1'>666</div>
      <div className='item item2'>666</div>
      <div className='item item3'>666</div>
      <div className='item item4'>666</div>
      <Button color='primary' size='mini'>
        mini
      </Button>
      <Button color='success' size='small'>
        small
      </Button>
      <Button color='warning' size='middle'>
        middle
      </Button>
      <Button color='warning' size='large'>
        large
      </Button>
      <AntOutline fontSize={12} />
      <AntOutline fontSize={24} />
      <AntOutline fontSize={36} />
      <AntOutline fontSize={48} />
    </div>
  )
}

export default Index
