import { request } from '@/utils/request'

// 校验token
export const apiAdminAuthCheck = (data) => request({ url: '/user/login', data })

// 详情
export const apiDetail = (data) => request({ url: '/user/detail', data })
