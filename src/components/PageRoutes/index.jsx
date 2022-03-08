import { lazy, Suspense } from 'react'
import { useRoutes } from 'react-router-dom'

import { set, forOwn } from 'lodash-es'

// https://zhuanlan.zhihu.com/p/467470716

/**
 * 根据 pages 目录生成路径配置
 */
function generatePathConfig() {
  // 扫描 src/pages 下的所有具有路由文件
  const modules = import.meta.glob('/src/pages/**/$*.{jsx,tsx}')
  // console.log({ modules })
  const pathConfig = {}
  Object.keys(modules).forEach((filePath) => {
    const routePath = filePath
      // 去除 src/pages 不相关的字符
      .replace('/src/pages/', '')
      // 去除文件名后缀
      .replace(/.jsx?/, '')
      // 转换动态路由 $[foo].jsx => :foo
      .replace(/\$\[([\w-]+)]/, ':$1')
      // 转换以 $ 开头的文件
      .replace(/\$([\w-]+)/, '$1')
      // 以目录分隔
      .split('/')
    // 使用 lodash.set 合并为一个对象
    set(pathConfig, routePath, modules[filePath])
  })
  return pathConfig
}

function wrapSuspense(importer) {
  if (!importer) {
    return undefined
  }
  // 使用 React.lazy 包裹 () => import() 语法
  const Component = lazy(importer)
  // 结合 Suspense ，这里可以自定义 loading 组件
  return (
    <Suspense fallback={null}>
      <Component />
    </Suspense>
  )
}

function mapPathConfigToRoute(cfg) {
  // route 的子节点为数组
  return Object.entries(cfg).map(([routePath, child]) => {
    // () => import() 语法判断
    if (typeof child === 'function') {
      // 等于 index 则映射为当前根路由
      const isIndex = routePath === 'index'
      return {
        index: isIndex,
        path: isIndex ? undefined : routePath,
        // 转换为组件
        element: wrapSuspense(child),
      }
    }
    // 否则为目录，则查找下一层级
    const { $, ...rest } = child
    return {
      path: routePath,
      // layout 处理
      element: wrapSuspense($),
      // 递归 children
      children: mapPathConfigToRoute(rest),
    }
  })
}

function mapPathConfigToRouteOther(cfg) {
  // route 的子节点为数组
  return Object.entries(cfg).map(([routePath, child]) => {
    const { index } = child
    const Component = lazy(index)
    return {
      path: routePath,
      element: (
        <Suspense fallback={null}>
          <Component />
        </Suspense>
      ),
    }
  })
}

function generateRouteConfig() {
  const { $, ...pathConfig } = generatePathConfig()
  const layout = {}
  const other = {}
  forOwn(pathConfig, (v, k) => {
    if (k.indexOf('_') === 0) {
      other[k.substring(1)] = v
    } else {
      layout[k] = v
    }
  })
  // 提取跟路由的 layout
  return [
    {
      path: '/',
      element: wrapSuspense($),
      children: mapPathConfigToRoute(layout),
    },
    ...mapPathConfigToRouteOther(other),
  ]
}

const routeConfig = generateRouteConfig()
// console.log({ routeConfig })

export function PageRoutes() {
  return useRoutes(routeConfig)
}
