import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import { useSetState } from 'ahooks'
import { Layout } from 'antd'

import CMenu from './menu'

const { Content, Sider } = Layout

function Index() {
  const [state, setState] = useSetState({
    collapsed: true,
  })

  return (
    <Layout hasSider>
      <Sider
        style={{
          overflow: 'auto',
          height: '100vh',
          position: 'fixed',
          left: 0,
          top: 0,
          bottom: 0,
        }}
        collapsible
        collapsed={state.collapsed}
        onCollapse={() => {
          setState({
            collapsed: !state.collapsed,
          })
        }}
      >
        <div className='logo' />
        <CMenu />
      </Sider>
      <Layout
        className='site-layout'
        style={{ marginLeft: state.collapsed ? 80 : 200 }}
      >
        <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  )
}

export default Index
