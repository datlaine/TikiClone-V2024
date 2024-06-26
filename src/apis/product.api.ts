import { ServerMessageVerify, TResponseApi } from '../types/axiosResponse'
import axiosCustom from './http'
import { ProductType, TProductDetail, TProductFormCommon } from '../types/product/product.type'
import { TBookProduct } from '../types/product/product.book.type'
import { IProductFood } from '../types/product/product.food.type'
import { ShopResponse } from '../types/shop.type'
import { ProductFilter } from '../component/BoxUi/BoxFilterProduct'
import { ModeForm } from '../component/BoxUi/BoxShopForm'

export type TProduct = {
      product_id: string
      product_name: string
      product_price: number
      product_thumb_image: {
            secure_url: string
            public_id: string
      }
      product_desc_image: {
            secure_url: string
            public_id: string
      }[]
}

export type TProductReturn = {
      _id: string
      product_name: string
      product_price: number
      product_thumb_image: {
            secure_url: string
            public_id: string
      }
}

export type DetailComment = { _id: number; comment_count: number }[]

export interface IFormDataImage extends FormData {
      append(name: 'file' | 'product_id', value: string | Blob, fileName?: string): void
}
export interface IFormDataImageUpdate extends FormData {
      append(name: 'file' | 'product_id' | 'public_id', value: string | Blob, fileName?: string): void
}

export interface IFormDataImages extends FormData {
      append(name: 'files' | 'product_id', value: string | Blob, fileName?: string): void
}

export interface IFormDataImagesUpdate extends FormData {
      append(name: 'files' | 'remove_url_array', value: string | Blob, fileName?: string): void
}

export interface IFormDataDeleteImage extends FormData {
      append(name: 'product_id' | 'public_id', value: string | Blob, fileName?: string): void
}
export interface IFormDataProductFull extends FormData {
      append(
            name:
                  | '_id '
                  | 'product_thumb_image_url'
                  | 'product_thumb_image_public_id'
                  | 'product_price'
                  | 'product_name'
                  | 'publishing'
                  | 'page_number'
                  | 'author'
                  | 'description'
                  | 'product_image_description'
                  | 'product_is_bought'
                  | 'product_available'
                  | 'book_type',
            value: string | Blob | number,
            fileName?: string,
      ): void
}

export type ProductData = {
      uploadProduct: Pick<TProductFormCommon, 'product_id' | 'product_name' | 'product_price' | 'product_available'>
      product_attribute: TBookProduct | IProductFood
      product_id: string
      mode: ModeForm
}

class ProductApi {
      static async createBaseProductId() {
            return axiosCustom.post<{ metadata: { product_id: string } }>('v1/api/product/create-base-product-id')
      }

      static async uploadProductDescriptionImageOne({ formData }: { formData: IFormDataImage }) {
            return axiosCustom.post<
                  TResponseApi<{
                        product: {
                              product_id: string
                              public_id: string
                              secure_url: string
                        }
                  }>
            >('v1/api/product/upload-product-description-image-one', formData, {
                  headers: { 'content-Type': 'multipart/form-data' },
            })
      }

      static async deleteProductDescriptionImageOne(formData: IFormDataDeleteImage) {
            return axiosCustom.post<
                  TResponseApi<{
                        product: {
                              product_id: string
                              public_id: string
                        }
                  }>
            >('v1/api/product/delete-product-description-image-one', formData, {
                  headers: { 'content-Type': 'multipart/form-data' },
            })
      }

      static async uploadProductThumb({ formData }: { formData: IFormDataImage }) {
            return axiosCustom.post<
                  TResponseApi<{ product: { product_id: string; product_thumb_image: { secure_url: string; public_id: string } } }>
            >('v1/api/product/upload-product-thumb', formData, {
                  headers: { 'content-Type': 'multipart/form-data' },
            })
      }

      static async updateProductThumb(image_product: IFormDataImage) {
            return axiosCustom.post<
                  TResponseApi<{ product: { product_id: string; product_thumb_image: { secure_url: string; public_id: string } } }>
            >('v1/api/product/update-product-thumb', image_product, {
                  headers: { 'content-Type': 'multipart/form-data' },
            })
      }

      static async uploadProductImagesFull(image_product: IFormDataImages) {
            return axiosCustom.post<
                  TResponseApi<{ product: { productDemo: { _id: string; product_desc_image: { secure_url: string; public_id: string } } } }>
            >('v1/api/product/upload-product-images-full', image_product, {
                  headers: { 'content-Type': 'multipart/form-data' },
            })
      }

