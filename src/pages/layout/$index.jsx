import { Outlet } from 'react-router-dom'
import { useSetState } from 'ahooks'
import { Layout, Row, Col } from 'antd'

import CMenu from './menu'
import './index.less'

const { Sider } = Layout

function Index() {
  return (
    <div>
      <Sider className='layout-sider'>
        <div className='logo'>LOGO</div>
        <CMenu />
      </Sider>
      <Row>
        <Col className='layout-hide' />
        <Col className='layout-content'>
          <Outlet />
        </Col>
      </Row>
    </div>
  )
}

export default Index
