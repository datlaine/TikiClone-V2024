import { BookOpenText, Hotel, NotepadText, Pen, Store } from 'lucide-react'
import React, { useEffect, useRef, useState } from 'react'
import { TProductDetail, TProductFull } from '../../types/product.type'
import { TImage } from './Product'
import BoxModalImage from './BoxModalImage'

type TProps = {
    product: TProductDetail
    isSuccess: boolean
}

const ProductDetail = (props: TProps) => {
    const { product, isSuccess } = props

    const image = useRef<HTMLImageElement | null>(null)
    const [imageActive, setImageActive] = useState<string>('')
    const [imageArray, setImageArray] = useState<TImage[]>([])
    const [openModal, setOpenModal] = useState<boolean>(false)

    const handleMouseEnter = (secure_url: string) => {
        if (image.current) {
            image.current.src = secure_url
            image.current.style.transition = 'all 2s'
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

    console.log({ product })

    useEffect(() => {
        if (isSuccess) {
            setImageActive(product?.product_thumb_image.secure_url as string)
            product?.product_desc_image.unshift(product.product_thumb_image)
            setImageArray(
                product?.product_desc_image.map((img) => {
                    return { secure_url: img.secure_url }
                }) as TImage[],
            )
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isSuccess])

    const styleEffect = {
        isActive: 'border-[5px] border-blue-900',
    }

    return (
        <React.Fragment>
            <div className='basis-[20%] md:basis-[35%] rounded-lg'>
                <img
                    src={product!.product_thumb_image.secure_url}
                    className='cursor-pointer p-[8px] w-full h-full max-w-full min-h-[200px] max-h-[200px] sm:min-h-[350px] sm:max-h-[350px] transition-all duration-700 rounded-lg'
                    alt='product'
                    ref={image}
                    onClick={handleOpenModal}
                />
            </div>
            <div className='flex gap-[8px] flex-wrap md:flex-nowrap rounded-lg'>
                {product!.product_desc_image.map((image) => (
                    <img
                        src={image.secure_url}
                        className={`${
                            imageActive === image.secure_url ? styleEffect.isActive : 'border-[5px] border-transparent'
                        } h-[100px] w-[100px] md:w-[60px] md:h-[60px] rounded-lg`}
                        alt='product_sub'
                        key={image.public_id}
                        onMouseLeave={handleMouseLeave}
                        onMouseEnter={() => handleMouseEnter(image.secure_url)}
                        onClick={() => handleClickImage(image.secure_url as string)}
                    />
                ))}
            </div>
            <div className='flex-1 flex flex-col gap-[16px] mt-[16px] '>
                <h3>Đặc điểm nổi bật</h3>

                <div className='px-[16px] flex gap-[8px] items-center'>
                    <div className='w-[32px] h-[32px] rounded-full bg-blue-700 flex items-center justify-center'>
                        <Store color='white' size={20} />
                    </div>
                    <span>Shops: {product?.shop_id.shop_name}</span>
                </div>
                <div className='px-[16px] flex gap-[8px] items-center'>
                    <div className='w-[32px] h-[32px] rounded-full bg-blue-700 flex items-center justify-center'>
                        <Pen color='white' size={20} />
                    </div>
                    <span>Tác giả: {product?.attribute.author}</span>
                </div>

                <div className='px-[16px] flex gap-[8px] items-center'>
                    <div className='w-[32px] h-[32px] rounded-full bg-blue-700 flex items-center justify-center'>
                        <Hotel color='white' size={20} />
                    </div>
                    <span>Nhà xuất bản: {product?.attribute.publishing}</span>
                </div>

                <div className='px-[16px] flex gap-[8px] items-center'>
                    <div className='w-[32px] h-[32px] rounded-full bg-blue-700 flex items-center justify-center'>
                        <BookOpenText color='white' size={20} />
                    </div>
                    <span>Số trang sách: {product?.attribute.page_number}</span>
                </div>
            </div>
            {openModal && <BoxModalImage setOpenModal={setOpenModal} secure_url={imageArray} imageActive={imageActive} />}
        </React.Fragment>
    )
}

export default ProductDetail
