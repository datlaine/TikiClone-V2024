import React, { SetStateAction, useEffect, useState } from 'react'
import { Cart } from '../../types/cart.type'
import Checkbox, { CheckboxChangeEvent } from 'antd/es/checkbox/Checkbox'
import { ChevronRight, Home, TimerIcon, Trash2 } from 'lucide-react'
import { Link } from 'react-router-dom'
import { DateTimeFromString } from '../../utils/datetime.util'
import WrapperCountProduct from '../ui/WrapperCountProduct'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import CartService from '../../apis/cart.service'

type TProps = {
      cart: Cart
      cart_check_all: Cart
      setCartSelectPay: React.Dispatch<SetStateAction<Pick<Cart, '_id' | 'cart_product_price'>[]>>
}

const CartItem = (props: TProps) => {
      const { cart } = props

      const [select, setSelect] = useState<boolean>(cart.cart_is_select)

      const queryClient = useQueryClient()

      console.log({ cart, select })

      useEffect(() => {
            // if (select !== cart.cart_is_select) {
            setSelect(cart.cart_is_select)
            // }
      }, [cart.cart_is_select])

      const updateSelectOneMutation = useMutation({
            mutationKey: ['/v1/api/cart/cart-change-select-one'],
            mutationFn: ({ value, cart_id }: { value: boolean; cart_id: string }) => CartService.selectCartOne({ value, cart_id }),
            onSuccess: (axiosResponse) => {
                  queryClient.invalidateQueries({
                        queryKey: ['v1/api/cart/cart-pay'],
                  })
                  setSelect(axiosResponse.data.metadata.cartUpdateItem.cart_is_select)
            },
      })

      const changeSelect = (e: CheckboxChangeEvent) => {
            updateSelectOneMutation.mutate({ value: e.target.checked, cart_id: cart._id })
      }

      return (
            <div className='min-h-[250px] h-[500px] xl:h-[250px] flex flex-col gap-[16px] bg-[#ffffff] px-[12px]' key={cart._id}>
                  <div className='flex gap-[8px] h-[14%] xl:h-[20%] items-center'>
                        <Checkbox></Checkbox>
                        <Home />
                        <span>{cart.cart_product_id.product_name}</span>
                        <ChevronRight />
                  </div>
                  <div className='max-h-[70%] h-[70%] xl:max-h-[50%] xl:h-[40%] w-full flex flex-col xl:flex-row'>
                        <div className='flex-1 flex  flex-col xl:flex-row gap-[16px] h-[150px] xl:h-[80px]'>
                              <Checkbox className='z-[5]' checked={select} onChange={changeSelect} />
                              <Link
                                    className='inline-block w-[90px] xl:w-[90px] h-[150px] xl:h-[80px]'
                                    to={`/product/${cart.cart_product_id._id}`}
                              >
                                    <img
                                          src={cart.cart_product_id.product_thumb_image.secure_url}
                                          className='max-w-full max-h-full h-full'
                                          alt='product'
                                    />{' '}
                              </Link>
                              <div className='flex-1 flex flex-col content-between justify-between font-semibold text-slate-700'>
                                    <span>{cart.cart_product_id.product_name}</span>
                                    <span>Thể loại: Sách</span>
                                    <span>Giao vào ngày mai</span>
                              </div>
                        </div>

                        <div className='w-[180px] my-[4px] xl:my-0'>{cart.cart_product_id.product_price}</div>
                        <div className='w-[120px] h-max xl:h-full  my-[4px] xl:my-0'>
                              <WrapperCountProduct cart_id={cart._id} cart_quantity={cart.cart_quantity} />
                        </div>
                        <div className='w-[120px]  my-[4px] xl:my-0'>{cart.cart_product_price}</div>
                        <div className='w-[20px]  my-[8px] xl:my-0'>
                              <Trash2 />
                        </div>
                  </div>
                  <div className='w-[calc(100%+24px)] ml-[-12px] bg-slate-100 h-[1px]'></div>
                  <div className='max-h-[20%] flex ml-[16px] items-center gap-[8px]'>
                        <TimerIcon />
                        {DateTimeFromString(cart.cart_date)}
                  </div>
            </div>
      )
}

export default CartItem
