import { Badge, Bike, ShoppingBag } from 'lucide-react'
import React from 'react'
import { Cart } from '../../types/cart.type'

type TProps = {
      cart: Cart
      index: number
}

const PaymentItem = (props: TProps) => {
      const { cart, index } = props

      console.log({ cart })

      return (
            <div className='w-full min-h-[200px] xl:min-h-[135px] h-max relative z-[2] border-[1px] border-slate-300 rounded-lg text-[11px] xl:text-[13px]'>
                  <div className='absolute top-[-25px] left-[12px] h-[50px] bg-[#ffffff] z-[3] px-[8px] text-green-600 flex items-center gap-[8px]'>
                        <ShoppingBag />
                        <span>Gói {index}:</span>
                        <span>Giao đúng chiều thứ 4, 13h - 18h, 21/02</span>
                  </div>
                  <div className='mt-[30px]  px-[25px] flex flex-col gap-[8px]'>
                        <div className='flex flex-col xl:flex-row justify-between items-start h-[80px] xl:h-[40px]'>
                              <span className='uppercase w-max h-full flex items-center'>Giao tiết kiệm</span>
                              <span className='w-max h-full flex items-center'>
                                    {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(14000).replace('₫', '')}
                              </span>
                              <div className='w-[90%] xl:w-[300px] h-[40px] bg-slate-300 rounded-md flex items-center px-[16px] gap-[8px] text-[14px]'>
                                    <Bike />
                                    <span>Được giao bởi Đạt</span>
                              </div>
                        </div>

                        <div className='mt-[30px] xl:mt-0 h-[80px] flex mb-[16px]'>
                              <div className='min-w-[160px] xl:min-w-[260px] h-[50px] flex gap-[16px] '>
                                    <img src={cart?.cart_product_id?.product_thumb_image?.secure_url} className='h-full w-[40px]' alt='' />
                                    <div className='flex flex-col justify-between text-[13px]'>
                                          <span>{cart?.cart_product_id.product_name}</span>
                                          <span>SL:x{cart?.cart_quantity}</span>
                                    </div>
                              </div>
                              <div className='flex-1 flex h-[50px] items-end'>
                                    {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(
                                          cart?.cart_product_price,
                                    )}
                              </div>
                        </div>
                  </div>
            </div>
      )
}

export default PaymentItem
