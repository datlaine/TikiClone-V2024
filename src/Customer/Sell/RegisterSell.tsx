import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../store'
import { Select } from 'antd'
import Book from './ProductType/Book'
import Food from './ProductType/Food'
import ButtonUpload from './components/ButtonUpload'
import ButtonUploadMultiple from './components/ButtonUploadMultiple'
import { FormProvider, useForm } from 'react-hook-form'
import ProductApi, { IFormDataProductFull } from '../../apis/product.api'
import { useMutation } from '@tanstack/react-query'
import Timeline from './components/Timeline'
import InputText from './components/InputText'
import InputMoney from './components/InputMoney'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Check, Store } from 'lucide-react'
export type TFormProduct = {
    product_name: string

    product_price: number | null
    product_thumb_image: { secure_url: string; public_id: string }
    product_image_desc: string[]
    product_id: string
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

    console.log({ error: methods.formState.errors, price: methods.watch() })

    const onSubmit = (data: TFormProduct) => {
        setFormStateSubmit(true)
        console.log({ data })
        // chỉ submit khi có đủ image
        if (urlProductThumb) {
            console.log({ urlProductThumb })

            // methods.setValue('product_thumb', urlProductThumb.product_thumb_image)
            const formData: IFormDataProductFull = new FormData()
            formData.append('product_id ', urlProductThumb.product_id)

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
                console.log({ product: uploadProductFull.data.data.metadata.product })
            }
        }
    }, [uploadProductFull.isSuccess, uploadProductFull.data?.data.metadata.product])

    if (!user.verify_email) {
        return <h1>Chức năng chỉ dành cho email đã được xác thực</h1>
    }

    return (
        <div className='w-full h-auto flex justify-center '>
            <div className=' w-[full] lg:w-[65%]  h-full'>
                <FormProvider {...methods}>
                    <form className='w-full lg:w-[60%]  flex flex-col gap-[16px] p-[16px]' onSubmit={methods.handleSubmit(onSubmit)}>
                        <InputText
                            methods={methods}
                            FieldName='product_name'
                            LabelMessage='Tên sản phẩm'
                            placehorder='Nhập tên sản phẩm'
                            width={'xl:w-[100%]'}
                            autofocus={true}
                            require={true}
                        />

                        <InputMoney
                            methods={methods}
                            FieldName='product_price'
                            LabelMessage='Tên sản phẩm'
                            placehorder='Nhập tên sản phẩm'
                            width={'xl:w-[100%]'}
                            require={true}
                        />
                        <ButtonUpload
                            labelMessage='Chọn hình đại diện cho sản phẩm'
                            width={'xl:w-[32%]'}
                            setUrlProductThumb={setUrlProductThumb}
                            setFormStateSubmit={setFormStateSubmit}
                        />
                        <ButtonUploadMultiple
                            labelMessage='Chọn các hình description cho sản phẩm'
                            width={'xl:w-[100%]'}
                            multiple={true}
                            setUrlProductMultipleImage={setUrlProductMultipleImage}
                        />

                        <Select
                            placeholder='Loại sản phẩm'
                            options={[
                                { value: 'Book', label: 'Book' },
                                { value: 'Food', label: 'Food' },
                            ]}
                            onChange={(type: 'Book' | 'Food') => setProductType(type)}
                        />
                        {/* <ButtonUpload /> */}
                        {productType === 'Book' && <Book />}
                        {productType === 'Food' && <Food />}
                        <button type='submit'>Submit</button>
                    </form>
                </FormProvider>
            </div>

            <div className='hidden h-auto min-w-[160px] w-auto lg:flex flex-col  py-[12px]'>
                <Timeline methods={methods} FieldName='product_name' TimeLineName='Tên sản phẩm' type='Text' />
                <Timeline methods={methods} FieldName='product_price' TimeLineName='Giá sản phẩm' type='Text' />
                <Timeline
                    TimeLineName='Hình đại diện sản phẩm'
                    type='File'
                    File={{
                        FileName: urlProductThumb.FileName,
                        FileNumber: urlProductThumb.FileLength,
                    }}
                    FormStateSubmit={methods.formState.isSubmitted ? true : false}
                />

                <div className='flex items-center justify-center bg-blue-700 w-[20px] h-[20px] rounded-full'>
                    <Check color='white' size={12} />
                </div>
                {/* <button className='bg-slate-700 text-white p-[12px] '>submit</button> */}
            </div>
        </div>
    )
}

export default RegisterSell
