import qs from 'qs'
import { set } from 'lodash-es'

// url参数
export const parseQuery = () => {
  return qs.parse(window.location.search, { ignoreQueryPrefix: true })
}

export const checkLogin = (permits) => {}

export const getSrc = (name) => {
  const path = `/src/assets/images/${name}`
  const modules = import.meta.glob('/src/assets/images/*', { eager: true })
  return modules[path].default
}

export const apiAll = () => {
  const modules = import.meta.glob('/src/api/*', { eager: true })
  const all = {}
  Object.keys(modules).forEach((u) => {
    const routePath = u.replace('/src/api/', '').replace(/.js?/, '')
    set(all, routePath, modules[u])
  })
  return all
}
