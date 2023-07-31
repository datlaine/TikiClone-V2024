import { configureStore } from '@reduxjs/toolkit'
import authSlice from './Redux/authSlice'
import cartSlice from './Redux/reducer'

export const store = configureStore({
  reducer: {
    cartList: cartSlice,
    auth: authSlice,
  },
})
