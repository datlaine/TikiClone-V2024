import { useMutation } from '@tanstack/react-query'
import React, { SetStateAction, useEffect, useId, useRef, useState } from 'react'
import ProductApi, { IFormDataImage } from '../../../apis/product.api'
import { View, X } from 'lucide-react'
import BoxModal from '../../../component/ui/BoxModal'
interface IProps {
    labelMessage: string
    width?: string
    setUrlProductThumb: React.Dispatch<
        SetStateAction<{
            product_id: string
            product_thumb_image: { secure_url: string; public_id: string }
            FileName: string
            FileLength: number
        }>
    >
    setFormStateSubmit: React.Dispatch<SetStateAction<boolean>>
}

const ButtonUpload = (props: IProps) => {
    const { width, labelMessage, setUrlProductThumb, setFormStateSubmit } = props
    const id = useId()
    const inputRef = useRef<HTMLInputElement>(null)

    const [fileProduct, setFileProduct] = useState<File>()
    const [filePreview, setFilePreview] = useState<string | undefined>()
    const [modalFilePreview, setModalFilePreview] = useState(false)

    const uploadProductThumb = useMutation({
        mutationKey: ['product-thumb'],
        mutationFn: (data: IFormDataImage) => ProductApi.uploadProductThumb(data),
    })

    const deleteProductThumb = useMutation({
        mutationKey: ['delete-product-thumb'],
        mutationFn: ({ public_id, id }: { public_id: string; id: string }) => ProductApi.deleteProductThumb({ public_id, id }),
    })

    //@handler
    const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.stopPropagation()
        e.preventDefault()
        if (inputRef.current) {
            inputRef.current.click()
        }
        // setFormStateSubmit(false)
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (filePreview || fileProduct) {
            setFilePreview(undefined)
            setFileProduct(undefined)
            setUrlProductThumb({
                product_id: '',
                product_thumb_image: { secure_url: '', public_id: '' },
                FileName: '',
                FileLength: 0,
            })
        }
        if (e.target.files) {
            console.log({ file: e.target.files })
            setFileProduct(e.target.files[0])
        }
    }

    const handleDeleteProductThumb = (public_id: string) => {
        deleteProductThumb.mutate({ public_id, id: uploadProductThumb?.data?.data?.metadata?.product?.product_id as string })
        URL.revokeObjectURL(filePreview as string)
        setFilePreview('')
        if (inputRef) {
            inputRef!.current!.value = ''
        }

        setUrlProductThumb({
            product_id: '',
            product_thumb_image: { secure_url: '', public_id: '' },
            FileName: '',
            FileLength: 0,
        })
    }

    useEffect(() => {
        console.log({ ref: inputRef.current?.value })
        console.log({ filePreview })
    }, [filePreview])

    useEffect(() => {
        if (!fileProduct) {
            setFilePreview('')
            return
        }
        if (fileProduct) {
            const formData = new FormData()
            formData.append('image', fileProduct)
            formData.append('product_id', uploadProductThumb.data?.data.metadata.product.product_id as string)

            uploadProductThumb.mutate(formData)
        }
        const url = URL.createObjectURL(fileProduct)
        setFilePreview(url)
        return () => URL.revokeObjectURL(url)
    }, [fileProduct])

    //@effect-api

    useEffect(() => {
        if (uploadProductThumb.isSuccess) {
            const { metadata } = uploadProductThumb.data.data
            if (metadata.product.product_thumb_image) {
                console.log({ url: filePreview })

                setUrlProductThumb({
                    product_id: metadata.product.product_id,
                    product_thumb_image: {
                        secure_url: metadata.product.product_thumb_image.secure_url,
                        public_id: metadata.product.product_thumb_image.public_id,
                    },
                    FileLength: fileProduct ? 1 : 0,
                    FileName: fileProduct?.name.replace(/.*[\/\\]/, '') as string,
                })
            }
        }
    }, [
        uploadProductThumb.isSuccess,
        setUrlProductThumb,
        uploadProductThumb.data?.data,
        uploadProductThumb.data?.data.metadata.product.product_thumb_image,
        uploadProductThumb.data?.data.metadata.product.product_id,
        fileProduct?.name,
    ])

    return (
        <div className={`w-full min-h-[70px] h-auto flex flex-col gap-[8px]`}>
            <label htmlFor={id}>{labelMessage}</label>
            <input type='file' id={id} hidden ref={inputRef} onChange={(e) => handleInputChange(e)} />
            <button
                hidden={filePreview ? true : false}
                disabled={uploadProductThumb.isPending}
                className={`${uploadProductThumb.isPending ? 'cursor-not-allowed' : 'cursor-pointer'} 
${width ? 'w-[25%]' : 'w-full'}
flex-1 text-white bg-slate-900 rounded-md`}
                onClick={(e) => handleButtonClick(e)}
            >
                Upload
            </button>

            {filePreview && (
                <div className='w-[150px]  relative flex justify-center items-center'>
                    {/* <div className='w-[150px] h-[150px] bg-green-600'></div> */}
                    <img
                        src={filePreview}
                        width={150}
                        height={150}
                        alt='preview'
                        className={`bg-yellow-700 ${uploadProductThumb.isPending ? 'opacity-70' : 'opacity-100'}`}
                    />
                    <div className='absolute top-0 right-[-100px] h-[35px] w-[95px] '>
                        <button
                            disabled={uploadProductThumb.isPending}
                            onClick={() => {
                                handleDeleteProductThumb(
                                    uploadProductThumb.data?.data.metadata.product.product_thumb_image.public_id as string,
                                )
                                inputRef.current?.click()
                            }}
                            className='px-[12px] py-[6px] bg-slate-700 text-white rounded-md '
                        >
                            Chon lai
                        </button>
                    </div>
                    <div className='absolute bottom-[0px] right-[-40px] bg-white h-[35px] w-[35px] flex items-center justify-center rounded-full'>
                        <View onClick={() => setModalFilePreview(true)} size={28} className=' ' />
                    </div>
                    {uploadProductThumb.isPending && (
                        <div className='absolute'>
                            <span
                                className='inline-block h-[45px] w-[45px] text-slate-500 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]'
                                role='status'
                            ></span>
                        </div>
                    )}
                    {modalFilePreview && (
                        <BoxModal>
                            {/* <div className='w-[150px] h-[150px] bg-green-600'></div> */}

                            <div className='relative w-[450px] h-[350px]'>
                                <img src={filePreview} alt='preview' className='w-full h-full bg-yellow-700' />
                                <div
                                    className='absolute top-[-10px] right-[-10px] bg-slate-900 flex items-center justify-center rounded-md'
                                    onClick={() => setModalFilePreview(false)}
                                >
                                    <X color='white' size={40} />
                                </div>
                            </div>
                        </BoxModal>
                    )}
                </div>
            )}
        </div>
    )
}

export default ButtonUpload
