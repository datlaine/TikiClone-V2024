import React, { SetStateAction, useEffect, useRef, useState } from 'react'
import Portal from '../../component/Portal'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import { TImage } from './Product'

type TProps = {
    secure_url: TImage[]
    setOpenModal: React.Dispatch<SetStateAction<boolean>>
    imageActive: string
}

const BoxImage = (props: TProps) => {
    const { setOpenModal, secure_url, imageActive } = props

    const wrapperRef = useRef<HTMLDivElement>(null)
    const [posImage, setPosImage] = useState<number>(1)
    const widthAfter = useRef<number>(0)

    const handleHideModal = () => {
        setOpenModal(false)
    }

    const handleNext = () => {
        if (wrapperRef.current) {
            const width = wrapperRef.current.getBoundingClientRect().width
            wrapperRef.current.style.transform = `translate3d(${-width + widthAfter.current}px,0px,0px)`
            widthAfter.current = -width + widthAfter.current
            console.log({ width: widthAfter.current })
            wrapperRef.current.style.transition = 'all .5s'
            setPosImage((prev) => (prev += 1))
        }
    }

    const handlePrev = () => {
        if (wrapperRef.current) {
            const width = wrapperRef.current.getBoundingClientRect().width
            wrapperRef.current.style.transform = `translate3d(${width + widthAfter.current}px, 0px,0px)`
            widthAfter.current = width + widthAfter.current

            wrapperRef.current.style.transition = 'all .5s'
            setPosImage((prev) => (prev -= 1))
        }
    }

    //cho grandfather overflox hidden, parent thi khong

    const styleEffect = {
        buttonPrev: posImage === 1 ? 'text-gray-500 border-gray-500' : 'text-white border-white-400',
        buttonNext: posImage === secure_url.length ? 'text-gray-500 border-gray-500' : 'text-white border-white-400',
    }

    useEffect(() => {
        // const numberActive = secure_url.map((image, index) => )
    }, [])

    return (
        <Portal>
            <div className='fixed inset-0 bg-[rgba(0,0,0,.93)] flex flex-col'>
                <div className='relative w-full h-[70%] mt-[24px]'>
                    <div className='w-full h-full flex justify-center items-center'>
                        <div className='w-[540px] h-[540px] overflow-x-hidden'>
                            <div className='w-[540px] h-[540px] flex    ' ref={wrapperRef}>
                                {secure_url.map((image) => (
                                    <img
                                        className='w-full h-full min-w-full max-w-full'
                                        src={image.secure_url}
                                        alt='product'
                                        key={image.secure_url}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>

                    <button
                        className={`${styleEffect.buttonPrev} absolute top-[50%] translate-y-[-50%] left-[250px] flex flex-col items-center gap-[8px] text-gray-500`}
                        disabled={posImage === 1}
                        onClick={handlePrev}
                    >
                        <div
                            className={`${styleEffect.buttonPrev} w-[60px]  h-[60px] bg-transparent border-[1px] border-gray-500 rounded-full flex flex-col gap-[4px] justify-center items-center `}
                        >
                            <ChevronLeft size={60} className='font-bold' />
                        </div>
                        <span>Xem ảnh trước</span>
                    </button>
                    <button
                        className={`${styleEffect.buttonNext} absolute top-[50%] translate-y-[-50%] right-[250px] flex flex-col items-center gap-[8px] `}
                        disabled={posImage === secure_url.length}
                        onClick={handleNext}
                    >
                        <div
                            className={`${styleEffect.buttonNext} w-[60px]  h-[60px] bg-transparent border-[1px]  rounded-full flex flex-col gap-[4px] justify-center items-center `}
                        >
                            <ChevronRight size={60} className='font-bold' />
                        </div>
                        <span>Xem ảnh sau</span>
                    </button>
                    <div
                        className='absolute top-[12px] right-[40px] flex flex-col gap-[4px] text-white items-center'
                        onClick={handleHideModal}
                    >
                        <X color='white' size={30} />
                        <span className='text-[16px]'>Đóng</span>
                    </div>
                </div>
            </div>
        </Portal>
    )
}

export default BoxImage
