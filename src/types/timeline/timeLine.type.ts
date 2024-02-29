import { FieldValues, UseFormReturn } from 'react-hook-form'
import { TTimeLineBookField, TTimeLineBookLabel } from './timeline.book.type'
import { TimelineFoodFieldName, TimelineFoodLabel } from './timeline.food.type'

export type TimeLineProps<FieldNameInput, HookFormType extends FieldValues> = {
      //@từ dùng hàm watch trong methods để lấy các giá trị cập nhập tức thì
      methods?: UseFormReturn<HookFormType, any, undefined>
      value?: string
      messageError?: string
      //@Tên Timeline
      TimeLineName: string
      attribute: boolean
      //@field lỗi
      error?: boolean

      //@field cung cấp cho hàm watch
      FieldName?: keyof FieldNameInput

      //@các dạng timeline khác nhau
      type: 'Text' | 'File' | 'Files' | 'Money'

      //@một file
      File?: {
            isUploadImage: boolean
            FileName: string
      }

      //@nhiều file
      Files?: {
            isUploadImages: boolean

            FileName: string[]
      }

      mode?: 'UPLOAD' | 'UPDATE'

      //@ trạng thái submit, chỉ check khi người dùng nhấn submit
      isSubmit?: boolean
}

export type Timeline<T, K> = {
      FieldName: keyof T
      text: keyof K
}

export type TTimeLineFieldName = TTimeLineBookField | TimelineFoodFieldName
export type TTimeLineLabelName = TTimeLineBookLabel | TimelineFoodLabel
