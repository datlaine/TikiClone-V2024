import { TProductFormCommon } from './product.type'

export type TBookProduct = {
      publishing: string
      page_number: number
      author: string
      description: string
}

export type TRegisterFormBook = TProductFormCommon & TBookProduct
