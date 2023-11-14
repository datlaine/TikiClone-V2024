import { combineReducers, configureStore } from '@reduxjs/toolkit'
import authSlice from './Redux/authSlice'
import cartSlice from './Redux/reducer'

import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import uiSlice from './Redux/uiSlice'

const persistConfig = {
  key: 'anhYeuEm',
  storage,
  blacklist: ['uiSlice']
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
  cartList: cartSlice,
  auth: authSlice,
  uiSlice: uiSlice
})


const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})

export const persistor = persistStore(store)
