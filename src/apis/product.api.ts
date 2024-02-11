import axios from 'axios'
import { TResponseApi } from '../types/axiosResponse'
import axiosCustom from './http'
import { TProductDetail, TProductFull } from '../types/product/product.type'

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

export interface IFormDataImage extends FormData {
      append(name: 'file', value: string | Blob, fileName?: string): void
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
                  | 'product_image_description',
            value: string | Blob | number,
            fileName?: string,
      ): void
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
                        }
                  }>
            >('v1/api/product/upload-product-description-image-one', formData, {
                  headers: { 'content-Type': 'multipart/form-data' },
            })
      }

      static async deleteProductDescriptionImageOne({ formData }: { formData: IFormDataImage }) {
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

      static async uploadProductImage({ formData, url }: { formData: IFormDataImage; url: string }) {
            return axiosCustom.post<
                  TResponseApi<{ product: { product_id: string; product_thumb_image: { secure_url: string; public_id: string } } }>
            >(url, formData, {
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

      static async uploadProductFull(product: IFormDataProductFull) {
            return axiosCustom.post<
                  TResponseApi<{
                        product: { product_id: string; product_name: string; product_price: number; product_thumb_image: string }
                  }>
            >('v1/api/product/upload-product-book', product)
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

      static async getAllProduct() {
            return axiosCustom.get<{ metadata: { products: TProductReturn[] } }>('v1/api/product/get-all-product')
      }

      static async getProductWithId({ id }: { id: string }) {
            return axiosCustom.get<{ metadata: { product: TProductDetail } }>(`v1/api/product/get-product/${id}`)
      }

      static async protectProduct({ id }: { id: string }) {
            return axiosCustom.get<{ metadata: { product: TProductDetail | null } }>(`v1/api/product/protect-product/${id}`)
      }
}

export default ProductApi
