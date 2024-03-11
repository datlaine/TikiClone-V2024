import { TBookProductNestedForm } from '../product/product.book.type'
import { ProductFoodFormNested } from '../product/product.food.type'
import { TTimeLineFieldName, TTimeLineLabelName } from './timeLine.type'

export type TimelineFoodFieldName = ProductFoodFormNested

export type TimelineFoodLabel = {
      'Nhà xuất sản xuất': string
      'Nguồn gốc / xuất xứ': string
      'Loại thực phẩm': string
      'Đơn vị / khối lượng': string
      'Mô tả chi tiết': string
}

export const timelineFieldNameFood: Array<keyof TimelineFoodFieldName> = [
      'attribute.product_food_Manufacturers_Name',
      'attribute.product_food_origin',
      'attribute.type',

      'attribute.product_food_unit',
      'attribute.description',
]
export const timelineLabelNameFood: Array<keyof TimelineFoodLabel> = [
      'Nhà xuất sản xuất',
      'Nguồn gốc / xuất xứ',
      'Loại thực phẩm',
      'Đơn vị / khối lượng',
      'Mô tả chi tiết',
]

export const renderTimeLine = <FieldName extends TTimeLineFieldName, Label extends TTimeLineLabelName>({
      defaultFieldName,
      defaultLabelName,
}: {
      defaultFieldName: Array<keyof FieldName>
      defaultLabelName: Array<keyof Label>
}) => {
      const result: { FieldName: keyof FieldName; label: keyof Label }[] = defaultFieldName.map((field, index) => {
            return {
                  FieldName: field as keyof FieldName,
                  label: defaultLabelName[index] as keyof Label,
            }
      })
      return result
}
