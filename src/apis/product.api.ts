import { TResponseApi } from '../types/axiosResponse'
import axiosCustom from './http'

export interface IFormDataImage extends FormData {
    append(name: 'image', value: string | Blob, fileName?: string): void
}

export interface IFormDataProductFull extends FormData {
    append(
        name: 'product_id' | 'product_thumb_image' | 'product_price' | 'product_name',
        value: string | Blob | number,
        fileName?: string,
    ): void
}

class ProductApi {
    static async uploadProductThumb(image_product: IFormDataImage) {
        return axiosCustom.post<TResponseApi<{ product_id: string; product_thumb_image: string }>>(
            'v1/api/product/upload-product-thumb',
            image_product,
            {
                headers: { 'content-Type': 'multipart/form-data' },
            },
        )
    }

    static async uploadProductFull(product: IFormDataProductFull) {
        return axiosCustom.post<TResponseApi<{ product_name: string; product_price: number; product_thumb_image: string }>>(
            'v1/api/product/upload-product-full',
            product,
        )
    }
}

export default ProductApi
