import React, { useRef, useState } from 'react'
import { TProductDetail, TypeFood } from '../../../types/product/product.type'
import { useQuery } from '@tanstack/react-query'
import ProductApi from '../../../apis/product.api'
import ProductSmall from './ProductSmall'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import LayoutTranslate from './LayoutTranslate'

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

      const [type, setType] = useState<TypeFilterFood>('All')

      const productAll = getProductFoodAllType.data?.data.metadata.products
      const productFastFood = getProductFoodAllType.data?.data.metadata.fastFood
      const productCannedGood = getProductFoodAllType.data?.data.metadata.cannedGood
      const productDrink = getProductFoodAllType.data?.data.metadata.drinks
      const COUNT_SKELETON = window.innerWidth >= 1024 ? 6 : 3

      const styleEffect = {
            onActive: (isActive: boolean) => {
                  if (isActive) return 'bg-blue-50 border-blue-600 text-blue-600'

                  return 'bg-transparent border-gray-400 text-slate-600'
            },
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
                        {type === 'All' && <LayoutTranslate products={productAll as TProductDetail[]} />}
                        {type === 'Canned Goods' && <LayoutTranslate products={productCannedGood as TProductDetail[]} />}
                        {type === 'Drinks' && <LayoutTranslate products={productDrink as TProductDetail[]} />}
                        {type === 'Fast food' && <LayoutTranslate products={productFastFood as TProductDetail[]} />}

                        {getProductFoodAllType.isPending && (
                              <>
                                    {Array(COUNT_SKELETON)
                                          .fill(0)
                                          ?.map((_, index) => (
                                                <div className='animate-pulse w-full h-full rounded-lg bg-slate-400' key={index}></div>
                                          ))}
                              </>
                        )}
                  </div>

                  {getProductFoodAllType.isSuccess && !getProductFoodAllType.data?.data.metadata && (
                        <div className='w-full h-[80%] flex items-center justify-center text-[20px] font-semibold text-slate-700 bg-[#ffffff] rounded-lg'>
                              Không có thông tin các sản phẩm
                        </div>
                  )}
            </div>
      )
}

export default ContentFood
