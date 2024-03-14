import React, { useEffect, useRef, useState } from 'react'
import ProductApi from '../../../apis/product.api'
import { useQuery } from '@tanstack/react-query'
import ProductSimplify from './ProductSimplify'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const ProductCare = () => {
      const wrapperListProductsRef = useRef<HTMLDivElement>(null)
      const PositionScrollCurrent = useRef<number>(0)
      const [limitShowProduct, setLimitShowProduct] = useState<number>(0)
      const [count, setCount] = useState(1)

      const allProduct = useQuery({
            queryKey: ['get-product-care'],
            queryFn: () => ProductApi.getAllProductCare(),
            staleTime: 1000 * 60 * 5,
      })

      const handleClickNext = () => {
            if (wrapperListProductsRef.current) {
                  setCount((prev) => prev + 1)
                  const width = wrapperListProductsRef.current.getBoundingClientRect().width
                  PositionScrollCurrent.current = PositionScrollCurrent.current - width
                  wrapperListProductsRef.current.style.transform = `translate3d(${PositionScrollCurrent.current}px, 0,0)`
                  wrapperListProductsRef.current.style.transition = `all 1s`
            }
      }

      const handleClickPrev = () => {
            if (wrapperListProductsRef.current) {
                  setCount((prev) => prev - 1)

                  const width = wrapperListProductsRef.current.getBoundingClientRect().width
                  PositionScrollCurrent.current = PositionScrollCurrent.current + width

                  // console.log(Math.trunc(width))
                  wrapperListProductsRef.current.style.transform = `translate3d(${PositionScrollCurrent.current}px, 0,0)`
                  wrapperListProductsRef.current.style.transition = `all 1s`
            }
      }

      useEffect(() => {
            if (allProduct.isSuccess) {
                  setLimitShowProduct(Math.ceil(allProduct.data.data.metadata.products.length / 6))
            }
      }, [allProduct.isSuccess])

      const styleEffect = {
            buttonPrev: count === 1 ? 'xl:hidden' : 'xl:flex',
            buttonNext: limitShowProduct === count ? 'xl:hidden' : 'xl:flex',
            disButtonPrev: count === 1 ? true : false,
            disButtonNext: limitShowProduct === count ? true : false,
      }

      const products = allProduct.data?.data.metadata.products

      return (
            <div className='relative flex-1 h-[298px] max-w-full px-0 xl:px-[18px]'>
                  <div className='max-w-full h-full overflow-hidden'>
                        <div
                              className='flex justify-between gap-[20px] xl:gap-[16px] w-[370px] xl:w-full  h-full overflow-x-scroll xl:overflow-visible '
                              ref={wrapperListProductsRef}
                        >
                              {products &&
                                    products.map((product) => (
                                          <div
                                                className='min-w-[calc((100%-30px)/3)] xl:min-w-[calc((100%-90px)/6)] h-full'
                                                key={product._id}
                                          >
                                                <ProductSimplify product={product} />
                                          </div>
                                    ))}

                              {allProduct.isPending && (
                                    <>
                                          {Array(6)
                                                .fill(0)
                                                ?.map((_, index) => (
                                                      <div
                                                            className='animate-pulse w-full h-full rounded-lg bg-slate-400'
                                                            key={index}
                                                      ></div>
                                                ))}
                                    </>
                              )}
                        </div>
                  </div>

                  <button
                        className={`${styleEffect.buttonPrev} hidden xl:flex  absolute top-[50%] left-[0px] translate-y-[-50%]  bg-[#ffffff]  rounded-full shadow-3xl`}
                        onClick={handleClickPrev}
                        disabled={styleEffect.disButtonPrev}
                  >
                        <ChevronLeft size={24} color='blue' />
                  </button>

                  <button
                        className={`${styleEffect.buttonNext} hidden xl:flex absolute top-[50%] right-[0px] translate-y-[-50%] bg-[#ffffff]  rounded-full shadow-3xl `}
                        onClick={handleClickNext}
                        disabled={styleEffect.disButtonNext}
                  >
                        <ChevronRight size={26} color='blue' />
                  </button>
            </div>
      )
}

export default ProductCare
