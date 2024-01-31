import { Check } from 'lucide-react'
import { useEffect, useState } from 'react'
import ProductApi, { IFormDataProductFull } from '../../../apis/product.api'
import { useMutation } from '@tanstack/react-query'
import { zodResolver } from '@hookform/resolvers/zod'
import { FormProvider, useForm } from 'react-hook-form'
import InputText from './InputText'
import ButtonUpload from './ButtonUpload'
import InputNumber from './InputNumber'
import ButtonUploadMultiple from './ButtonUploadMultiple'
import * as z from 'zod'
import Timeline from './Timeline'
import Book from '../ProductType/Book'

export type BookProduct = {
    book: {
        book_publishing: string
        book_pageNumber: number
    }
}

export type TRegisterFormBook = {
    product_name: string

    product_price: number | null
    product_thumb_image: { secure_url: string; public_id: string }
    product_image_desc: string[]
    product_id: string
    publishing: string
    page_number: 0
    author: string
    description: string
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
        publishing: z.string().min(1, 'Tên nhà xuất bản là bắt buộc'),
        page_number: z.number().min(1, 'Số trang là bắt buộc').max(3004, 'Sách nhiều nhất 3004'),
        author: z.string().min(1, 'Tên tác giả là bắt buộc'),
        description: z.string().min(1, 'Vui lòng nhập thêm thông tin mô tả về sản phẩm').max(1000, 'Tối đa 1000 từ'),
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

const FormRegisterBook = () => {
    const [urlProductThumb, setUrlProductThumb] = useState<UploadImage>({
        product_thumb_image: { secure_url: '', public_id: '' },
        product_id: '',
        FileName: '',
        FileLength: 0,
    })

    const [formStateSubmit, setFormStateSubmit] = useState(false)

    const [urlProductMultipleImage, setUrlProductMultipleImage] = useState<UploadImages>([])
    const methods = useForm<TRegisterFormBook>({
        defaultValues: {
            product_name: '',
            product_price: null,
            product_thumb_image: { secure_url: '', public_id: '' },
            product_image_desc: [],
            publishing: '',
            page_number: 0,
            author: '',
            description: '',
        },

        resolver: zodResolver(schema),
    })

    const uploadProductFull = useMutation({
        mutationKey: ['upload-product-full'],
        mutationFn: (data: IFormDataProductFull) => ProductApi.uploadProductFull(data),
    })

    const onSubmit = (data: TRegisterFormBook) => {
        setFormStateSubmit(true)
        console.log({ data })
        // chỉ submit khi có đủ image
        if (urlProductThumb.product_thumb_image.secure_url) {
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
            }
        }
    }, [uploadProductFull.isSuccess, uploadProductFull.data?.data.metadata.product])
    return (
        <div className='w-full h-auto flex justify-center '>
            <div className=' w-[full] lg:w-[65%]  h-full'>
                <FormProvider {...methods}>
                    <form className='w-full lg:w-[60%]  flex flex-col gap-[16px] p-[16px]' onSubmit={methods.handleSubmit(onSubmit)}>
                        <div className=''>Thông tin cơ bản về sản phẩm</div>
                        <InputText
                            methods={methods}
                            FieldName='product_name'
                            LabelMessage='Tên sản phẩm'
                            placehorder='Nhập tên sản phẩm'
                            width={'xl:w-[100%]'}
                            autofocus={true}
                            require={true}
                        />

                        <InputNumber
                            FieldName='product_price'
                            LabelMessage='Giá sản phẩm'
                            placehorder='Nhập giá sản phẩm'
                            width={'xl:w-[100%]'}
                            require={true}
                        />
                        <ButtonUpload
                            labelMessage='Chọn hình đại diện cho sản phẩm'
                            width={'xl:w-[32%]'}
                            setUrlProductThumb={setUrlProductThumb}
                            setFormStateSubmit={setFormStateSubmit}
                        />
                        <Book />

                        <ButtonUploadMultiple
                            labelMessage='Chọn các hình description cho sản phẩm'
                            width={'xl:w-[100%]'}
                            multiple={true}
                            setUrlProductMultipleImage={setUrlProductMultipleImage}
                            product_id={urlProductThumb.product_id}
                        />

                        <button type='submit'>Bán</button>
                    </form>
                </FormProvider>
            </div>

            <div className='hidden h-auto min-w-[160px] w-auto lg:flex flex-col  py-[12px]'>
                <Timeline methods={methods} FieldName='product_name' TimeLineName='Tên sản phẩm' type='Text' />
                <Timeline methods={methods} FieldName='product_price' TimeLineName='Giá sản phẩm' type='Money' />
                <Timeline
                    TimeLineName='Hình đại diện sản phẩm'
                    type='File'
                    File={{
                        FileName: urlProductThumb.FileName,
                        CountFile: urlProductThumb.FileLength,
                    }}
                    isSubmit={methods.formState.isSubmitted ? true : false}
                />
                <Timeline methods={methods} FieldName='publishing' TimeLineName='Nhà xuất bản' type='Text' />

                <Timeline methods={methods} FieldName='page_number' TimeLineName='Số trang' type='Text' />
                <Timeline methods={methods} FieldName='author' TimeLineName='Tên tác giả' type='Text' />
                <Timeline methods={methods} FieldName='description' TimeLineName='Mô tả chi tiết' type='Text' />

                {/* <Timeline
                    TimeLineName='Hình đại diện sản phẩm'
                    type='Files'
                    Files={{
                        FileName: [urlProductThumb.FileName],
                        CountFile: urlProductThumb.FileLength,
                    }}
                    isSubmit={methods.formState.isSubmitted ? true : false}
                /> */}

                <div className='flex items-center justify-center bg-blue-700 w-[20px] h-[20px] rounded-full'>
                    <Check color='white' size={12} />
                </div>
                {/* <button className='bg-slate-700 text-white p-[12px] '>submit</button> */}
            </div>
        </div>
    )
}

export default FormRegisterBook
