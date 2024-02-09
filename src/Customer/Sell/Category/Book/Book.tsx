import React from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import InputText from '../../components/InputText'
import InputNumber from '../../components/InputNumber'
import { Input } from 'antd'
import { TRegisterFormBook } from '../../RegisterProductForm/FormRegisterFood'

// const schema = z.object({
//     producpublishing: z.string().min(1, { message: 'Tên nhà xuất bản là bắt buộc' }),
//     product_page_number: z
//         .number()
//         .min(1, { message: 'Số trang của sách phải lớn hơn 0' })
//         .max(3004, { message: 'Số trang của sách lớn nhất là 3004' }),
// })

const { TextArea } = Input

export type TProps = {
    mode: 'UPLOAD' | 'UPDATE'
}

const Book = (props: TProps) => {
    const { mode } = props

    const form = useFormContext()
    const error = form.formState.errors
    return (
        <div className='flex flex-col gap-[16px]'>
            <InputText
                FieldName={mode === 'UPLOAD' ? 'publishing' : 'attribute.publishing'}
                LabelMessage='Tên nhà sản xuất'
                placehorder='Nhập tên sản xuất'
            />
            <InputNumber
                FieldName={mode === 'UPLOAD' ? 'page_number' : 'attribute.page_number'}
                LabelMessage='Số trang của sách'
                placehorder='Số trang của sách'
            />
            <InputText FieldName={mode === 'UPLOAD' ? 'author' : 'attribute.author'} LabelMessage='Tác giả' placehorder='Tên tác giả' />
            <Controller
                name={mode === 'UPLOAD' ? 'description' : 'attribute.description'}
                control={form.control}
                render={({ field }) => <TextArea {...field} maxLength={1000} rows={8} />}
            />
            {error['description'] && (
                <span className='text-red-700 text-[12px] w-[200px] truncate'>{error['description'].message as React.ReactNode}</span>
            )}
        </div>
    )
}

export default Book