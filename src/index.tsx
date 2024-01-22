import ReactDOM from 'react-dom/client'
import '../src/component/Main/main.css'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import { QueryCache, QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Provider } from 'react-redux'
import { persistor, store } from './store'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

import App from './App'
import { PersistGate } from 'redux-persist/integration/react'
import { checkAxiosError } from './utils/handleAxiosError'
import TErrorAxios from './types/axios.response.error'
import ContextToastProvider from './component/Context/ToastContext'

const rootELement = document.getElementById('root')
if (!rootELement) throw new Error('Root is invaild')
const root = ReactDOM.createRoot(rootELement)

const client = new QueryClient({
      defaultOptions: {
            queries: {
                  useErrorBoundary: true,
                  refetchOnWindowFocus: false,
                  retry: false,
                  retryDelay: 1000,
            },
      },
      queryCache: new QueryCache({
            onError: async (error) => {
                  if (checkAxiosError<TErrorAxios>(error)) {
                        if (error.response?.data?.code === 403 && error.response.data.message === 'Forbidden') {
                              console.log('global', error)
                              localStorage.setItem('123', '123')
                              localStorage.removeItem('user')
                              localStorage.removeItem('token')
                              // window.location.reload()
                              // await client.cancelQueries({ queryKey: ['getMe'], exact: true })
                              return
                        }
                  }
            },
      }),
})

root.render(
      <Provider store={store}>
            <PersistGate persistor={persistor}>
                  <BrowserRouter>
                        <QueryClientProvider client={client}>
                              <ContextToastProvider>
                                    <App />
                              </ContextToastProvider>
                              <ReactQueryDevtools />
                        </QueryClientProvider>
                  </BrowserRouter>
            </PersistGate>
      </Provider>,
)
