import axios from 'axios'
import { message } from 'antd'
import { useStore } from '@/store/index'

const baseUrl = import.meta.env.VITE_APP_PROXY_URL
const to = (promise) =>
  promise.then((res) => [null, res.data]).catch((err) => [err, null])

const instance = axios.create({
  baseURL: baseUrl,
  timeout: 4 * 1000,
  headers: { 'X-Custom-Header': 'token', baseUrl },
})

// 请求拦截
instance.interceptors.request.use(
  (config) => {
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

instance.interceptors.response.use(
  (response) => {
    const { status, data } = response
    message.info(status)
    if (data.code === -1) {
      const store = useStore.getState()
      const { user, setUser } = store
      setUser({
        ...user,
        auth: 0,
      })
      return Promise.reject(response.data)
    } else {
      return response
    }
  },
  (error) => {
    return Promise.reject(error)
  },
)

export const request = (data) => {
  return to(
    instance({
      method: 'post',
      ...data,
    }),
  )
}
