import { useQuery } from '@tanstack/react-query'
import React, { useRef, useState } from 'react'
import ProductApi from '../../apis/product.api'
import ProductSimplify from '../../component/Content/Components/ProductSimplify'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import ProductItemMini from './Components/ProductItemMini'
import { TProductDetail } from '../../types/product/product.type'

type TProps = {
      product: TProductDetail
}

const ProductSimiliar = (props: TProps) => {
      const { product } = props

      const allProduct = useQuery({
            queryKey: ['get-all-product'],
            queryFn: () =>
                  ProductApi.getProductSimilar({
                        product_type: product.product_type,
                        type: product.attribute.type,
                        product_id: product._id,
                  }),
            staleTime: 1000 * 60 * 5,
      })
      const couneElement = 8

      const wrapperListProductsRef = useRef<HTMLDivElement>(null)
      const PositionScrollCurrent = useRef<number>(0)
      const [limitShowProduct, setLimitShowProduct] = useState<number>(0)
      const [count, setCount] = useState(1)

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
      const productData = allProduct.data?.data.metadata.products
      const totalPage = Math.ceil(Number(productData?.length) / 8) + 2
      const styleEffect = {
            buttonPrev: count === 1 ? 'xl:hidden' : 'xl:flex',
            buttonNext: totalPage === count ? 'xl:hidden' : 'xl:flex',
            disButtonPrev: count === 1 ? true : false,
            disButtonNext: totalPage === count ? true : false,
      }

      const page1 = productData?.slice(0, 8)
      const page2 = productData?.slice(8, 16)
      const page3 = productData?.slice(16, 24)
      const page4 = productData?.slice(24, 32)

      console.log({ page1, page2, page3, page4 })

      return (
            <div className='relative overflow-hidden flex flex-col gap-[16px] mx-[16px] py-[16px]'>
                  <p className='text-[16px] font-semibold'>Sản phẩm tương tự</p>
                  {productData && (
                        <div className='flex xl:w-full  xl:gap-0    overflow-scroll xl:overflow-visible ' ref={wrapperListProductsRef}>
                              <div className=' w-max xl:min-w-full   grid grid-flow-col auto-cols-[130px] auto-rows-[230px] grid-cols-[130px] xl:grid-cols-4 grid-rows-[230px_230px] gap-[18px] '>
                                    {page1?.map((product) => (
                                          // <div className='min-w-[calc((100%-64px)/4)] h-[230px]' key={product._id}>
                                          <ProductItemMini product={product} />
                                          // </div>
                                    ))}
                              </div>
                              <div className='w-max xl:min-w-full mx-[50px] xl:mx-0 grid grid-flow-col auto-cols-[130px] auto-rows-[230px] grid-cols-[130px] xl:grid-cols-4 grid-rows-[230px_230px] gap-[18px] '>
                                    {page2?.reverse().map((product) => (
                                          // <div className='min-w-[calc((100%-64px)/4)] h-[230px]' key={product._id}>
                                          <ProductItemMini product={product} />
                                          // </div>
                                    ))}
                              </div>

                              <div className=' w-max xl:min-w-full  mx-[50px] xl:mx-0  grid grid-flow-col auto-cols-[130px] auto-rows-[230px] grid-cols-[130px] xl:grid-cols-4 grid-rows-[230px_230px] gap-[18px] '>
                                    {page1?.map((product) => (
                                          // <div className='min-w-[calc((100%-64px)/4)] h-[230px]' key={product._id}>
                                          <ProductItemMini product={product} />
                                          // </div>
                                    ))}
                              </div>

                              <div className=' w-max xl:min-w-full  mx-[50px] xl:mx-0 grid grid-flow-col auto-cols-[130px] auto-rows-[230px] grid-cols-[130px] xl:grid-cols-4 grid-rows-[230px_230px] gap-[18px] '>
                                    {page1?.map((product) => (
                                          // <div className='min-w-[calc((100%-64px)/4)] h-[230px]' key={product._id}>
                                          <ProductItemMini product={product} />
                                          // </div>
                                    ))}
                              </div>
                        </div>
                  )}

                  <button
                        className={`${styleEffect.buttonPrev} hidden xl:flex  absolute top-[50%] left-[0px] translate-y-[30%]  bg-[#ffffff]  rounded-full shadow-3xl`}
                        onClick={handleClickPrev}
                        disabled={styleEffect.disButtonPrev}
                  >
                        <ChevronLeft size={28} color='blue' />
                  </button>

                  <button
                        className={`${styleEffect.buttonNext} hidden xl:flex absolute top-[50%] right-[0px] translate-y-[30%] bg-[#ffffff]  rounded-full shadow-3xl `}
                        onClick={handleClickNext}
                        disabled={styleEffect.disButtonNext}
                  >
                        <ChevronRight size={26} color='blue' />
                  </button>
            </div>
      )
}

export default ProductSimiliar
