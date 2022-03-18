import queryString from 'query-string'
/**
 * 获取URL参数
 */
export const parseQuery = () => {
  return queryString.parseUrl(window.location.href).query
}

/**
 * 校验是否登录
 */
export const checkLogin = (permits) => {
  //
}

export const getSrc = (name) => {
  const path = `/src/assets/images/${name}`
  const modules = import.meta.globEager('/src/assets/images/*')
  return modules[path].default
}
