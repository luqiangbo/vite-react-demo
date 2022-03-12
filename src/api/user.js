import { request } from '@/utils/request'

// 开始远程建图
export const apiAdminAuthCheck = (data) => request({ url: 'api/admin_auth_check', data })
