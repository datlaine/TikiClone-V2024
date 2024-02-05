import { useEffect, useState, useRef } from 'react'
import PositionIcon from '../../ui/BoxAbsolute'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import BoxCenter from '../../ui/BoxCenter'
import BoxIsBought from '../../ui/BoxIsBought'
import BoxAbsolute from '../../ui/BoxAbsolute'
import { AxiosResponse } from 'axios'
import { useQuery } from '@tanstack/react-query'
import ProductApi, { TProduct, TProductReturn } from '../../../apis/product.api'
import { Link } from 'react-router-dom'

type Props = {}

const SectionProductItem = (props: Props) => {
    const wrapperListProductsRef = useRef<HTMLDivElement>(null)
    const PositionScrollCurrent = useRef<number>(0)
    const [count, setCount] = useState(1)

    const allProduct = useQuery({
        queryKey: ['get-all-product'],
        queryFn: () => ProductApi.getAllProduct(),
        staleTime: 1000 * 60 * 5,
    })

    const handleClickNext = () => {
        if (wrapperListProductsRef.current) {
            setCount((prev) => prev + 1)
            const width = wrapperListProductsRef.current.getBoundingClientRect().width * -1
            // console.log(Math.trunc(width))
            PositionScrollCurrent.current = PositionScrollCurrent.current - width * -1
            wrapperListProductsRef.current.style.transform = `translate3d(${PositionScrollCurrent.current}px, 0,0)`
            wrapperListProductsRef.current.style.transition = `all 2s`
        }
    }

    const handleClickPrev = () => {
        if (wrapperListProductsRef.current) {
            setCount((prev) => prev - 1)

            const width = wrapperListProductsRef.current.getBoundingClientRect().width
            PositionScrollCurrent.current = PositionScrollCurrent.current + width

            // console.log(Math.trunc(width))
            wrapperListProductsRef.current.style.transform = `translate3d(${PositionScrollCurrent.current}px, 0,0)`
            wrapperListProductsRef.current.style.transition = `all 2s`
        }
    }

    if (allProduct.isSuccess) {
        console.log({ allProduct: allProduct.data.data.metadata.products })
    }

    return (
        <div className='h-[75%]  relative  overflow-x-scroll lg:overflow-x-hidden  lg:pl-[15px]'>
            <div ref={wrapperListProductsRef} className=' h-full gap-5 flex    lg:pl-[-12px] lg:flex '>
                {allProduct.isSuccess &&
                    allProduct?.data?.data?.metadata.products.map((product: TProductReturn) => {
                        return (
                            <Link
                                to={`/buy/${product._id}`}
                                className='flex flex-col min-w-[20%] overflow-hidden lg:min-w-[15%] h-full relative rounded-tl-[8px]'
                                key={product._id}
                            >
                                {/* {item.discount && (
                                    <PositionIcon
                                        Icon={
                                            <span className=' bg-[red] rounded-[8px] text-red-200 inline-flex justify-center items-center w-[50px] h-[50px] lg:w-[38px] lg:h-[38px]'>
                                                {item.discount}
                                            </span>
                                        }
                                        Mode={{ mode: 'NORMAL', Corner: { top: 0, bottom: 0, left: 0, right: 0 } }}
                                    />
                                )} */}

                                <img src={product.product_thumb_image.secure_url} className=' w-[175px] h-[175px] 2xl:relative' alt='' />

                                <div className='2xl:w-full 2xl:mt-[5px] h-[75px]'>
                                    <BoxCenter
                                        content={product.product_price}
                                        ClassName='h-[50%] text-[red] 2xl:font-bold text-[12px] 2xl:text-[16px]'
                                    />
                                    {/* <BoxIsBought Quantity={item.isBought} ClassName='w-full h-[50%]' /> */}
                                </div>
                            </Link>
                        )
                    })}
            </div>

            <BoxAbsolute
                Icon={<ChevronLeft size={40} />}
                Mode={{ mode: 'CENTER', CornerCenter: 'TOP', CornerRemaining: { left: 0 } }}
                ClassName={`hidden w-[40px] bg-white rounded-[999px]  shadow-lg  hover:lg-!scale-125 ${
                    count === 1 ? 'hidden' : 'lg:flex justify-center items-center'
                }`}
                zIndex={21}
                onClick={handleClickPrev}
            />
            {/* <BoxAbsolute
                Icon={<ChevronRight size={40} />}
                Mode={{ mode: 'CENTER', CornerCenter: 'TOP', CornerRemaining: { right: 0 } }}
                ClassName={`hidden lg:flex justify-center items-center w-[40px] bg-white rounded-[999px]  shadow-2xl ${
                    count >= (data ? data.data.length / 6 : 0) ? 'lg:hidden' : 'lg:flex lg:justify-center lg:items-center'
                }`}
                zIndex={21}
                onClick={handleClickNext}
            /> */}
        </div>
    )
}

export default SectionProductItem
