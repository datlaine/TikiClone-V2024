import { TBookProduct } from '../product/product.book.type'
import { TTimeLineFieldName, TTimeLineLabelName } from './timeLine.type'

export type TTimeLineBookField = TBookProduct

export type TTimeLineBookLabel = {
      'Nhà xuất bản': string
      'Tác giả': string
      'Số trang': string
      'Mô tả chi tiết': string
}

export const timelineFieldNameBook: Array<keyof TTimeLineBookField> = ['publishing', 'author', 'page_number', 'description']
export const timelineLabelNameBook: Array<keyof TTimeLineBookLabel> = ['Nhà xuất bản', 'Tác giả', 'Số trang', 'Mô tả chi tiết']

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
