import ReactDOM from 'react-dom/client'
import '../src/component/Main/main.css'
import '@fortawesome/fontawesome-free/css/all.min.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Buy from './component/Content/Content_right/Buy/Buy.js'
import ChangeAddress from './component/commingSoon/ChangeAddress'
import NotFound from './component/Errors/NotFound'
import './index.css'
import App from './App'
import Contact from './component/Contact/Contact'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
const root = ReactDOM.createRoot(document.getElementById('root'))

const client = new QueryClient()
root.render(
  <BrowserRouter>
    <QueryClientProvider client={client}>
      <Routes>
        <Route path='/' element={<App />} />
        <Route path='/Buy/:id' element={<Buy />} />
        <Route path='/ChangeAddress' element={<ChangeAddress />} />
        <Route path='*' element={<NotFound />} />
        <Route path='/Contact' element={<Contact />} />
      </Routes>
    </QueryClientProvider>
  </BrowserRouter>,
)
