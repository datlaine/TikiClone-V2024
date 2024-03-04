import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { TProductDetail } from '../types/product/product.type'

const products: TProductDetail[] = []

const initialState = {
      products,
}

const categorySlice = createSlice({
      name: 'category',
      initialState,
      reducers: {
            fetchProduct: (state, payload: PayloadAction<{ products: TProductDetail[] }>) => {
                  state.products = payload.payload.products
            },
      },
})

export const { fetchProduct } = categorySlice.actions
export default categorySlice.reducer
