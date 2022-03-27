import { useState, lazy } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { Menu } from 'antd'
import { HomeOutlined, ApartmentOutlined, FundOutlined } from '@ant-design/icons'
import { has } from 'lodash-es'

const { SubMenu } = Menu

const routerList = [
  {
    key: '/',
    name: '首页',
    icon: <HomeOutlined />,
  },
  {
    key: '@limit',
    name: '管理',
    icon: <ApartmentOutlined />,
    child: [
      {
        key: '/limit',
        name: 'limit',
        icon: <FundOutlined />,
      },
    ],
  },
]

function Index() {
  const navigate = useNavigate()
  const location = useLocation()

  const goto = (path) => {
    navigate(path)
  }

  const dpList = (arr) => {
    return arr.map((u) => {
      if (has(u, 'child')) {
        return (
          <SubMenu key={u.key} icon={u.icon} title={u.name}>
            {dpList(u.child)}
          </SubMenu>
        )
      } else {
        return (
          <Menu.Item
            key={u.key}
            icon={u.icon}
            onClick={() => {
              goto(u.key)
            }}
          >
            {u.name}
          </Menu.Item>
        )
      }
    })
  }

  return (
    <Menu theme='dark' mode='inline' defaultSelectedKeys={[location.pathname]}>
      {dpList(routerList)}
    </Menu>
  )
}

export default Index
