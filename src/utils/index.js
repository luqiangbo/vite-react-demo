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
