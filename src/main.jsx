import React from 'react'
import { createRoot } from 'react-dom/client'

import App from '@/App'
import '@/styles/tailwind.css'
import '@/styles/index.less'
import 'virtual:svg-icons-register'

const root = createRoot(document.getElementById('root'))
root.render(<App />)
