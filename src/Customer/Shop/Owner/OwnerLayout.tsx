import React, { useState } from 'react'
import OwnerShopFilterName from './Filter/OwnerShopFilterName'
import { ShopResponse } from '../../../types/shop.type'

type TProps = {
      shop: ShopResponse
}

type FilterMode = 'NAME' | 'TYPE' | 'BEST_SELLER'

const OwnerLayout = (props: TProps) => {
      const { shop } = props
      const [filterMode, setfilterMode] = useState<FilterMode>()

      return (
            <div className='relative w-full min-h-[200px] h-max flex flex-col'>
                  <div className='w-full h-[100px] bg-white flex items-center justify-center'>
                        <p className='tracking-[4px] text-[18px]'>{shop.shop_name}</p>
                  </div>
                  <div className='relative w-full min-h-[120px] py-[30px] xl:py-0 h-max bg-[#FFA500] flex items-center'>
                        <div className='absolute top-[-50%] translate-y-[137%] xl:translate-y-0 left-[20px]  xl:left-[60px] bg-green-800 w-[70px] h-[70px] xl:h-[140px] xl:w-[140px] rounded-full'>
                              <img src={shop.shop_avatar_default} className='h-full w-full rounded-full' alt='shop_image' />
                        </div>

                        <ul className='ml-[20px] mt-[30px] xl:mt-0 xl:ml-[240px] flex flex-col xl:flex-row min-h-[40px] xl:items-center gap-[16px]'>
                              <li
                                    className='px-[16px] py-[12px]  bg-white  rounded-lg hover:bg-slate-900 hover:text-white transition-all duration-500'
                                    onClick={() => setfilterMode('NAME')}
                              >
                                    Sản phẩm của Shop
                              </li>
                              <li
                                    className='px-[16px] py-[12px] bg-white  rounded-lg hover:bg-slate-900 hover:text-white transition-all duration-500'
                                    onClick={() => setfilterMode('TYPE')}
                              >
                                    Sắp xếp theo loại
                              </li>
                              <li
                                    className='px-[16px] py-[12px] bg-white  rounded-lg hover:bg-slate-900 hover:text-white transition-all duration-500'
                                    onClick={() => setfilterMode('BEST_SELLER')}
                              >
                                    Các sản phẩm bán chạy
                              </li>
                        </ul>
                  </div>

                  <div className=' w-full h-max mt-[16px]'>{filterMode === 'NAME' && <OwnerShopFilterName />}</div>
            </div>
      )
}

export default OwnerLayout
