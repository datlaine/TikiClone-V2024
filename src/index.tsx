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
import { doOpenBoxLogin, userLogout } from './Redux/authenticationSlice'

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
            if (checkAxiosError(error)) {
                if (error.response?.status === 401) {
                    // store.dispatch(addToast({ type: 'ERROR', message: 'Loi token', id: Math.random().toString() }))
                    // store.dispatch(doOpenBoxLogin())
                }
            }
        },
    }),
    mutationCache: new MutationCache({
        onError: async (error, varibale, context, mutation) => {
            console.log({ error, mutation, varibale, context })
            if (checkAxiosError<TErrorAxios>(error)) {
                if (
                    error?.response?.status === 403 &&
                    error?.response.statusText === 'Forbidden'
                    // error?.response.data?.detail === 'Refresh failed'
                ) {
                    // store.dispatch(userLogout())
                    // store.dispatch(addToast({ type: 'ERROR', message: 'Loi token', id: Math.random().toString() }))
                    // store.dispatch(addToast({ type: 'ERROR', message: 'Loi token', id: Math.random().toString() }))

                    store.dispatch(addToast({ type: 'ERROR', message: 'Loi token', id: Math.random().toString() }))
                    store.dispatch(doOpenBoxLogin())
                }
                if (error.response?.status === 401) {
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