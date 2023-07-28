import ReactDOM from 'react-dom/client'
import '../src/component/Main/main.css'
import '@fortawesome/fontawesome-free/css/all.min.css'
import { BrowserRouter} from 'react-router-dom'
import './index.css'
import { QueryCache, QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Provider } from 'react-redux'
import { store } from './store'
import Header from './component/Header/header_main/Header'
import ContentWrapper from './component/Content/ContentWrapper/ContentWrapper'
import Footer from './component/Footer/Footer'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { debounce } from 'lodash'

import Sidabar from './component/Sidebar/Sidebar'
const root = ReactDOM.createRoot(document.getElementById('root'))

const client = new QueryClient({
  defaultOptions: {
    queries: {
      useErrorBoundary: true,
      refetchOnWindowFocus: false,
      retry: 3,
      retryDelay: 1000,
    },
  },
  queryCache: new QueryCache({
    onError: (error) => {
      debounceError(error)
    },
  }),
})

const debounceError = debounce((error) => {
  console.log(`global`, error)
  if (error) {
    alert(`Lỗi ${error.code} - ${error.message}\n Bật 4G lên xài dùm đi trời ơi`)
  }
}, 2000)

root.render(
  <Provider store={store}>
    <BrowserRouter>
      <QueryClientProvider client={client}>
        <div id='main' className=''>
          <Header></Header>

          <ContentWrapper />
          <Sidabar />
          <Footer />
        </div>
        <ReactQueryDevtools />
      </QueryClientProvider>
  </BrowserRouter>
  </Provider>,
)
