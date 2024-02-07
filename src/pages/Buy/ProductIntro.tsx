import { BoxSelect, CaravanIcon, Check } from 'lucide-react'
import React, { useEffect, useRef, useState } from 'react'
import { TProductFull } from '../../types/product.type'
import BoxSelectAdrees from '../../component/ui/BoxSelectAdrees'

type TProps = { product: TProductFull }

const ProductIntro = (props: TProps) => {
    const { product } = props
    const [openModal, setOpenModal] = useState<boolean>(false)
    const [readMore, setReadMore] = useState<boolean>(false)
    const descriptionRef = useRef<HTMLParagraphElement>(null)

    const handleOpenModal = () => {
        setOpenModal(true)
    }

    useEffect(() => {
        if (product!.attribute.description.length > 10) {
            setReadMore(true)
        }
    }, [])

    console.log({ length: product?.attribute.description.length })

    return (
        <div className='flex flex-col gap-[16px]'>
            <section className='bg-white w-full min-h-[160px] h-auto p-[12px] rounded-lg'>
                <div className='flex flex-col gap-[8px]'>
                    <header>
                        <div className='flex gap-[12px] '>
                            <div className='flex bg-blue-100 rounded-xl text-[10px] px-[4px] items-center gap-[4px]'>
                                <div className='bg-blue-700 w-[12px] h-[12px] rounded-full flex items-center justify-center'>
                                    <Check color='white' size={12} />
                                </div>
                                <span className='uppercase text-blue-900 font-black'>Chính hãng</span>
                            </div>
                            <p>
                                <span>Tác giả: </span>
                                <span className='text-blue-700'>{product?.attribute.author}</span>
                            </p>
                        </div>
                    </header>
                    <p className='text-[18px] text-black font-semibold'>{product?.product_name}</p>
                    <div className=' h-[26px]'>Votes</div>
                    <p className='text-[24px] text-black font-bold'>
                        {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(product?.product_price as number)}
                    </p>
                </div>
            </section>

            <section className='bg-white w-full min-h-[160px] h-auto p-[12px] rounded-lg'>
                <div className='flex flex-col gap-[8px]'>
                    <p className='[word-spacing:1px] text-[16px] text-black font-semibold word'>Thông tin vận chuyển</p>
                    <div className=' h-[26px] w-full flex justify-between'>
                        <span>Giao đến ...</span>
                        <button className='text-blue-600' onClick={handleOpenModal}>
                            Đổi
                        </button>
                    </div>
                    <div className='flex gap-[4px] text-[14px] items-center mt-[16px]'>
                        <CaravanIcon color='gray' />
                        <span>Giao vào thứ năm</span>
                    </div>
                    <p className='text-[14px]'>
                        Trước 19h, 15/02: <span className='text-green-500'>Miễn phí</span>
                    </p>
                </div>
            </section>

            <section className='bg-white w-full min-h-[160px] h-max p-[12px]'>
                <header>
                    <p className='text-[18px] text-black font-semibold'>Mô tả sản phẩm</p>
                </header>
                <p
                    className={`${readMore ? 'h-[200px]' : 'h-max'} overflow-y-hidden text-justify mt-[10px] leading-7`}
                    ref={descriptionRef}
                >
                    {product?.attribute.description}
                </p>

                {product!.attribute.description.length > 200 && (
                    <div className='w-full flex justify-center'>
                        <button onClick={() => setReadMore((prev) => !prev)}>{readMore ? 'Xem thêm' : 'Thu gọn'}</button>
                    </div>
                )}
            </section>

            {openModal && <BoxSelectAdrees setOpenModal={setOpenModal} />}
        </div>
    )
}

export default ProductIntro
