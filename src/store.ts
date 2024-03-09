import { combineReducers, configureStore } from '@reduxjs/toolkit'
import authSlice from './Redux/authSlice'

import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import uiSlice from './Redux/uiSlice'
import authenticationSlice from './Redux/authenticationSlice'
import toast from './Redux/toast'
import cartSlice from './Redux/cartSlice'
import categorySlice from './Redux/category.slice'
import commentSlice from './Redux/comment.slice'

const persistConfig = {
      key: 'anhYeuEm',
      storage,
      blacklist: ['uiSlice', 'authentication', 'toast', 'cartSlice'],
}

// const authPersistConfig = {
//   key: 'auth',
//   storage: storage,
//   blacklist: ['']
// }

// const cartPersistConfig = {
//   key: 'cart',
//   storage: storage,
//   blacklist: ['']
// }

const rootReducer = combineReducers({
      cartSlice: cartSlice,
      auth: authSlice,
      uiSlice: uiSlice,
      authentication: authenticationSlice,
      toast: toast,
      category: categorySlice,
      commentSlice: commentSlice,
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
      reducer: persistedReducer,
      middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware({
                  serializableCheck: false,
            }),
})

export type RootState = ReturnType<typeof store.getState>

export const persistor = persistStore(store)
