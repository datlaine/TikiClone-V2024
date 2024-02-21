import { keepPreviousData, useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useEffect, useRef, useState } from 'react'
import CartService from '../../apis/cart.service'
import { Checkbox } from 'antd'
import { Trash2 } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../store'
import { TUser } from '../../types/axiosResponse'
import AuthPermission from '../Auth/AuthPermission'
import { CheckboxChangeEvent } from 'antd/es/checkbox'
import CartItem from './CartItem'
import { fetchUser } from '../../Redux/authenticationSlice'
import CartPayMini from './CartPayMini'
import CartUserInfo from './CartUserInfo'
import { CartResponse } from '../../types/cart.type'

const Cart = () => {
      const user = useSelector((state: RootState) => state.authentication.user) as TUser
      // const [, setCartSelectPay] = useState<Pick<CartResponse, '_id' | 'product_price'>[]>([])
      const queryClient = useQueryClient()
      const dispatch = useDispatch()
      const [selectAll, setSelectAll] = useState<boolean>(false)

      const getMyCart = useQuery({
            queryKey: ['v1/api/cart/cart-get-my-cart'],
            queryFn: () => CartService.getMyCart(),
            // placeholderData: keepPreviousData,
      })

      const changeSelectAll = useMutation({
            mutationKey: ['v1/api/cart/cart-change-select-all'],
            mutationFn: (value: boolean) => CartService.selectAllCart(value),
            onSuccess: (axiosResponse) => {
                  setSelectAll(axiosResponse.data.metadata.cart.cart_select_all)
                  console.log({ state: axiosResponse.data.metadata.cart.cart_select_all })
                  queryClient.invalidateQueries({
                        queryKey: ['v1/api/cart/cart-get-my-cart'],
                  })
                  // dispatch(fetchUser({ user: axiosResponse.data.metadata.user }))

                  queryClient.invalidateQueries({
                        queryKey: ['v1/api/cart/cart-pay'],
                  })
            },
      })

      const onChangeSelectAll = (e: CheckboxChangeEvent) => {
            changeSelectAll.mutate(e.target.checked)
      }

      console.log({ getMyCart: getMyCart.data?.data.metadata.cart })

      useEffect(() => {
            console.log({ user })
            if (getMyCart.isSuccess) {
                  setSelectAll(getMyCart.data.data.metadata.cart.cart_select_all)
            }
            // if (user && user?.isCartSelectAll) {
            //       setCartSelectPay(() => {
            //             let array
            //             array = getMyCart.data?.data.metadata.cart.map((cartItem) => {
            //                   return { _id: cartItem., cart_product_price: cartItem.cart_product_price }
            //             })
            //             return array as unknown as Pick<TCart, '_id' | 'cart_product_price'>[]
            //       })
            // }
      }, [getMyCart.isSuccess, getMyCart.data?.data.metadata.cart, user?.isCartSelectAll, user])

      if (!user) {
            return (
                  <div className='h-[calc(100vh-100px)] w-full'>
                        <AuthPermission />
                  </div>
            )
      }

      console.log({ selectAll })

      return (
            <div className='w-full max-w-full h-max min-h-[2000px] flex gap-[12px] text-[13px]'>
                  <div className='px-[15px] w-full pb-[10px]  h-max flex flex-col gap-x-[24px] min-h-[2000px]'>
                        <h3 className='font-extrabold uppercase text-[20px]'>Giỏ hàng</h3>
                        <div className='sticky top-[70px] xl:top-[-2px] bg-[#f5f4f6]  w-full  xl:w-[75.75%] py-[16px] h-[70px] items-center z-[10]'>
                              <div className='bg-[#ffffff] rounded h-[36px] px-[12px] flex items-center'>
                                    <div className='flex gap-[8px] flex-1 items-center'>
                                          <Checkbox
                                                disabled={changeSelectAll.isPending}
                                                onChange={onChangeSelectAll}
                                                defaultChecked={selectAll}
                                                checked={selectAll}
                                          ></Checkbox>
                                          <span>
                                                Tất cả {'('} {getMyCart.isSuccess && getMyCart.data.data.metadata.cart.cart_products.length}{' '}
                                                sản phẩm {')'}
                                          </span>
                                    </div>
                                    <div className='hidden xl:block xl:basis-[180px]'>
                                          <span>Đơn giá</span>
                                    </div>
                                    <div className='hidden xl:block xl:basis-[120px]'>
                                          <span>Số lượng</span>
                                    </div>
                                    <div className='hidden xl:block xl:basis-[120px]'>
                                          <span>Thành tiền</span>
                                    </div>
                                    <div className='hidden xl:block xl:basis-[20px]'>
                                          <Trash2 />
                                    </div>
                              </div>
                        </div>
                        <div className='w-full flex gap-[24px]'>
                              <div className='flex flex-col w-[55%] xl:w-[77%] gap-[24px]'>
                                    {getMyCart.isSuccess &&
                                          getMyCart.data.data.metadata.cart.cart_products.length > 0 &&
                                          getMyCart.data.data.metadata.cart.cart_products.map((cartItem, index) => {
                                                return <CartItem key={cartItem._id} product={cartItem} shop={cartItem.shop_id} />
                                          })}
                              </div>
                              <div className='w-[40%] xl:w-[23%] min-h-screen flex flex-col gap-[16px] '>
                                    <CartUserInfo />

                                    <div className='sticky top-[120px] xl:top-0 flex flex-col gap-[16px] bg-[#f5f4f6]  w-full h-max pt-[12px]'>
                                          <CartPayMini />
                                    </div>
                              </div>
                        </div>

                        {getMyCart.isSuccess && getMyCart.data.data.metadata.cart.cart_products.length === 0 && (
                              <p>Giỏ hàng hiện tại đang trống</p>
                        )}
                  </div>
            </div>
      )
}

export default Cart
