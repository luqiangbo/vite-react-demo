import { request } from '@/utils/request'

// 校验token
export const apiAdminAuthCheck = (data) =>
  request({ url: 'api/admin_auth_check', data })

// 详情
export const apiDetail = (data) => request({ url: 'api/detail', data })
