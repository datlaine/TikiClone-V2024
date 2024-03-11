import { TProductFormCommon } from './product.type'

export type ProductFoodType = 'Fast food' | 'Canned Goods' | 'Drinks'

export interface IProductFood {
      product_food_Manufacturers_Name: string
      product_food_origin: string
      product_food_unit: 'Kilogram' | 'Box'
      description: string
      type: 'Fast food' | 'Canned Goods' | 'Drinks'
}

export type ProductFoodFormNested = {
      ['attribute.product_food_Manufacturers_Name']: string

      ['attribute.product_food_origin']: string
      ['attribute.product_food_unit']: number
      ['attribute.product_food_Date_Of_manufacture']: string
      ['attribute.description']: string

      ['attribute.type']: ProductFoodType
}

export type ProductFoodForm = TProductFormCommon & { attribute: IProductFood }
