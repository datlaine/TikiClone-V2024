import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { TProductDetail } from '../types/product/product.type'

const products: TProductDetail[] = []
const shop_products: TProductDetail[] = []
const shop_owner_products: TProductDetail[] = []

const initialState = {
      products,
      shop_products,
      shop_owner_products,
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

            fetchShopOwnerProduct: (state, payload: PayloadAction<{ shop_owner_products: TProductDetail[] }>) => {
                  state.shop_owner_products = payload.payload.shop_owner_products
            },
      },
})

export const { fetchProduct, fetchShopProduct, fetchShopOwnerProduct } = categorySlice.actions
export default categorySlice.reducer
