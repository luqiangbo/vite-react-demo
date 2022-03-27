import { useEffect } from 'react'
import { LoadingOutlined } from '@ant-design/icons'

import { useStore } from '@/store'
import { apiAll } from '@/utils'
import './index.less'

function Index() {
  const { setKey } = useStore((state) => state)

  useEffect(() => {
    fetchAuth()
  }, [])
  const fetchAuth = async () => {
    const [err, res] = await apiAll().user.apiAdminAuthCheck({
      token: '123',
    })
    if (err) return
    const { auth } = res
    setKey({
      isAuth: true,
      auth,
    })
    setTimeout(() => {
      setKey({
        name: 'xiaoming',
      })
    }, 2000)
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
