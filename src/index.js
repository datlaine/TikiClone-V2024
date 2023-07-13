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
import { Provider } from 'react-redux'
import Cart from './component/Cart/Cart'
import { store } from './store'
import Header from './component/Header/header_main/Header'
import ContentWrapper from './component/Content/ContentWrapper/ContentWrapper'
const root = ReactDOM.createRoot(document.getElementById('root'))

const client = new QueryClient()
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <QueryClientProvider client={client}>
        <div id='main'>
          <Header></Header>

          <ContentWrapper />
        </div>
      </QueryClientProvider>
    </BrowserRouter>
  </Provider>,
)
