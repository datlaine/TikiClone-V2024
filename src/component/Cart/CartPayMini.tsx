import React, { useEffect, useMemo, useState } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../store'
import { TUser } from '../../types/axiosResponse'
import { Cart } from '../../types/cart.type'
import { useQuery } from '@tanstack/react-query'
import CartService from '../../apis/cart.service'

const CartPayMini = () => {
      const [price, setPrice] = useState<number>(0)

      const payQuery = useQuery({
            queryKey: ['v1/api/cart/cart-pay'],
            queryFn: () => CartService.calculatorPrice(),
      })

      const user = useSelector((state: RootState) => state.authentication.user) as TUser

      useEffect(() => {
            console.log({ data: payQuery.data?.data.metadata.cart })

            if (payQuery.isSuccess) {
                  console.log('Ok')
                  setPrice(() => {
                        let result: number = 0
                        payQuery.data.data.metadata.cart.forEach((cartItem) => {
                              result += cartItem.cart_product_price
                        })
                        return result
                  })
            }
      }, [payQuery.isSuccess, payQuery.data?.data])

      return (
            <React.Fragment>
                  <div className='h-[210px] xl:h-[180px] bg-[#ffffff] rounded p-[16px]'>
                        <div className='h-[49%]  flex flex-col gap-[8px] xl:gap-0 justify-center'>
                              <p className='w-full flex  flex-col xl:flex-row justify-between'>
                                    <span>Tạm tính</span>
                                    {payQuery.isSuccess && <span>{price}</span>}
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
                              <div className='flex   flex-col xl:flex-rowjustify-between '>
                                    <span>Tổng tiền</span>
                                    {payQuery.isSuccess && <span>{price}</span>}
                              </div>
                              <span className='block w-full text-right'>(Đã bao gồm VAT nếu có)</span>
                        </div>
                  </div>
                  <button className='w-full h-[45px] flex items-center justify-center bg-red-600 text-white rounded-md'>Mua ngay</button>
            </React.Fragment>
      )
}

export default CartPayMini
