import { useQuery } from '@tanstack/react-query'
import React, { useState } from 'react'
import CartService from '../../apis/cart.service'
import CartItem from '../../component/Cart/CartItem'

type Tab = 'CART' | 'ORDER'

const sectionName: { text: string; code: Tab }[] = [
      {
            text: 'Sản phẩm trong giỏ',
            code: 'CART',
      },
      {
            text: 'Sản phẩm đã mua',
            code: 'ORDER',
      },
]

const CustomerOrderHistory = () => {
      const [active, setActive] = useState<Tab>('CART')
      const widthSection = `calc(100%/${sectionName.length})`
      const handleActive = (string: Tab) => {
            setActive(string)
      }

      const getMyCart = useQuery({
            queryKey: ['v1/api/cart/cart-get-my-cart'],
            queryFn: () => CartService.getMyCart(),
            // placeholderData: keepPreviousData,
      })

      return (
            <div className='relative flex flex-col  min-h-full h-max w-full'>
                  <div className='sticky top-[0px] h-[100px] bg-[#ffffff] flex flex-col gap-[8px]  pt-[16px] z-[10] shadow-xl'>
                        <div className='flex w-full h-full'>
                              {sectionName.map((section) => (
                                    <div
                                          style={{ width: widthSection }}
                                          className='w-full h-full bg-red-500 flex items-center justify-center'
                                          onClick={() => handleActive(section.code)}
                                    >
                                          {section.text}
                                    </div>
                              ))}
                        </div>
                        <div
                              style={{ width: widthSection, left: active === 'CART' ? 0 : widthSection }}
                              className={`bottom-0 absolute  h-[3px] bg-blue-600 transition-all duration-500`}
                        ></div>
                  </div>

                  <div className='flex-1 mt-[20px]'>
                        {active === 'CART' && getMyCart.isSuccess && getMyCart.data.data.metadata.cart ? (
                              <div className='w-full'>
                                    {getMyCart.data.data.metadata.cart.cart_products.map((product) => (
                                          <CartItem product={product} shop={product.shop_id} />
                                    ))}
                              </div>
                        ) : (
                              <div className='animate-pulse w-full h-[700px] bg-slate-200'></div>
                        )}
                  </div>
            </div>
      )
}

export default CustomerOrderHistory
