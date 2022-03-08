import { request } from '@/utils/request'

// 开始远程建图
export const apiRobotRmapStart = (data) => request({ url: 'api/robot_rmap_start', data })

// 结束远程建图
export const apiRobotRmapEnd = (data) => request({ url: 'api/robot_rmap_end', data })

// 结束远程建图
export const apiRobotRmapHeartbeat = (data) => request({ url: 'api/robot_rmap_heartbeat', data })

// 远程建图状态
export const apiRobotRmapStatus = (data) => request({ url: 'api/robot_rmap_status', data })
