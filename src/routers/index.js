import Home from '@/pages/home'

const routes = [
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/home',
    element: <Home />,
    meta: {
      auth: 0,
      title: '',
    },
  },
  {
    path: '/good',
    element: <Home />,
    meta: {
      auth: 0,
      title: '',
    },
  },
  {
    path: '/login',
    element: <Home />,
    meta: {
      auth: 0,
      title: '',
    },
  },
  {
    path: '*',
    element: <Home />,
    meta: {
      auth: 0,
      title: '',
    },
  },
]

const onRouteBefore = ({ pathname, meta }) => {
  if (meta.title) {
    document.title = meta.title
  }
  if (meta.auth) {
    return '/login'
  }
}

export { routes, onRouteBefore }
