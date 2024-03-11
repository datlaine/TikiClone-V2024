import { TBookProductNestedForm } from '../product/product.book.type'
import { TTimeLineFieldName, TTimeLineLabelName } from './timeLine.type'

export type TTimeLineBookField = TBookProductNestedForm

export type TTimeLineBookLabel = {
      'Nhà xuất bản': string
      'Tác giả': string
      'Số trang': string
      'Mô tả chi tiết': string
      'Thể loại của sách': string
}

export const timelineFieldNameBook: Array<keyof TTimeLineBookField> = [
      'attribute.publishing',
      'attribute.author',
      'attribute.page_number',
      'attribute.description',
      'attribute.type',
]
export const timelineLabelNameBook: Array<keyof TTimeLineBookLabel> = [
      'Nhà xuất bản',
      'Tác giả',
      'Số trang',
      'Mô tả chi tiết',
      'Thể loại của sách',
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
                  FieldName: field,
                  label: defaultLabelName[index] as keyof Label,
            }
      })
      return result
}
