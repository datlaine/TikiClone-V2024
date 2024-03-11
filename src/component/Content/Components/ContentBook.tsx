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
      }

      const calcLength = (type: TypeFilterBook) => {
            switch (type) {
                  case 'All':
                        return Math.ceil((productAll?.length || 6) / 6)
                  case 'Manga':
                        return Math.ceil((productManga?.length || 6) / 6)
                  case 'Novel':
                        return Math.ceil((productNovel?.length || 6) / 6)
                  case 'Dictive':
                        return Math.ceil((productDectective?.length || 6) / 6)
                  default:
                        return 1
            }
      }

      return (
            <div className='w-full h-[485px] bg-[#ffffff] rounded-lg p-[20px] flex flex-col gap-[16px]'>
                  <h3>ContentBook {type}</h3>

                  <div className='h-[60px] flex gap-[20px]'>
                        {CATEGORY_BOOK.map((btn) => (
                              <button key={btn.label} onClick={() => setType(btn.value as TypeFilterBook)}>
                                    {btn.label}
                              </button>
                        ))}
                  </div>

                  <div className='relative w-full h-[75%] overflow-hidden'>
                        <div className='h-full flex gap-[20px] ' ref={wrapperListProductsRef}>
                              {type === 'All' &&
                                    productAll?.map((product) => (
                                          <div className='h-full min-w-[calc((100%-120px)/2)] xl:min-w-[calc((100%-120px)/6)]'>
                                                <ProductSmall key={product._id} product={product} />
                                          </div>
                                    ))}

                              {type === 'Manga' &&
                                    productManga?.map((product) => (
                                          <div className='h-full min-w-[calc((100%-120px)/2)] xl:min-w-[calc((100%-120px)/6)]'>
                                                <ProductSmall key={product._id} product={product} />
                                          </div>
                                    ))}

                              {type === 'Novel' &&
                                    productNovel?.map((product) => (
                                          <div className='h-full min-w-[calc((100%-120px)/2)] xl:min-w-[calc((100%-120px)/6)]'>
                                                <ProductSmall key={product._id} product={product} />
                                          </div>
                                    ))}

                              {type === 'Dictive' &&
                                    productDectective?.map((product) => (
                                          <div className='h-full min-w-[calc((100%-120px)/2)] xl:min-w-[calc((100%-120px)/6)]'>
                                                <ProductSmall key={product._id} product={product} />
                                          </div>
                                    ))}
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
            </div>
      )
}

export default ContentBook
