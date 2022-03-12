import { useState } from 'react'
import { Button, DatePicker } from 'antd'

function Index() {
  const onChange = (date, dateString) => {
    console.log(date, dateString)
  }
  return (
    <div>
      <h1>********</h1>
      <DatePicker onChange={onChange} />
      <Button>123</Button>
    </div>
  )
}

export default Index
