import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { TProductDetail } from '../types/product/product.type'

const products: TProductDetail[] = []
const shop_products: TProductDetail[] = []

const initialState = {
      products,
      shop_products,
}

const categorySlice = createSlice({
      name: 'category',
      initialState,
      reducers: {
            fetchProduct: (state, payload: PayloadAction<{ products: TProductDetail[] }>) => {
                  state.products = payload.payload.products
            },

            fetchShopProduct: (state, payload: PayloadAction<{ shop_products: TProductDetail[] }>) => {
                  state.shop_products = payload.payload.shop_products
            },
      },
})

export const { fetchProduct, fetchShopProduct } = categorySlice.actions
export default categorySlice.reducer
