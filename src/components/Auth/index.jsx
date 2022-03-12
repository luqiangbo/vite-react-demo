import { useState, useEffect } from 'react'
import { LoadingOutlined } from '@ant-design/icons'

import { useStore } from '@/store'
import { apiAdminAuthCheck } from '@/api/user'
import './index.less'

function Index() {
  const setUser = useStore((state) => state.setUser)

  useEffect(() => {
    fetchAuth()
  }, [])
  const fetchAuth = async () => {
    const [err, res] = await apiAdminAuthCheck({
      token: '123',
    })
    if (err) return
    const { code, auth } = res
    setUser({
      isAuth: true,
      auth: 1,
    })
  }
  return (
    <div className='init'>
      <div className='init-main'>
        <LoadingOutlined
          style={{
            color: '#3e91f7',
            fontSize: '50px',
          }}
        />
        <p>Loading...</p>
      </div>
    </div>
  )
}

export default Index