      static async updateProductImagesFull(image_product: IFormDataImages) {
            return axiosCustom.post<
                  TResponseApi<{ product: { productDemo: { _id: string; product_desc_image: { secure_url: string; public_id: string } } } }>
            >('v1/api/product/update-product-images-full', image_product, {
                  headers: { 'content-Type': 'multipart/form-data' },
            })
      }

      static async uploadProductFull(product: ProductData, endpointUrl: string) {
            return axiosCustom.post<
                  TResponseApi<{
                        product: { product_id: string; product_name: string; product_price: number; product_thumb_image: string }
                  }>
            >(endpointUrl, product)
      }

      static async getProductShop() {
            return axiosCustom.get<TResponseApi<{ product_all: TProduct[] }>>('v1/api/product/shop-product-all')
      }

      static async deleteProductThumb({ public_id, id }: { public_id: string; id: string }) {
            return axiosCustom.post<TResponseApi<{ message: string }>>('v1/api/product/delete-product-thumb', { public_id, id })
      }

      static async deleteImages({ id }: { id: string }) {
            return axiosCustom.post<TResponseApi<{ message: string }>>('v1/api/product/delete-product-image-full', { id })
      }

      static async getAllProduct({ page, limit }: { page: number; limit: number }) {
            return axiosCustom.get<{ metadata: { products: TProductDetail[]; totalPage: number } }>('v1/api/product/get-all-product', {
                  params: { page, limit },
            })
      }

      static async getProductBestBought({ page, limit }: { page: number; limit: number }) {
            return axiosCustom.get<{ metadata: { products: TProductDetail[] } }>('v1/api/product/get-product-best-bought', {
                  params: { page, limit },
            })
      }

      static async getProductBookAllType() {
            return axiosCustom.get<{
                  metadata: { products: TProductDetail[]; manga: TProductDetail[]; novel: TProductDetail[]; detective: TProductDetail[] }
            }>('v1/api/product/get-product-book-all-type')
      }

      static async getProductFoodAllType() {
            return axiosCustom.get<{
                  metadata: {
                        products: TProductDetail[]
                        fastFood: TProductDetail[]
                        cannedGood: TProductDetail[]
                        drinks: TProductDetail[]
                  }
            }>('v1/api/product/get-product-food-all-type')
      }

      static async getAllProductCare() {
            return axiosCustom.get<{ metadata: { products: TProductDetail[] } }>('v1/api/product/get-product-care')
      }

      static async getProductSimilar({ product_type, type, product_id }: { product_type: ProductType; type: string; product_id: string }) {
            return axiosCustom.get<{ metadata: { products: TProductDetail[] } }>('v1/api/product/get-product-similar', {
                  params: { product_type, product_id },
            })
      }

      static async getProductWithId({ id }: { id: string }) {
            return axiosCustom.get<{
                  metadata: {
                        product: TProductDetail
                  }
            }>(`v1/api/product/get-product/${id}`)
      }

      static async protectProduct({ id }: { id: string }) {
            return axiosCustom.get<{ metadata: { product: TProductDetail | null } }>(`v1/api/product/protect-product/${id}`)
      }

      static async deleteProductWithId({ product_id }: { product_id: string }) {
            return axiosCustom.delete<{ metadata: ServerMessageVerify }>(`v1/api/product/delete-product/${product_id}`)
      }

      static async getAllProductWithType({ product_type, page }: { product_type: string; page: number }) {
            return axiosCustom.get<TResponseApi<{ products: TProductDetail[]; shops: ShopResponse[]; count: number }>>(
                  `v1/api/product/get-all-product-category?product_type=${product_type}&page=${page}`,
            )
      }

      static async getProductFilter({ params }: { params: ProductFilter }) {
            return axiosCustom.get<TResponseApi<{ products: TProductDetail[] }>>(
                  `v1/api/product/get-product-filter?page=${params.page}&product_type=${params.product_type}&vote=${params.product_vote}&minPrice=${params.minPrice}&maxPrice=${params.maxPrice}`,
            )
      }

      static async getProductShopName({ text }: { text: string }) {
            return axiosCustom.get<TResponseApi<{ products: TProductDetail[]; shops: ShopResponse[] }>>(
                  '/v1/api/product/get-product-shop-name',
                  { params: { text } },
            )
      }

      static async getProductName({ text, shop_id, page, limit }: { text: string; shop_id: string; page: number; limit: number }) {
            return axiosCustom.get<TResponseApi<{ shop: ShopResponse }>>('/v1/api/product/get-product-name', {
                  params: { text, shop_id, page, limit },
            })
      }

      static async getTopProductSearch({ limit }: { limit: number }) {
            return axiosCustom.get<{ metadata: { products: TProductDetail[] } }>('v1/api/product/get-product-top-search', {
                  params: { limit },
            })
      }
}

export default ProductApi
