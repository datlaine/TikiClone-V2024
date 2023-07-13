import { configureStore } from '@reduxjs/toolkit'
import { cartSlice } from './Redux/reducer'

export const store = configureStore({
  reducer: {
    cartList: cartSlice.reducer,
  },
})
