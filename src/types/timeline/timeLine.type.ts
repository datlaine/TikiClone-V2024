import { FieldValues, UseFormReturn } from 'react-hook-form'
import { TTimeLineBookField, TTimeLineBookLabel } from './timeline.book.type'

export type TimeLineProps<T, HookFormType extends FieldValues> = {
      //@từ dùng hàm watch trong methods để lấy các giá trị cập nhập tức thì
      methods?: UseFormReturn<HookFormType, any, undefined>
      value?: string
      messageError?: string
      //@Tên Timeline
      TimeLineName: string

      //@field lỗi
      error?: boolean

      //@field cung cấp cho hàm watch
      FieldName?: keyof T

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

export type TTimeLineFieldName = TTimeLineBookField
export type TTimeLineLabelName = TTimeLineBookLabel
