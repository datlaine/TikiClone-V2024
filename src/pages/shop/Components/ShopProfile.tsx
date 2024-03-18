import React from 'react'
import { ShopResponse } from '../../../types/shop.type'
import { CalendarCheck, Store } from 'lucide-react'
import { string } from 'zod'
import { getYear } from '../../../utils/date.utils'

type TProps = {
      shop: ShopResponse
}

const ShopProfile = (props: TProps) => {
      const { shop } = props

      return (
            <div className='w-full min-h-[340px] h-max bg-[#ffffff] flex  rounded-lg'>
                  <div className='min-h-full w-[50%] flex items-center border-r-[1px] border-slate-200'>
                        <div className='h-[70px] w-full flex justify-center'>
                              <div className='min-h-full min-w-[50%] border-r-[1px] border-slate-200 flex flex-col items-center gap-[8px]'>
                                    <span>Tổng lượt đánh giá</span>
                                    <span className='font-medium text-[24px] text-green-700'>{shop.shop_count_total_vote}</span>
                              </div>

                              <div className='min-h-full min-w-[50%] flex flex-col items-center gap-[8px]'>
                                    <span>Đánh giá trung bình</span>
                                    <span className='font-medium text-[24px] text-green-700'>{shop.shop_vote.toFixed(1)}</span>
                              </div>
                        </div>
                  </div>
                  <div className='min-h-full min-w-[50%] p-[20px] '>
                        <div className='flex'>
                              <CalendarCheck />
                              <span>Thành viên từ năm</span>
                              <span>{getYear(shop.createdAt)}</span>
                        </div>
                  </div>
            </div>
      )
}

export default ShopProfile
