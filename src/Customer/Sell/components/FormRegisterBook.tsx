import { useEffect, useState } from 'react'

//@icon
import { Check } from 'lucide-react'

//@api
import ProductApi, { IFormDataProductFull } from '../../../apis/product.api'
import { useMutation } from '@tanstack/react-query'

//@form
import { zodResolver } from '@hookform/resolvers/zod'
import { FormProvider, useForm } from 'react-hook-form'
import * as z from 'zod'

//@components
import InputText from './InputText'
import ButtonUpload from './ButtonUpload'
import InputNumber from './InputNumber'
import ButtonUploadMultiple from './ButtonUploadMultiple'
import Timeline from './Timeline'
import Book from '../ProductType/Book'
import { useDispatch } from 'react-redux'
import { addToast } from '../../../Redux/toast'

//@Props - Product::Book
export type BookProduct = {
    book: {
        book_publishing: string
        book_pageNumber: number
    }
}

//@type form chính
export type TRegisterFormBook = {
    product_id: string
    product_name: string
    product_price: number | null
    product_thumb_image: { secure_url: string; public_id: string }
    product_image_desc: string[]

    //@attribute book
    publishing: string
    page_number: 0
    author: string
    description: string
}

//@type upload 1 hình
export type UploadImage = {
    product_id: string
    product_thumb_image: { secure_url: string; public_id: string }
    FileName: string
    FileLength: number
}

//@type upload 1 mảng
export type UploadImages = {
    secure_url: string
    public_id: string
}

//@schema chính
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

export const ui = {
    gapElementChild: 'gap-[6px]',
    gapElementChildButton: 'gap-[12px]',
    fontSizeError: 'text-[12px]',
    colorError: 'text-red-700',
}

//@Component
const FormRegisterBook = () => {
    //@trang thái submit
    const [, setFormStateSubmit] = useState(false)
    const dispatch = useDispatch()
    //@lấy thông tin hình ảnh
    const [urlProductThumb, setUrlProductThumb] = useState<UploadImage>({
        product_thumb_image: { secure_url: '', public_id: '' },
        product_id: '',
        FileName: '',
        FileLength: 0,
    })

    //@lấy thông tin các hình
    const [urlProductMultipleImage, setUrlProductMultipleImage] = useState<UploadImages[]>([])

    //@lấy thông tin tên các hình
    const [getFileName, setGetFileName] = useState<string[]>([])

    //@useForm
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

    //@hàm upload sản phẩn
    const uploadProductFull = useMutation({
        mutationKey: ['upload-product-full'],
        mutationFn: (data: IFormDataProductFull) => ProductApi.uploadProductFull(data),
    })

    //@hàm submit sản phẩm
    const onSubmit = (data: TRegisterFormBook) => {
        setFormStateSubmit(true)
        console.log({ data })

        if (urlProductMultipleImage.length < 4) {
            dispatch(addToast({ type: 'WARNNING', message: 'Xin upload ít nhất 4 hình ảnh mô tả sản phẩm', id: Math.random().toString() }))
        }

        // chỉ submit khi có đủ image
        if (urlProductThumb.product_thumb_image.secure_url) {
            console.log({ urlProductThumb })

            const formData: IFormDataProductFull = new FormData()
            formData.append('_id ', urlProductThumb.product_id)

            formData.append('product_name', data.product_name)
            formData.append('product_price', data.product_price as number)
            formData.append('product_thumb_image_url', urlProductThumb.product_thumb_image.secure_url)
            formData.append('product_thumb_image_public_id', urlProductThumb.product_thumb_image.public_id)
            formData.append('publishing', data.publishing)
            formData.append('author', data.author)
            formData.append('page_number', data.page_number)
            formData.append('description', data.description)

            uploadProductFull.mutate(formData)
        }
    }

    return (
        <div className='animate-mountComponent w-full h-auto flex justify-center '>
            <div className=' w-[full] lg:w-[65%]  h-full'>
                <FormProvider {...methods}>
                    <form className='w-full lg:w-[60%]  flex flex-col gap-[24px] p-[16px]' onSubmit={methods.handleSubmit(onSubmit)}>
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
                            isSubmit={methods.formState.isSubmitted ? true : false}
                        />

                        <ButtonUploadMultiple
                            labelMessage='Chọn các hình description cho sản phẩm'
                            width={'xl:w-[100%]'}
                            setUrlProductMultipleImage={setUrlProductMultipleImage}
                            setGetFileName={setGetFileName}
                            product_id={urlProductThumb.product_id}
                            isSubmit={methods.formState.isSubmitted ? true : false}
                        />
                        <Book />

                        <button type='submit' className='min-w-[150px] px-[12px] py-[6px] bg-slate-700 text-white'>
                            Đăng bán
                        </button>
                    </form>
                </FormProvider>
            </div>

            <div className='hidden h-max min-w-[160px] w-auto lg:flex flex-col gap-[24px]  py-[24px] pl-[8px] pr-[24px] bg-bgTimeLine border-r-4 border-blue-300 rounded-lg'>
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
                <Timeline
                    TimeLineName='Các hình mô tả sản phẩm'
                    type='Files'
                    Files={{
                        FileName: getFileName || '',
                        CountFile: getFileName.length || 0,
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
