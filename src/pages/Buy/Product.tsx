import { useQuery } from '@tanstack/react-query'
import React, { useEffect, useRef, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import ProductApi from '../../apis/product.api'
import { ChevronsRight } from 'lucide-react'
import BoxImage from './BoxImage'

export type TImage = {
    secure_url: string
}

const Product = () => {
    const param = useParams()
    const { id } = param
    const image = useRef<HTMLImageElement | null>(null)
    const [imageActive, setImageActive] = useState<string>('')
    const [imageArray, setImageArray] = useState<TImage[]>([])
    const [openModal, setOpenModal] = useState<boolean>(false)

    const getProductWithId = useQuery({
        queryKey: ['get-product-with-id', id],
        queryFn: () => ProductApi.getProductWithId({ id: id as string }),
    })

    const handleMouseEnter = (secure_url: string) => {
        if (image.current) {
            image.current.src = secure_url
        }
    }

    const handleMouseLeave = () => {
        if (image.current) {
            image.current.src = imageActive
        }
    }

    const handleClickImage = (secure_url: string) => {
        setImageActive(secure_url)
    }

    const handleOpenModal = () => {
        setOpenModal(true)
    }

    const product = getProductWithId.isSuccess ? getProductWithId!.data!.data!.metadata.product : undefined

    useEffect(() => {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth',
        })
    }, [])

    useEffect(() => {
        if (getProductWithId.isSuccess) {
            const { product } = getProductWithId.data.data.metadata
            setImageActive(product?.product_thumb_image.secure_url as string)
            product?.product_desc_image.unshift(product.product_thumb_image)
            setImageArray(
                product?.product_desc_image.map((img) => {
                    return { secure_url: img.secure_url }
                }) as TImage[],
            )
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [getProductWithId.isSuccess])

    console.log({ imageArray })

    const styleEffect = {
        isActive: 'border-[5px] border-black-700',
    }

    return (
        <div className='flex flex-col w-full'>
            <div className='px-[30px] w-full flex flex-col gap-[4px] '>
                {getProductWithId.data?.data && (
                    <div className='flex gap-[4px] mb-[10px]'>
                        <Link to='/'>Trang chủ</Link>
                        <ChevronsRight size={16} color='black' />
                        {/* <Link to={'/product/:type'}>{getProductWithId.data.data.metadata.product.}</Link> */}
                    </div>
                )}

                {getProductWithId.isSuccess && (
                    <div className='flex gap-[24px]'>
                        <div className='basis-[70%] flex flex-col gap-[24px]'>
                            <div className='top w-full flex gap-[24px]'>
                                <div className='basis-[40%] sticky top-[16px] bg-blue-500 h-[700px] flex flex-col gap-[16px]'>
                                    <div className='basis-[45%]'>
                                        <img
                                            src={product!.product_thumb_image.secure_url}
                                            className='w-full h-full max-w-full min-h-[400px] max-h-[400px] transition-all duration-700'
                                            alt='product'
                                            ref={image}
                                            onClick={handleOpenModal}
                                        />
                                    </div>
                                    <div className='flex gap-[8px]'>
                                        {product!.product_desc_image.map((image) => (
                                            <img
                                                src={image.secure_url}
                                                className={`${
                                                    imageActive === image.secure_url ? styleEffect.isActive : ''
                                                } w-[60px] h-[60px]`}
                                                alt='product_sub'
                                                key={image.public_id}
                                                onMouseLeave={handleMouseLeave}
                                                onMouseEnter={() => handleMouseEnter(image.secure_url)}
                                                onClick={() => handleClickImage(image.secure_url as string)}
                                            />
                                        ))}
                                    </div>
                                </div>
                                <div className='basis-[60%] bg-orange-500 h-[2000px]'></div>
                            </div>
                            <div className='comment w-full h-[1000px] bg-yellow-500'></div>
                        </div>
                        <div className='basis-[30%] sticky top-[16px] h-[300px] bg-red-700'></div>
                    </div>
                )}
            </div>
            <div className='bg-black h-[4000px] w-full'></div>

            {openModal && <BoxImage setOpenModal={setOpenModal} secure_url={imageArray} imageActive={imageActive} />}
        </div>
    )
}

export default Product
