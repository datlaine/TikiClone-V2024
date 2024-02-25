import { BookType } from '../../Customer/Sell/types/product.schema'
import { TProductFormCommon } from './product.type'

export type TBookProduct = {
      publishing: string
      page_number: number
      author: string
      description: string
      book_type: BookType
}

export type TBookProductNestedForm = {
      ['attribute.publishing']: string

      ['attribute.author']: string
      ['attribute.page_number']: number
      ['attribute.description']: string
      ['attribute.book_type']: BookType
}

export type TRegisterFormBook = TProductFormCommon & { attribute: TBookProduct }
