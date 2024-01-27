import { TResponseApi } from '../types/axiosResponse'
import axiosCustom from './http'

export type TProduct = {
    product_id: string
    product_name: string
    product_price: number
    product_thumb_image: string
}

export interface IFormDataImage extends FormData {
    append(name: 'image', value: string | Blob, fileName?: string): void
}

export interface IFormDataProductFull extends FormData {
    append(
        name: 'product_id ' | 'product_thumb_image_url' | 'product_thumb_image_public_id' | 'product_price' | 'product_name',
        value: string | Blob | number,
        fileName?: string,
    ): void
}

class ProductApi {
    static async uploadProductThumb(image_product: IFormDataImage) {
        return axiosCustom.post<
            TResponseApi<{ product: { product_id: string; product_thumb_image: { secure_url: string; public_id: string } } }>
        >('v1/api/product/upload-product-thumb', image_product, {
            headers: { 'content-Type': 'multipart/form-data' },
        })
    }

    static async uploadProductFull(product: IFormDataProductFull) {
        return axiosCustom.post<
            TResponseApi<{ product: { product_id: string; product_name: string; product_price: number; product_thumb_image: string } }>
        >('v1/api/product/upload-product-full', product)
    }

    static async getAllProduct() {
        return axiosCustom.get<TResponseApi<{ product_all: TProduct[] }>>('v1/api/product/shop-product-all')
    }

    static async deleteProductThumb({ public_id, id }: { public_id: string; id: string }) {
        return axiosCustom.post<TResponseApi<{ message: string }>>('v1/api/product/delete-product-thumb', { public_id, id })
    }
}

export default ProductApi
