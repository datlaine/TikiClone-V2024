import { FieldValues, UseFormReturn } from 'react-hook-form'

export type TimeLineProps<T, HookFormType extends FieldValues> = {
      //@từ dùng hàm watch trong methods để lấy các giá trị cập nhập tức thì
      methods?: UseFormReturn<HookFormType, any, undefined>

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
            CountFile: number
            FileName: string
      }

      //@nhiều file
      Files?: {
            CountFile: number
            FileName: string[]
      }

      mode?: 'UPLOAD' | 'UPDATE'

      //@ trạng thái submit, chỉ check khi người dùng nhấn submit
      isSubmit?: boolean
}
