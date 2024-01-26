import { useMutation } from '@tanstack/react-query'
import React, { SetStateAction, useEffect, useId, useRef, useState } from 'react'
import ProductApi, { IFormDataImage } from '../../../../apis/product.api'
interface IProps {
    labelMessage: string
    width?: string
    setUrlProductThumb: React.Dispatch<SetStateAction<{ product_id: string; product_thumb_image: string }>>
}

const ButtonUpload = (props: IProps) => {
    const { width, labelMessage, setUrlProductThumb } = props
    const id = useId()
    const inputRef = useRef<HTMLInputElement | null>(null)
    const [fileProduct, setFileProduct] = useState<File>()
    const [filePreview, setFilePreview] = useState<string | undefined>()

    const uploadProductThumb = useMutation({
        mutationKey: ['product-thumb'],
        mutationFn: (data: IFormDataImage) => ProductApi.uploadProductThumb(data),
    })

    //@handler
    const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.stopPropagation()
        e.preventDefault()
        if (inputRef.current) {
            inputRef.current.click()
        }
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (filePreview || fileProduct) {
            setFilePreview(undefined)
            setFileProduct(undefined)
        }
        if (e.target.files) {
            setFileProduct(e.target.files[0])
        }
    }

    useEffect(() => {
        if (!fileProduct) {
            setFilePreview('')
            return
        }
        if (fileProduct) {
            const formData = new FormData()
            formData.append('image', fileProduct)
            uploadProductThumb.mutate(formData)
        }
        const url = URL.createObjectURL(fileProduct)
        setFilePreview(url)
        return () => URL.revokeObjectURL(url)
    }, [fileProduct])

    //@effect-api

    useEffect(() => {
        if (uploadProductThumb.isSuccess) {
            if (uploadProductThumb.data.data.metadata.product_thumb_image) {
                console.log({ url: uploadProductThumb.data.data.metadata.product_thumb_image })

                setUrlProductThumb({
                    product_id: uploadProductThumb.data.data.metadata.product_thumb_image.product_id,
                    product_thumb_image: uploadProductThumb.data.data.metadata.product_thumb_image.product_thumb_image,
                })
            }
        }
    }, [uploadProductThumb.isSuccess, setUrlProductThumb, uploadProductThumb.data?.data.metadata.product_thumb_image])

    return (
        <div className={`${width ? width : 'w-full'} min-h-[60px] h-auto flex flex-col gap-[5]`}>
            <label htmlFor={id}>{labelMessage}</label>
            <input type='file' id={id} hidden ref={inputRef} onChange={(e) => handleInputChange(e)} />
            <button className={` h-full text-white bg-slate-900 rounded-md`} onClick={(e) => handleButtonClick(e)}>
                Upload
            </button>

            {filePreview && <img src={filePreview} width={150} height={150} alt='preview' />}
        </div>
    )
}

export default ButtonUpload
