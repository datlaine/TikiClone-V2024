import { keepPreviousData, useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import CartService from '../../apis/cart.service'
import { Checkbox } from 'antd'
import { Trash2 } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../store'
import { TUser } from '../../types/axiosResponse'
import AuthPermission from '../Auth/AuthPermission'
import { CheckboxChangeEvent } from 'antd/es/checkbox'
import CartItem from './CartItem'
import { Cart as TCart } from '../../types/cart.type'
import { fetchUser } from '../../Redux/authenticationSlice'
import CartPayMini from './CartPayMini'

const Cart = () => {
      const user = useSelector((state: RootState) => state.authentication.user) as TUser
      const [, setCartSelectPay] = useState<Pick<TCart, '_id' | 'cart_product_price'>[]>([])
      const queryClient = useQueryClient()
      const dispatch = useDispatch()

      const getMyCart = useQuery({
            queryKey: ['v1/api/cart/cart-get-my-cart'],
            queryFn: () => CartService.getMyCart(),
            placeholderData: keepPreviousData,
      })

      const changeSelectAll = useMutation({
            mutationKey: ['v1/api/cart/cart-change-select-all'],
            mutationFn: (value: boolean) => CartService.selectAllCart(value),
            onSuccess: (axiosResponse) => {
                  queryClient.invalidateQueries({
                        queryKey: ['v1/api/cart/cart-get-my-cart'],
                  })
                  dispatch(fetchUser({ user: axiosResponse.data.metadata.user }))

                  queryClient.invalidateQueries({
                        queryKey: ['v1/api/cart/cart-pay'],
                  })
            },
      })

      const onChangeSelectAll = (e: CheckboxChangeEvent) => {
            changeSelectAll.mutate(e.target.checked)
      }

      console.log()

      useEffect(() => {
            if (user.isCartSelectAll) {
                  setCartSelectPay(() => {
                        let array
                        array = getMyCart.data?.data.metadata.cart.map((cartItem) => {
                              return { _id: cartItem._id, cart_product_price: cartItem.cart_product_price }
                        })
                        return array as unknown as Pick<TCart, '_id' | 'cart_product_price'>[]
                  })
            }
      }, [getMyCart.isSuccess, getMyCart.data?.data.metadata.cart, user.isCartSelectAll])

      if (!user) {
            return (
                  <div className='h-[calc(100vh-100px)] w-full'>
                        <AuthPermission />
                  </div>
            )
      }

      return (
            <div className='w-full max-w-full h-max min-h-[2000px] flex gap-[12px] text-[13px]'>
                  <div className='px-[15px] w-full pb-[10px]  h-max flex flex-col gap-x-[24px] min-h-[2000px]'>
                        <h3 className='font-extrabold uppercase text-[20px]'>Giỏ hàng</h3>
                        <div className='sticky top-[70px] xl:top-[-2px] bg-[#efefef] w-full  xl:w-[75.75%] py-[16px] h-[70px] items-center z-[10]'>
                              <div className='bg-[#ffffff] rounded h-[36px] px-[12px] flex items-center'>
                                    <div className='flex gap-[8px] flex-1 items-center'>
                                          <Checkbox
                                                onChange={onChangeSelectAll}
                                                defaultChecked={user.isCartSelectAll}
                                                checked={user.isCartSelectAll}
                                          ></Checkbox>
                                          <span>
                                                Tất cả {'('} {getMyCart.isSuccess && getMyCart.data.data.metadata.cart.length} sản phẩm{' '}
                                                {')'}
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
                                          getMyCart.data.data.metadata.cart.length > 0 &&
                                          getMyCart.data.data.metadata.cart.map((cartItem, index) => {
                                                return (
                                                      <CartItem
                                                            cart={cartItem}
                                                            cart_check_all={changeSelectAll.data?.data.metadata.cart[index] as TCart}
                                                            setCartSelectPay={setCartSelectPay}
                                                      />
                                                )
                                          })}
                              </div>
                              <div className='w-[40%] xl:w-[23%] min-h-screen flex flex-col gap-[16px] '>
                                    <div className='w-full h-[200px] xl:h-[150px] bg-[#ffffff] flex flex-col p-[8px]  xl:p-[16px] rounded text-[12px] xl:text-[14px]'>
                                          <div className='flex justify-between h-[30%] items-center text-[14px] xl:text-[20px]'>
                                                <h4>Giao tới</h4>
                                                <span>Thay đổi</span>
                                          </div>
                                          <div className='flex flex-col xl:flex-row w-max gap-[8px] h-[30%] items-start xl:items-center'>
                                                <span>{user?.fullName || user?.nickName || 'Tên'} </span>
                                                <span>{user?.email}</span>
                                          </div>
                                          <div className='flex  flex-col xl:flex-row gap-[8px] h-[30%]'>
                                                <span>Nhà</span>
                                                <span>93 Hồ Văn Huê, Phường 09, Quận Phú Nhuận, Hồ Chí Minh</span>
                                          </div>
                                    </div>

                                    <div className='sticky top-[120px] xl:top-0 flex flex-col gap-[16px] bg-[#efefef] w-full h-max pt-[12px]'>
                                          <CartPayMini />
                                    </div>
                              </div>
                        </div>

                        {getMyCart.isSuccess && getMyCart.data.data.metadata.cart.length === 0 && <p>Giỏ hàng hiện tại đang trống</p>}
                  </div>
            </div>
      )
}

export default Cart
