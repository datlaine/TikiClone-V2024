import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../store'
import { Select, message } from 'antd'
import Book from './ProductType/Book'
import Food from './ProductType/Food'
import ButtonUpload from './components/ButtonUpload'
import ButtonUploadMultiple from './components/ButtonUploadMultiple'
import { FormProvider, UseFormReturn, useForm } from 'react-hook-form'
import ProductApi, { IFormDataProductFull } from '../../apis/product.api'
import { useMutation } from '@tanstack/react-query'
import Timeline from './components/Timeline'
import InputText from './components/InputText'
import InputMoney from './components/InputNumber'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Check, Store } from 'lucide-react'
import FormRegisterBook from './components/FormRegisterBook'

export type BookProduct = {
    book: {
        book_publishing: string
        book_pageNumber: number
    }
}

export type TFormProduct = {
    product_name: string

    product_price: number | null
    product_thumb_image: { secure_url: string; public_id: string }
    product_image_desc: string[]
    product_id: string
    book: { publishing: '' }
}

export type UploadImage = {
    product_id: string
    product_thumb_image: { secure_url: string; public_id: string }
    FileName: string
    FileLength: number
}

export type UploadImages = UploadImage[]

const schema = z
    .object({
        product_name: z
            .string({
                required_error: 'Name is required',
                invalid_type_error: 'Name must be a string',
            })
            .min(1, { message: 'Tên sản phẩm là bắt buộc' }),

        product_price: z
            .number({ required_error: 'Giá phải là một số', invalid_type_error: 'Gia phai la so' })
            .min(1, { message: 'Giá là bắt buộc' })
            .positive({ message: 'Giá phải lớn hơn 0' })
            .lte(10000000000, { message: 'Sản phẩm có giá tối đa là 10 tỷ VNĐ' }),
        book: z
            .object({
                publishing: z.string().min(1, 'OK').optional().or(z.literal('')),
            })
            .optional(),
    })
    .refine(
        (value) => {
            const first = value.product_name.slice(0, 1)
            return Number(first) ? false : true
        },
        {
            path: ['product_name'],
            message: 'Không thể bắt đầu bằng số',
        },
    )
    .refine((value) => (value.book && value.book?.publishing === '' ? true : false), { path: ['book.publishing'], message: 'KH' })

const RegisterSell = () => {
    const user = useSelector((state: RootState) => state.authentication.user)
    const [productType, setProductType] = useState<'Book' | 'Food'>()
    const [urlProductThumb, setUrlProductThumb] = useState<UploadImage>({
        product_thumb_image: { secure_url: '', public_id: '' },
        product_id: '',
        FileName: '',
        FileLength: 0,
    })

    const [formStateSubmit, setFormStateSubmit] = useState(false)

    const [urlProductMultipleImage, setUrlProductMultipleImage] = useState<UploadImages>([])
    const methods = useForm<TFormProduct>({
        defaultValues: {
            product_name: '',
            product_price: null,
            product_thumb_image: { secure_url: '', public_id: '' },
            product_image_desc: [],
        },

        resolver: zodResolver(schema),
    })

    const uploadProductFull = useMutation({
        mutationKey: ['upload-product-full'],
        mutationFn: (data: IFormDataProductFull) => ProductApi.uploadProductFull(data),
    })

    const onSubmit = (data: TFormProduct) => {
        setFormStateSubmit(true)
        // chỉ submit khi có đủ image
        if (urlProductThumb.product_thumb_image.secure_url) {
            console.log({ urlProductThumb })

            // methods.setValue('product_thumb', urlProductThumb.product_thumb_image)
            const formData: IFormDataProductFull = new FormData()
            formData.append('_id ', urlProductThumb.product_id)

            formData.append('product_name', data.product_name)
            formData.append('product_price', data.product_price as number)
            formData.append('product_thumb_image_url', urlProductThumb.product_thumb_image.secure_url)
            formData.append('product_thumb_image_public_id', urlProductThumb.product_thumb_image.public_id)

            uploadProductFull.mutate(formData)
        }
    }

    useEffect(() => {
        if (uploadProductFull.isSuccess) {
            if (uploadProductFull.data.data.metadata.product) {
            }
        }
    }, [uploadProductFull.isSuccess, uploadProductFull.data?.data.metadata.product])

    if (!user.verify_email) {
        return <h1>Chức năng chỉ dành cho email đã được xác thực</h1>
    }
    return (
        <div className='min-w-full min-h-[100px] h-auto flex '>
            <div className=' w-full h-full'>
                <Select
                    placeholder='Loại sản phẩm'
                    options={[
                        { value: 'Book', label: 'Book' },
                        { value: 'Food', label: 'Food' },
                    ]}
                    onChange={(type: 'Book' | 'Food') => setProductType(type)}
                />
                {productType === 'Book' && <FormRegisterBook />}
            </div>
        </div>
    )
}

export default RegisterSell
