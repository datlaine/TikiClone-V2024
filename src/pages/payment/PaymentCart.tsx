import React from 'react'
import { Link } from 'react-router-dom'
import { Cart } from '../../types/cart.type'

type TProps = {
      carts: Cart[]
      price: number
}

const PaymentCart = (props: TProps) => {
      const { carts, price } = props

      return (
            <React.Fragment>
                  <div className='h-[210px] xl:h-[180px] bg-[#ffffff] rounded p-[16px]'>
                        <div className='h-[49%]  flex flex-col gap-[8px] xl:gap-0 justify-center'>
                              <p className='w-full flex  flex-col xl:flex-row justify-between'>
                                    <span>Tạm tính</span>
                                    <p className='w-max flex gap-[4px] items-center '>
                                          <p className='w-[130px] xl:w-max  max-w-[180px] truncate'>
                                                {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' })
                                                      .format(price)
                                                      .replace('₫', '')}
                                          </p>
                                          <span className='ml-[-2px]'>VNĐ</span>
                                    </p>
                              </p>
                              <p className='w-full flex justify-between'>
                                    <span>Giảm giá </span>
                                    <span>-15000</span>
                              </p>
                        </div>

                        <div className='w-[calc(100%+32px)] my-[10px] xl:my-0 ml-[-16px] '>
                              <div className='w-full h-[1px] bg-slate-100'></div>
                        </div>
                        <div className='h-[49%] flex flex-col gap-[8px] xl:gap-0 justify-center '>
                              <div className='flex   flex-col xl:flex-row justify-between '>
                                    <span>Tổng tiền</span>
                                    <p className='w-max flex gap-[4px] items-center '>
                                          <p className='w-[130px] xl:w-max  max-w-[180px] truncate'>
                                                {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' })
                                                      .format(price)
                                                      .replace('₫', '')}
                                          </p>
                                          <span className='ml-[-2px]'>VNĐ</span>
                                    </p>
                              </div>
                              <span className='block w-full text-right'>(Đã bao gồm VAT nếu có)</span>
                        </div>
                  </div>
                  <Link
                        to={'/payment'}
                        className='w-full h-[45px] flex items-center justify-center bg-red-600 text-white rounded-md text-[16px]'
                  >
                        Mua hàng {'('}
                        {carts?.length}
                        {')'}
                  </Link>
            </React.Fragment>
      )
}

export default PaymentCart
