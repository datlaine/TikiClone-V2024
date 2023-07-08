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
const root = ReactDOM.createRoot(document.getElementById('root'))

root.render(
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<App />} />
      <Route path='/Buy' element={<Buy />} />
      <Route path='/ChangeAddress' element={<ChangeAddress />} />
      <Route path='*' element={<NotFound />} />
      <Route path='/Contact' element={<Contact/>} />
    </Routes>
  </BrowserRouter>,
)
