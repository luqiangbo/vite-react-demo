import { useEffect } from 'react'
import { LoadingOutlined } from '@ant-design/icons'

import { useStore } from '@/store'
import { apiAll } from '@/utils'
import './index.less'

function Index() {
  const setUser = useStore((state) => state.setUser)

  useEffect(() => {
    fetchAuth()
  }, [])
  const fetchAuth = async () => {
    const [err, res] = await apiAll().user.apiAdminAuthCheck({
      token: '123',
    })
    console.log('auth', { err, res })
    if (err) return
    const { code, auth } = res
    setUser({
      isAuth: true,
      auth,
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
