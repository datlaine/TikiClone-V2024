import { TProductFormCommon } from './product.type'

export type BookType = 'Novel' | 'Manga' | 'Detective'

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
export type TRegisterFormBookTest = TProductFormCommon & { attribute: '1123' }
