import { TProductFormCommon } from './product.type'

export type TBookProduct = {
      publishing: string
      page_number: number
      author: string
      description: string
}

export type TBookProductNestedForm = {
      ['attribute.publishing']: string

      ['attribute.author']: string
      ['attribute.page_number']: number
      ['attribute.description']: string
}

export type TRegisterFormBook = TProductFormCommon & { attribute: TBookProduct }
