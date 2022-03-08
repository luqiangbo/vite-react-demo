import axios from 'axios'

const baseUrl = import.meta.env.VITE_APP_PROXY_URL
const to = (promise) => promise.then((res) => [null, res.data]).catch((err) => [err, null])

const instance = axios.create({
  baseURL: '/',
  timeout: 4 * 1000,
  headers: { 'X-Custom-Header': 'token', baseUrl },
})

export const request = (data) => {
  return to(
    instance({
      method: 'post',
      ...data,
    }),
  )
}
