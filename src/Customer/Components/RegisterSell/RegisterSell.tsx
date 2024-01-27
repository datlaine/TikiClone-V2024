import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../../store'
import { Select } from 'antd'
import Book from './ProductType/Book'
import Food from './ProductType/Food'
import ButtonUpload from './components/ButtonUpload'
import Input from './components/Input'
import ButtonUploadMultiple from './components/ButtonUploadMultiple'
import { FormProvider, useForm } from 'react-hook-form'
import ProductApi, { IFormDataProductFull } from '../../../apis/product.api'
import { useMutation } from '@tanstack/react-query'
import { url } from 'inspector'
import { NotebookPen, Store } from 'lucide-react'
import Timeline from './components/Timeline'

export type TFormProduct = {
    name_product: string
    price: number
    product_thumb_image: { secure_url: string; public_id: string }
    product_image_desc: string[]
    product_id: string
}

const RegisterSell = () => {
    const user = useSelector((state: RootState) => state.authentication.user)
    const [productType, setProductType] = useState<'Book' | 'Food'>()
    const [urlProductThumb, setUrlProductThumb] = useState<{
        product_id: string
        product_thumb_image: { secure_url: string; public_id: string }
    }>({
        product_thumb_image: { secure_url: '', public_id: '' },

        product_id: '',
    })
    const methods = useForm<TFormProduct>({
        defaultValues: { name_product: '12', price: 0, product_thumb_image: { secure_url: '', public_id: '' }, product_image_desc: [] },
    })

    const uploadProductFull = useMutation({
        mutationKey: ['upload-product-full'],
        mutationFn: (data: IFormDataProductFull) => ProductApi.uploadProductFull(data),
    })

    const onSubmit = (data: TFormProduct) => {
        console.log({ data })
        //chỉ submit khi có đủ image
        if (urlProductThumb) {
            console.log({ urlProductThumb })

            // methods.setValue('product_thumb', urlProductThumb.product_thumb_image)
            const formData: IFormDataProductFull = new FormData()
            formData.append('product_id ', urlProductThumb.product_id)

            formData.append('product_name', data.name_product)
            formData.append('product_price', data.price)
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
            <div
                className=' w-[full] lg:w-[70%]  h-full
'
            >
                <FormProvider {...methods}>
                    <form className='w-[60%]  flex flex-col gap-[16px] p-[16px]' onSubmit={methods.handleSubmit(onSubmit)}>
                        <Input
                            nameInput='name_product'
                            message='Tên sản phẩm'
                            placehorder='Nhập tên sản phẩm'
                            width={'xl:w-[55%]'}
                            autofocus={true}
                            require={true}
                        />
                        <ButtonUpload
                            labelMessage='Chọn hình đại diện cho sản phẩm'
                            width={'xl:w-[32%]'}
                            setUrlProductThumb={setUrlProductThumb}
                        />
                        <Input nameInput='price' message='Giá sản phẩm' placehorder='Nhập giá sản phẩm' width={'xl:w-[55%]'} />
                        <ButtonUploadMultiple labelMessage='Chọn các hình description cho sản phẩm' width={'xl:w-[80%]'} multiple={true} />

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

            <div className='h-auto min-w-[100px] w-auto flex flex-col items-center py-[12px]'>
                <Timeline methods={methods} form_name_item='name_product' timelineName='Tên sản phẩm' />
                <Timeline methods={methods} form_name_item='price' timelineName='Giá sản phẩm' />
            </div>
        </div>
    )
}

export default RegisterSell
