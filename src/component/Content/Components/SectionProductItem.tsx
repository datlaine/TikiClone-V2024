import { useEffect, useState, useRef } from 'react'
import PositionIcon from '../../BoxUi/BoxAbsolute'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import BoxCenter from '../../BoxUi/BoxCenter'
import BoxIsBought from '../../BoxUi/BoxIsBought'
import BoxAbsolute from '../../BoxUi/BoxAbsolute'
import { useQuery } from '@tanstack/react-query'
import ProductApi, { TProduct, TProductReturn } from '../../../apis/product.api'
import { Link } from 'react-router-dom'

type Props = {}

const SectionProductItem = (props: Props) => {
      const wrapperListProductsRef = useRef<HTMLDivElement>(null)
      const PositionScrollCurrent = useRef<number>(0)
      const [limitShowProduct, setLimitShowProduct] = useState<number>(0)
      const [count, setCount] = useState(1)

      const allProduct = useQuery({
            queryKey: ['get-all-product'],
            queryFn: () => ProductApi.getAllProduct(),
            staleTime: 1000 * 60 * 5,
      })

      const handleClickNext = () => {
            if (wrapperListProductsRef.current) {
                  setCount((prev) => prev + 1)
                  const width = wrapperListProductsRef.current.getBoundingClientRect().width
                  PositionScrollCurrent.current = PositionScrollCurrent.current - width
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

      useEffect(() => {
            if (allProduct.isSuccess) {
                  setLimitShowProduct(Math.ceil((allProduct.data.data.metadata.products.length * 2) / 5))
            }
      }, [allProduct.isSuccess, allProduct?.data?.data.metadata.products.length])

      const styleEffect = {
            buttonPrev: count === 1 ? 'cursor-not-allowed' : 'cursor-pointer',
            buttonNext: limitShowProduct === count ? 'cursor-not-allowed' : 'cursor-pointer',
            disButtonPrev: count === 1 ? true : false,
            disButtonNext: limitShowProduct === count ? true : false,
      }

      return (
            <div className='h-[75%] mx-[4px] relative  overflow-x-scroll lg:overflow-x-hidden  '>
                  <div ref={wrapperListProductsRef} className=' h-full gap-5 flex  w-[370px]  xl:w-full snap-mandatory	'>
                        {allProduct.isSuccess &&
                              allProduct?.data?.data?.metadata.products.map((product: TProductReturn) => {
                                    return (
                                          <Link
                                                to={`/product/${product._id}`}
                                                className='flex flex-col min-w-[40%] md:min-w-[45%] lg:min-w-[17%] h-full snap-always snap-start	 '
                                                key={product._id}
                                          >
                                                <div className='w-full min-h-full'>
                                                      <img
                                                            src={product?.product_thumb_image?.secure_url}
                                                            className='min-w-full min-h-[85%] max-h-[85%]'
                                                            alt='product'
                                                      />
                                                      <p className='w-full text-center'>{product.product_price}</p>
                                                </div>
                                          </Link>
                                    )
                              })}

                        {allProduct.isSuccess &&
                              allProduct?.data?.data?.metadata.products.map((product: TProductReturn) => {
                                    return (
                                          <Link
                                                to={`/product/${product._id}`}
                                                className='flex flex-col min-w-[40%] md:min-w-[30%] lg:min-w-[15%] h-full snap-always snap-start	 '
                                                key={product._id}
                                          >
                                                <div className='w-full min-h-full'>
                                                      <img
                                                            src={product?.product_thumb_image?.secure_url}
                                                            className='min-w-full min-h-[85%] max-h-[85%]'
                                                            alt='product'
                                                      />
                                                      <p className='w-full text-center'>{product.product_price}</p>
                                                </div>
                                          </Link>
                                    )
                              })}
                  </div>
                  <div className='hidden xl:flex absolute top-0 left-[-4px] h-[100%] bg-[#ffffff]  items-center px-[8px]'>
                        <button
                              className={`${styleEffect.buttonPrev} border-[1px] border-blue-400 rounded-full`}
                              onClick={handleClickPrev}
                              disabled={styleEffect.disButtonPrev}
                        >
                              <ChevronLeft size={30} color='blue' />
                        </button>
                  </div>

                  <div className='hidden xl:flex absolute top-0 right-[-4px] h-[100%] bg-[#ffffff]  items-center px-[8px]'>
                        <button
                              className={`${styleEffect.buttonNext} border-[1px] border-blue-400 rounded-full `}
                              onClick={handleClickNext}
                              disabled={styleEffect.disButtonNext}
                        >
                              <ChevronRight size={30} color='blue' />
                        </button>
                  </div>
            </div>
      )
}

export default SectionProductItem
