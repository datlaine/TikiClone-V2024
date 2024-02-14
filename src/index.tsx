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
import { addToast } from './Redux/toast'
import BoxContainerToast from './component/ui/BoxContainerToast'
import { doOpenBoxLogin, doLogout } from './Redux/authenticationSlice'

// store.dispatch(addToast({ type: 'ERROR', message: '123', id: '1' }))
// setTimeout(() => {}, 5000)

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
      queryCache: new QueryCache({
            onError: (error) => {
                  if (checkAxiosError<TErrorAxios>(error)) {
                        // console.log({ mute: error })
                        if (
                              error?.response?.status === 403 &&
                              error?.response.statusText === 'Forbidden' &&
                              (error?.response.data?.detail === 'Token không đúng' ||
                                    error?.response.data?.detail === 'Phiên đăng nhập hết hạn' ||
                                    error?.response.data?.detail === 'Không tìm thấy tài khoản' ||
                                    error?.response.data?.detail === 'Token đã được sử dụng')
                        ) {
                              store.dispatch(
                                    addToast({ type: 'ERROR', message: 'Refresh Token không hợp lệ', id: Math.random().toString() }),
                              )
                              store.dispatch(doOpenBoxLogin())
                        }
                        if (error.response?.status === 401) {
                              if (error.response.data?.detail === 'Đăng nhập thất bại, vui lòng nhập thông tin hợp lệ') {
                                    store.dispatch(
                                          addToast({ type: 'ERROR', message: error.response.data.detail, id: Math.random().toString() }),
                                    )
                              }

                              if (error.response.data?.detail === 'Token hết hạn') {
                                    store.dispatch(addToast({ type: 'ERROR', message: 'Token hết hạn', id: Math.random().toString() }))
                              }
                        }
                  }
            },
      }),
      mutationCache: new MutationCache({
            onError: async (error, varibale, context, mutation) => {
                  console.log({ error, mutation, varibale, context })
                  if (checkAxiosError<TErrorAxios>(error)) {
                        console.log({ mute: error })
                        if (
                              error?.response?.status === 403 &&
                              error?.response.statusText === 'Forbidden' &&
                              (error?.response.data?.detail === 'Token không đúng' ||
                                    error?.response.data?.detail === 'Phiên đăng nhập hết hạn' ||
                                    error?.response.data?.detail === 'Không tìm thấy tài khoản' ||
                                    error?.response.data?.detail === 'Token đã được sử dụng')
                        ) {
                              store.dispatch(
                                    addToast({ type: 'ERROR', message: 'Refresh Token không hợp lệ', id: Math.random().toString() }),
                              )
                              store.dispatch(doOpenBoxLogin())
                        }
                        if (error.response?.status === 401) {
                              if (error.response.data?.detail === 'Đăng nhập thất bại, vui lòng nhập thông tin hợp lệ') {
                                    store.dispatch(
                                          addToast({ type: 'ERROR', message: error.response.data.detail, id: Math.random().toString() }),
                                    )
                              }

                              if (error.response.data?.detail === 'Token hết hạn') {
                                    store.dispatch(addToast({ type: 'ERROR', message: 'Token hết hạn', id: Math.random().toString() }))
                              }
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
                                    <BoxContainerToast />
                              </ContextToastProvider>
                              <ReactQueryDevtools initialIsOpen={false} />
                        </QueryClientProvider>
                  </BrowserRouter>
            </PersistGate>
      </Provider>,
)
