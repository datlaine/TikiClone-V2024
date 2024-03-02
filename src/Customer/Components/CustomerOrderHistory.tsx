import { useQuery } from '@tanstack/react-query'
import React, { useEffect, useRef, useState } from 'react'
import CartService from '../../apis/cart.service'
import CartItem from '../../component/Cart/CartItem'
import OrderHistory from '../order/OrderHistory'
import OrderCart from '../order/OrderCart'
import OrderComment from '../order/OrderComment'

type Tab = 'CART' | 'ORDER' | 'Comment'

const sectionName: { text: string; code: Tab }[] = [
      {
            text: 'Sản phẩm trong giỏ',
            code: 'CART',
      },
      {
            text: 'Sản phẩm đã mua',
            code: 'ORDER',
      },

      {
            text: 'Các đánh giá của bạn',
            code: 'Comment',
      },
]

const CustomerOrderHistory = () => {
      const [active, setActive] = useState<Tab>('CART')

      const widthSection = `calc(100%/${sectionName.length})`
      const [indexActive, setIndexActive] = useState<number>(0)
      const wrapperOrderRef = useRef<HTMLDivElement>(null)

      const handleActive = (string: Tab, index: number) => {
            setActive(string)
            setIndexActive(index)
            if (wrapperOrderRef.current) {
                  const width = wrapperOrderRef.current.getBoundingClientRect().width
                  wrapperOrderRef.current.style.transform = `translate3d(${-width * index - 1 + 1}px,0,0)`
                  wrapperOrderRef.current.style.transition = `all .2s`
            }
      }

      const styleEffect = {
            left: indexActive === 0 ? 0 : `calc(100%/${sectionName.length}*${indexActive})`,
      }

      return (
            <div className='relative flex flex-col  min-h-full h-max w-full text-[12px] xl:text-[14px]'>
                  <div className='sticky top-[75px] xl:top-[-1px] pt-[16px] xl:pt-0 h-[45px] bg-[#ffffff] flex flex-col gap-[8px]   z-[10] border-b-[1px] border-[rgb(235_235_240)] '>
                        <div className='flex w-full h-full'>
                              {sectionName.map((section, index) => (
                                    <button
                                          key={section.code}
                                          style={{ width: widthSection }}
                                          className='w-full h-full  flex items-center justify-center'
                                          onClick={() => handleActive(section.code, index)}
                                    >
                                          {section.text}
                                    </button>
                              ))}
                        </div>
                        <div
                              style={{
                                    width: widthSection,
                                    left: styleEffect.left,
                              }}
                              className={`bottom-0 absolute  h-[3px] bg-blue-600 transition-all duration-200`}
                        ></div>
                  </div>

                  <div className='flex-1 mt-[20px]'>
                        <div className='w-full overflow-x-hidden'>
                              <div style={{ width: '100%' }} ref={wrapperOrderRef} className='flex'>
                                    {/* {active === 'CART' &&  */}
                                    <div className='min-w-full max-w-full w-full'>{active === 'CART' && <OrderCart />}</div>
                                    <div className='min-w-full max-w-full w-full'>{active === 'ORDER' && <OrderHistory />}</div>

                                    <div className='min-w-full'>{active === 'Comment' && <OrderComment />}</div>
                                    {/* } */}

                                    {/* {active === 'ORDER' */}
                                    {/* && */}
                                    {/* } */}
                              </div>
                        </div>
                        <div className='w-full h-[5000px] bg-red-800'></div>
                  </div>
            </div>
      )
}

export default CustomerOrderHistory
