import { useQuery } from '@tanstack/react-query'
import React, { useEffect } from 'react'
import CartService from '../../apis/cart.service'
import { Link } from 'react-router-dom'
import { Checkbox } from 'antd'
import { AlertCircle, ChevronRight, Home, Ticket, Trash2 } from 'lucide-react'
import { DateTimeFromString } from '../../utils/datetime.util'
import BoxCountProduct from '../ui/BoxCountProduct'
import WrapperCountProduct from '../ui/WrapperCountProduct'
import { useSelector } from 'react-redux'
import { RootState } from '../../store'
import { TUser } from '../../types/axiosResponse'
import AuthPermission from '../Auth/AuthPermission'

const Cart = () => {
      const user = useSelector((state: RootState) => state.authentication.user) as TUser

      const getMyCart = useQuery({
            queryKey: ['v1/api/cart/cart-get-my-cart'],
            queryFn: () => CartService.getMyCart(),
      })

      useEffect(() => {
            if (getMyCart.isSuccess) {
            }
      }, [getMyCart.isSuccess])

      if (!user) {
            return (
                  <div className='h-[calc(100vh-100px)] w-full'>
                        <AuthPermission />
                  </div>
            )
      }

      return (
            <div className='w-full h-max min-h-[2000px] flex gap-[12px] text-[13px]'>
                  <div className='px-[15px] w-full pb-[10px]  h-max flex flex-col gap-x-[24px] min-h-[2000px]'>
                        <h3 className='font-extrabold uppercase text-[20px]'>Giỏ hàng</h3>
                        <div className='sticky top-[150px] xl:top-[-2px] bg-[#efefef] w-full  xl:w-[75.75%] py-[16px] h-[70px] items-center z-[10]'>
                              <div className='bg-[#ffffff] rounded h-[36px] px-[12px] flex items-center'>
                                    <div className='flex gap-[8px] flex-1 items-center'>
                                          <Checkbox></Checkbox>
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
                              <div className='flex flex-col w-[77%] gap-[24px]'>
                                    {getMyCart.isSuccess &&
                                          getMyCart.data.data.metadata.cart.length > 0 &&
                                          getMyCart.data.data.metadata.cart.map((cartItem) => {
                                                return (
                                                      <div
                                                            className='min-h-[250px] h-[250px] flex flex-col gap-[16px] bg-[#ffffff] px-[12px]'
                                                            key={cartItem._id}
                                                      >
                                                            {/* <div className=''> */}
                                                            <div className='flex gap-[8px] h-[20%] items-center'>
                                                                  <Checkbox></Checkbox>
                                                                  <Home />
                                                                  <span>{cartItem.cart_product_id.product_name}</span>
                                                                  <ChevronRight />
                                                            </div>
                                                            {/* </div> */}
                                                            <div className='max-h-[50%] h-[50%] w-full flex'>
                                                                  <div className='flex-1 flex gap-[16px]'>
                                                                        <Checkbox className='z-[5]' />
                                                                        <Link
                                                                              className='inline-block w-[120px] full'
                                                                              to={`/product/${cartItem.cart_product_id._id}`}
                                                                        >
                                                                              <img
                                                                                    src={
                                                                                          cartItem.cart_product_id.product_thumb_image
                                                                                                .secure_url
                                                                                    }
                                                                                    className='max-w-full max-h-full h-full'
                                                                                    alt='product'
                                                                              />{' '}
                                                                        </Link>
                                                                        <div className='flex-1 flex flex-col content-between'>
                                                                              <span>{cartItem.cart_product_id.product_name}</span>
                                                                              <span>{cartItem.cart_product_id.product_price}</span>
                                                                        </div>
                                                                  </div>

                                                                  <div className='w-[180px]'>{cartItem.cart_product_id.product_price}</div>
                                                                  <div className='w-[120px] h-full '>
                                                                        {/* <BoxCountProduct /> */}
                                                                        <WrapperCountProduct
                                                                              cart_id={cartItem._id}
                                                                              cart_quantity={cartItem.cart_quantity}
                                                                        />
                                                                        {/* <span>{cartItem.cart_price}</span> */}
                                                                        {/* <span>{cartItem.cart_quantity}</span> */}
                                                                  </div>
                                                                  <div className='w-[120px]'>{cartItem.cart_product_price}</div>
                                                                  <div className='w-[20px]'>
                                                                        <Trash2 />
                                                                  </div>
                                                            </div>
                                                            <div className='max-h-[20%]'>
                                                                  Thêm vào lúc: {DateTimeFromString(cartItem.cart_date)}
                                                            </div>
                                                      </div>
                                                )
                                          })}
                              </div>
                              <div className='w-[23%] min-h-screen flex flex-col gap-[16px] '>
                                    <div className='w-full h-[150px] bg-[#ffffff] flex flex-col  p-[16px] rounded text-[14px]'>
                                          <div className='flex justify-between h-[30%] items-center text-[20px]'>
                                                <h4>Giao tới</h4>
                                                <span>Thay đổi</span>
                                          </div>
                                          <div className='flex w-max gap-[8px] h-[30%] items-center'>
                                                <span>{user?.fullName || user?.nickName || 'Tên'} </span>
                                                <span>{user?.email}</span>
                                          </div>
                                          <div className='flex gap-[8px] h-[30%]'>
                                                <span>Nhà</span>
                                                <span>93 Hồ Văn Huê, Phường 09, Quận Phú Nhuận, Hồ Chí Minh</span>
                                          </div>
                                    </div>
                                    <div className='w-full h-[110px] bg-[#ffffff] p-[16px] rounded'>
                                          <div className='h-[50%] flex items-center gap-[8px] justify-between'>
                                                <span className=''>Tiki khuyến mãi</span>
                                                <p className='flex items-center gap-[8px]'>
                                                      Có thể chọn [null]
                                                      <AlertCircle size={12} />
                                                </p>
                                          </div>
                                          <div className='h-[50%] flex items-center gap-[8px] text-blue-400'>
                                                <Ticket />
                                                <span>Chọn hoặc nhập Khuyến mãi khác</span>
                                          </div>
                                    </div>

                                    <div className='sticky top-0 flex flex-col gap-[16px] bg-[#efefef] w-full h-max pt-[12px]'>
                                          <div className='h-[180px] bg-[#ffffff] rounded p-[16px]'>
                                                <div className='h-[49%] flex flex-col justify-center'>
                                                      <p className='w-full flex justify-between'>
                                                            <span>Tạm tính</span>
                                                            <span>1252.000</span>
                                                      </p>
                                                      <p className='w-full flex justify-between'>
                                                            <span>Giảm giá </span>
                                                            <span>-15000</span>
                                                      </p>
                                                </div>

                                                <div className='w-[calc(100%+32px)]  ml-[-16px] '>
                                                      <div className='w-full h-[1px] bg-slate-100'></div>
                                                </div>
                                                <div className='h-[49%] flex flex-col justify-center '>
                                                      <div className='flex justify-between '>
                                                            <span>Tổng tiền</span>
                                                            <span>152.555</span>
                                                      </div>
                                                      <span className='block w-full text-right'>(Đã bao gồm VAT nếu có)</span>
                                                </div>
                                          </div>
                                          <button className='w-full h-[45px] flex items-center justify-center bg-red-600 text-white rounded-md'>
                                                Mua ngay
                                          </button>
                                    </div>
                              </div>
                        </div>

                        {getMyCart.isSuccess && getMyCart.data.data.metadata.cart.length === 0 && <p>Giỏ hàng hiện tại đang trống</p>}
                  </div>
            </div>
      )
}

export default Cart
