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

const rootELement = document.getElementById('root')
if (!rootELement) throw new Error('Root is invaild')
const root = ReactDOM.createRoot(rootELement)

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
                  console.log(`global error`, error)
            },
      }),
})

root.render(
      <Provider store={store}>
            <PersistGate persistor={persistor}>
                  <BrowserRouter>
                        <QueryClientProvider client={client}>
                              <App />
                              <ReactQueryDevtools />
                        </QueryClientProvider>
                  </BrowserRouter>
            </PersistGate>
      </Provider>,
)
