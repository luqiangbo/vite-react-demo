import { BrowserRouter } from 'react-router-dom'

import { PageRoutes } from './components/PageRoutes'

function App() {
  return (
    <BrowserRouter>
      <PageRoutes />
    </BrowserRouter>
  )
}

export default App
