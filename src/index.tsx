import ReactDOM from 'react-dom/client'
import '../src/component/Main/main.css'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import { MutationCache, QueryCache, QueryClient, QueryClientProvider } from '@tanstack/react-query'
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
                  refetchOnWindowFocus: false,
                  retry: false,
                  retryDelay: 1000,
            },
      },
      queryCache: new QueryCache({}),
      mutationCache: new MutationCache({
            onError: async (error, varibale, context, mutation) => {
                  console.log({ error, mutation, varibale, context })
                  if (checkAxiosError<TErrorAxios>(error)) {
                        if (
                              error?.response?.status === 403 &&
                              error?.response.statusText === 'Forbidden' &&
                              error?.response.data?.detail === 'Refresh failed'
                        ) {
                              localStorage.removeItem('user')
                              localStorage.removeItem('token')
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
                              <ReactQueryDevtools initialIsOpen={false} />
                        </QueryClientProvider>
                  </BrowserRouter>
            </PersistGate>
      </Provider>,
)
