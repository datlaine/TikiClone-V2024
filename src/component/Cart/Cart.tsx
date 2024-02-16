import { useQuery } from '@tanstack/react-query'
import React, { useEffect } from 'react'
import CartService from '../../apis/cart.service'
import { Link } from 'react-router-dom'
import { Checkbox } from 'antd'
import { ChevronRight, Home, Trash2 } from 'lucide-react'
import { DateTimeFromString } from '../../utils/datetime.util'
import BoxCountProduct from '../ui/BoxCountProduct'

const Cart = () => {
      const getMyCart = useQuery({
            queryKey: ['v1/api/cart/cart-get-my-cart'],
            queryFn: () => CartService.getMyCart(),
      })

      useEffect(() => {
            if (getMyCart.isSuccess) {
            }
      }, [getMyCart.isSuccess])

      return (
            <div className='h-max min-h-[2000px] flex gap-[24px]'>
                  <div className='px-[15px] py-[10px] w-[70%] h-max flex flex-col gap-[24px] min-h-[2000px]'>
                        <h3 className='font-extrabold uppercase'>Giỏ hàng</h3>
                        <div className='sticky top-[0px] bg-[#efefef]  w-full py-[16px] h-[70px] items-center z-[10]'>
                              <div className='bg-[#ffffff] rounded h-[36px] px-[12px] flex items-center'>
                                    <div className='flex gap-[8px] flex-1 items-center'>
                                          <Checkbox></Checkbox>
                                          <span>
                                                Tất cả {'('} {getMyCart.isSuccess && getMyCart.data.data.metadata.cart.length} sản phẩm{' '}
                                                {')'}
                                          </span>
                                    </div>
                                    <div className='basis-[180px]'>
                                          <span>Đơn giá</span>
                                    </div>
                                    <div className='basis-[120px]'>
                                          <span>Số lượng</span>
                                    </div>
                                    <div className='basis-[120px]'>
                                          <span>Thành tiền</span>
                                    </div>
                                    <div className='basis-[20px]'>
                                          <Trash2 />
                                    </div>
                              </div>
                        </div>
                        {getMyCart.isSuccess && getMyCart.data.data.metadata.cart.length > 0 && (
                              <div className='flex flex-col gap-[24px]'>
                                    {getMyCart.data.data.metadata.cart.map((cartItem) => {
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
                                                                              src={cartItem.cart_product_id.product_thumb_image.secure_url}
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
                                                                  <BoxCountProduct />
                                                                  {/* <span>{cartItem.cart_price}</span> */}
                                                                  {/* <span>{cartItem.cart_quantity}</span> */}
                                                            </div>
                                                            <div className='w-[120px]'>{cartItem.cart_price}</div>
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
                        )}
                        {getMyCart.isSuccess && getMyCart.data.data.metadata.cart.length === 0 && <p>Giỏ hàng hiện tại đang trống</p>}
                  </div>
                  <div className='w-[25%] h-[500px] bg-blue-400'></div>
            </div>
      )
}

export default Cart
