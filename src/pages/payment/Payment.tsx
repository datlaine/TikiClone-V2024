import React, { useEffect, useState } from 'react'
import LogoTiki from './assets/img/payment_logo_tiki.png'
import { Phone } from 'lucide-react'
import CartUserInfo from '../../component/Cart/CartUserInfo'
import { useQuery } from '@tanstack/react-query'
import CartService from '../../apis/cart.service'
import PaymentCart from './PaymentCart'
import PaymentItem from './PaymentItem'
import { Link } from 'react-router-dom'
import { CartResponse } from '../../types/cart.type'

const Payment = () => {
      const [price, setPrice] = useState<number>(0)

      const payQuery = useQuery({
            queryKey: ['v1/api/cart/cart-pay'],
            queryFn: () => CartService.calculatorPrice(),
      })

      useEffect(() => {
            if (payQuery.isSuccess) {
                  console.log('Ok')
                  setPrice(() => {
                        let result: number = 0
                        payQuery.data.data.metadata.carts.cart_products.forEach((cartItem) => {
                              result += cartItem.quantity * cartItem.product_id.product_price
                        })
                        return result
                  })
            }
      }, [payQuery.isSuccess, payQuery.data?.data])

      return (
            <div className='w-full min-h-[2000px] h-max'>
                  <div className='w-full min-h-screen px-[16px] xl:px-0 h-max flex flex-col'>
                        <header className='w-full h-[100px] p-[20px] xl:p-[15px_150px] bg-[#ffffff] flex justify-between items-start'>
                              <div className='w-[80%] xl:w-[1250px] mx-auto h-full flex gap-[16px] items-center'>
                                    <Link to={'/'}>
                                          <img src={LogoTiki} className='w-[65px] h-[65px]' alt='' />
                                    </Link>
                                    <div className='w-[1px] h-[50%] bg-blue-400'></div>
                                    <span className='text-blue-400 text-[14px] xl:text-[24px]'>Thanh toán</span>
                              </div>
                              <div className='w-[290px] xl:w-[230px] h-[65px] px-[4px] flex items-center gap-[8px] border-[1px] border-blue-400 rounded-3xl bg-blue-100 text-[12px]'>
                                    <div className='bg-blue-400 w-[40px] h-[40px] rounded-full flex items-center justify-center'>
                                          <Phone color='white' />
                                    </div>
                                    <div className='flex flex-col gap-[6px] '>
                                          <span className='font-semibold text-blue-400 text-[18px] '>1900-6035</span>
                                          <span className='text-[12px] xl:text-[14px]'>8h - 21h, cả T7 & CN</span>
                                    </div>
                              </div>
                        </header>
                        <section className='mt-[30px] w-full xl:w-[1250px] mx-auto min-h-screen h-max  flex flex-col xl:flex-row gap-[16px]'>
                              <div className='w-full xl:w-[70%] bg-[#ffffff] p-[20px] h-max'>
                                    <h4>Chọn hình thức giao hàng</h4>
                                    <div className='mt-[40px] flex flex-col gap-[70px]'>
                                          {payQuery.isSuccess &&
                                                payQuery.data.data.metadata.carts.cart_products.map((product, index) => (
                                                      <PaymentItem key={product._id} product={product} index={index + 1} />
                                                ))}
                                    </div>
                              </div>
                              <div className='w-full xl:w-[30%] h-max flex flex-col gap-[16px]'>
                                    <CartUserInfo />
                                    <PaymentCart carts={payQuery.data?.data.metadata.carts as CartResponse} price={price} />
                              </div>
                        </section>
                  </div>
            </div>
      )
}

export default Payment
