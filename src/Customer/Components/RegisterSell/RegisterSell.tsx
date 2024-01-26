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

type TFormProduct = {
    name_product: string
    price: number
    product_thumb: string
    product_image_desc: string[]
}

const RegisterSell = () => {
    const user = useSelector((state: RootState) => state.authentication.user)
    const [productType, setProductType] = useState<'Book' | 'Food'>()
    const [urlProductThumb, setUrlProductThumb] = useState<{ product_id: string; product_thumb_image: string }>({
        product_id: '',
        product_thumb_image: '',
    })
    const methods = useForm<TFormProduct>({
        defaultValues: { name_product: '12', price: 0, product_thumb: '', product_image_desc: [] },
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
            formData.append('product_id', urlProductThumb.product_id)

            formData.append('product_name', data.name_product)
            formData.append('product_price', data.price)
            formData.append('product_thumb_image', urlProductThumb.product_thumb_image)
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
        <div className='w-full h-[1000px] flex justify-center '>
            <FormProvider {...methods}>
                <form
                    className='bg-red-800 w-full lg:w-[540px]  h-full  flex flex-col gap-[50px] p-[16px]'
                    onSubmit={methods.handleSubmit(onSubmit)}
                >
                    <Input
                        nameInput='name_product'
                        message='Tên sản phẩm'
                        placehorder='Nhập tên sản phẩm'
                        width={'xl:w-[500px]'}
                        autofocus={true}
                        require={true}
                    />
                    <ButtonUpload
                        labelMessage='Chọn hình đại diện cho sản phẩm'
                        width={'xl:w-[500px]'}
                        setUrlProductThumb={setUrlProductThumb}
                    />
                    <Input nameInput='price' message='Giá sản phẩm' placehorder='Nhập giá sản phẩm' width={'xl:w-[500px]'} />
                    <ButtonUploadMultiple labelMessage='Chọn các hình description cho sản phẩm' width={'xl:w-[500px]'} multiple={true} />

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
    )
}

export default RegisterSell
