import React from 'react'
import { createRoot } from 'react-dom/client'

import App from '@/App'
import 'antd/dist/antd.less'
import '@/styles/index.less'
import 'virtual:windi.css'
import 'virtual:svg-icons-register'

const root = createRoot(document.getElementById('root'))
root.render(<App />)
