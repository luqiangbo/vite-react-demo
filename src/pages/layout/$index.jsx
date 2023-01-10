import { Outlet } from 'react-router-dom'
import { useSetState } from 'ahooks'
import { Layout, Col, Row } from 'antd'

import CMenu from './menu'
import './index.less'

const { Content, Sider } = Layout

function Index() {
  const [state, setState] = useSetState({
    collapsed: true,
    width: '200px',
  })

  return (
    <Row className='layout-row'>
      <Col className='layout-left'>
        <div className='logo'>LOGO</div>
        <CMenu />
      </Col>
      <Col className='layout-right'>
        <Outlet />
      </Col>
    </Row>
  )
}

export default Index
