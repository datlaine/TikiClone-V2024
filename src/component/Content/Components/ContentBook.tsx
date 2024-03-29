import React, { ReactNode, useRef, useState } from 'react'
import { ProductType, TypeBook } from '../../../types/product/product.type'
import { useQuery } from '@tanstack/react-query'
import ProductApi from '../../../apis/product.api'
import ProductSmall from './ProductSmall'
import { ChevronLeft, ChevronRight } from 'lucide-react'

export const CATEGORY_BOOK = [
      {
            label: 'Tất cả sản phẩm',
            value: 'All',
      },

      {
            label: 'Manga',
            value: 'Manga',
      },
      {
            label: 'Tiểu thuyết',
            value: 'Novel',
      },

      {
            label: 'Trinh thám',
            value: 'Detective',
      },
]

export type TypeFilterBook = 'All' | TypeBook

const ContentBook = () => {
      const getProductBookAllType = useQuery({
            queryKey: ['/v1/api/product/get-product-book-all-type'],
            queryFn: () => ProductApi.getProductBookAllType(),
      })

      const wrapperListProductsRef = useRef<HTMLDivElement>(null)
      const PositionScrollCurrent = useRef<number>(0)
      const [count, setCount] = useState(1)
      const [type, setType] = useState<TypeFilterBook>('All')

      const productAll = getProductBookAllType.data?.data.metadata.products
      const productManga = getProductBookAllType.data?.data.metadata.manga
      const productNovel = getProductBookAllType.data?.data.metadata.novel
      const productDectective = getProductBookAllType.data?.data.metadata.detective
      const COUNT_SKELETON = window.innerWidth >= 1024 ? 6 : 3

      // console.log({ productManga })
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

      const calcLength = (type: TypeFilterBook) => {
            switch (type) {
                  case 'All':
                        return Math.ceil((productAll?.length || 6) / 6)
                  case 'Manga':
                        return Math.ceil((productManga?.length || 6) / 6)
                  case 'Novel':
                        return Math.ceil((productNovel?.length || 6) / 6)
                  case 'Detective':
                        return Math.ceil((productDectective?.length || 6) / 6)
                  default:
                        return 1
            }
      }

      return (
            <div className='max-w-full w-full h-[485px] bg-[#ffffff] rounded-lg p-[20px] flex flex-col gap-[16px]'>
                  <h3>ContentBook {type}</h3>

                  <div className='overflow-hidden'>
                        <div className='h-[40px] max-w-full flex gap-[20px] overflow-scroll'>
                              {CATEGORY_BOOK.map((btn) => (
                                    <button
                                          key={btn.label}
                                          className={`${styleEffect.onActive(btn.value === type)} min-w-[150px] max-w-full rounded-[999px]`}
                                          onClick={() => setType(btn.value as TypeFilterBook)}
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
                                          <div
                                                key={product._id}
                                                className='h-full min-w-[calc((100%-40px)/2)] sm:min-w-[calc((100%-40px)/4)]  xl:min-w-[calc((100%-120px)/6)]'
                                          >
                                                <ProductSmall product={product} />
                                          </div>
                                    ))}

                              {type === 'Manga' &&
                                    productManga?.map((product) => (
                                          <div
                                                key={product._id}
                                                className='h-full min-w-[calc((100%-120px)/2)] sm:min-w-[calc((100%-40px)/4)] xl:min-w-[calc((100%-120px)/6)]'
                                          >
                                                <ProductSmall product={product} />
                                          </div>
                                    ))}

                              {type === 'Novel' &&
                                    productNovel?.map((product) => (
                                          <div
                                                key={product._id}
                                                className='h-full min-w-[calc((100%-120px)/2)] sm:min-w-[calc((100%-40px)/4)] xl:min-w-[calc((100%-120px)/6)]'
                                          >
                                                <ProductSmall product={product} />
                                          </div>
                                    ))}

                              {type === 'Detective' &&
                                    productDectective?.map((product) => (
                                          <div
                                                key={product._id}
                                                className='h-full min-w-[calc((100%-120px)/2)] sm:min-w-[calc((100%-40px)/4)] xl:min-w-[calc((100%-120px)/6)]'
                                          >
                                                <ProductSmall product={product} />
                                          </div>
                                    ))}

                              {getProductBookAllType.isPending && (
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
                  {getProductBookAllType && !getProductBookAllType.data?.data.metadata && (
                        <div className='w-full h-full flex items-center justify-center text-[20px] font-semibold text-slate-700 bg-[#ffffff] rounded-lg'>
                              Không có thông tin các sản phẩm
                        </div>
                  )}
            </div>
      )
}

export default ContentBook
