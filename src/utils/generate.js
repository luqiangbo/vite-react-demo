import { lazy, Suspense } from 'react'
import { set } from 'lodash-es'

function generatePathConfig() {
  // 扫描 src/pages 下的所有具有路由文件
  const modules = import.meta.glob('/src/pages/**/$*.{js,jsx}')

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

console.log({ generatePathConfig: generatePathConfig() })
