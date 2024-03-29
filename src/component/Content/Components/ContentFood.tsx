import React, { useRef, useState } from 'react'
import { TypeFood } from '../../../types/product/product.type'
import { useQuery } from '@tanstack/react-query'
import ProductApi from '../../../apis/product.api'
import ProductSmall from './ProductSmall'
import { ChevronLeft, ChevronRight } from 'lucide-react'

export const CATEGORY_FOOD = [
      {
            label: 'Tất cả sản phẩm',
            value: 'All',
      },

      {
            label: 'Thức ăn nhanh',
            value: 'Fast food',
      },
      {
            label: 'Đồ hộp',
            value: 'Canned Goods',
      },

      {
            label: 'Đồ giải khát',
            value: 'Drinks',
      },
]

export type TypeFilterFood = 'All' | TypeFood

const ContentFood = () => {
      const getProductFoodAllType = useQuery({
            queryKey: ['/v1/api/product/get-product-food-all-type'],
            queryFn: () => ProductApi.getProductFoodAllType(),
      })

      const wrapperListProductsRef = useRef<HTMLDivElement>(null)
      const PositionScrollCurrent = useRef<number>(0)
      const [count, setCount] = useState(1)
      const [type, setType] = useState<TypeFilterFood>('All')

      const productAll = getProductFoodAllType.data?.data.metadata.products
      const productFastFood = getProductFoodAllType.data?.data.metadata.fastFood
      const productCannedGood = getProductFoodAllType.data?.data.metadata.cannedGood
      const productDrink = getProductFoodAllType.data?.data.metadata.drinks
      const COUNT_SKELETON = window.innerWidth >= 1024 ? 6 : 3

      console.log({ productFastFood })
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

      const styleEffect = {
            buttonPrev: count === 1 ? 'xl:hidden' : 'xl:flex',

            disButtonPrev: count === 1 ? true : false,
            disButtonNext: 2 === count ? true : false,
            onHidden: (length: number) => (length === count ? 'xl:hidden' : 'xl:flex'),

            onDisable: (length: number) => (length === count ? true : false),

            onActive: (isActive: boolean) => {
                  if (isActive) return 'bg-blue-50 border-blue-600 text-blue-600'

                  return 'bg-transparent border-gray-400 text-slate-600'
            },
      }

      const calcLength = (type: TypeFilterFood) => {
            switch (type) {
                  case 'All':
                        return Math.ceil((productAll?.length || 6) / 6)
                  case 'Fast food':
                        return Math.ceil((productFastFood?.length || 6) / 6)
                  case 'Canned Goods':
                        return Math.ceil((productCannedGood?.length || 6) / 6)
                  case 'Drinks':
                        return Math.ceil((productDrink?.length || 6) / 6)
                  default:
                        return 1
            }
      }

      return (
            <div className='max-w-full w-full h-[485px] bg-[#ffffff] rounded-lg p-[20px] flex flex-col gap-[16px]'>
                  <h3>ContentFood {type}</h3>

                  <div className='overflow-hidden'>
                        <div className='h-[40px] max-w-full flex gap-[20px] overflow-scroll'>
                              {CATEGORY_FOOD.map((btn) => (
                                    <button
                                          key={btn.label}
                                          className={`${styleEffect.onActive(btn.value === type)} min-w-[150px] max-w-full rounded-[999px]`}
                                          onClick={() => setType(btn.value as TypeFilterFood)}
                                    >
                                          {btn.label}
                                    </button>
                              ))}
                        </div>
                  </div>

                  <div className='relative w-full h-[75%] overflow-hidden'>
                        <div
                              className='h-full max-w-full flex gap-[20px] overflow-scroll xl:overflow-visible '
                              ref={wrapperListProductsRef}
                        >
                              {type === 'All' &&
                                    productAll?.map((product) => (
                                          <div className='h-full min-w-[calc((100%-40px)/2)] w-[calc((100%-40px)/2)] sm:min-w-[calc((100%-40px)/4)] xl:w-[calc((100%-120px)/6)] xl:min-w-[calc((100%-120px)/6)]'>
                                                <ProductSmall key={product._id} product={product} />
                                          </div>
                                    ))}

                              {type === 'Fast food' &&
                                    productFastFood?.map((product) => (
                                          <div className='h-full min-w-[calc((100%-120px)/2)] xl:min-w-[calc((100%-120px)/6)] sm:min-w-[calc((100%-40px)/4)] w-[calc((100%-40px)/2)] xl:w-[calc((100%-120px)/6)]'>
                                                <ProductSmall key={product._id} product={product} />
                                          </div>
                                    ))}

                              {type === 'Canned Goods' &&
                                    productCannedGood?.map((product) => (
                                          <div className='h-full min-w-[calc((100%-120px)/2)] xl:min-w-[calc((100%-120px)/6)] sm:min-w-[calc((100%-40px)/4)] w-[calc((100%-40px)/2)] xl:w-[calc((100%-120px)/6)]'>
                                                <ProductSmall key={product._id} product={product} />
                                          </div>
                                    ))}

                              {type === 'Drinks' &&
                                    productDrink?.map((product) => (
                                          <div className='h-full min-w-[calc((100%-120px)/2)] xl:min-w-[calc((100%-120px)/6)] sm:min-w-[calc((100%-40px)/4)] w-[calc((100%-40px)/2)] xl:w-[calc((100%-120px)/6)]'>
                                                <ProductSmall key={product._id} product={product} />
                                          </div>
                                    ))}

                              {getProductFoodAllType.isPending && (
                                    <>
                                          {Array(COUNT_SKELETON)
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

                        <button
                              className={`${styleEffect.buttonPrev} hidden xl:flex  absolute top-[50%] left-[0px] translate-y-[-50%]  bg-[#ffffff]  rounded-full shadow-3xl`}
                              onClick={handleClickPrev}
                              disabled={styleEffect.disButtonPrev}
                        >
                              <ChevronLeft size={24} color='blue' />
                        </button>

                        <button
                              className={`${styleEffect.onHidden(
                                    calcLength(type) || 0,
                              )} hidden xl:flex absolute top-[50%] right-[0px] translate-y-[-50%] bg-[#ffffff]  rounded-full shadow-3xl `}
                              onClick={handleClickNext}
                              disabled={styleEffect.onDisable(calcLength(type) || 0)}
                        >
                              <ChevronRight size={26} color='blue' />
                        </button>
                  </div>

                  {getProductFoodAllType && !getProductFoodAllType.data?.data.metadata && (
                        <div className='w-full h-full flex items-center justify-center text-[20px] font-semibold text-slate-700 bg-[#ffffff] rounded-lg'>
                              Không có thông tin các sản phẩm
                        </div>
                  )}
            </div>
      )
}

export default ContentFood
