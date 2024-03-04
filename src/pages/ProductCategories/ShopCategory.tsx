import React, { useRef, useState } from 'react'
import { ShopResponse } from '../../types/shop.type'
import { ArrowLeft, ArrowRight } from 'lucide-react'
// import { shopData } from './books/utils/shopImageData'

// import shop_thumb1 from '../assets/img/ShopCategory/thumb1png.png'
// import shop_thumb2 from '../assets/img/ShopCategory/thum2png.png'

type TProps = {
      shops: ShopResponse[]
}

const ShopCategory = (props: TProps) => {
      const { shops } = props

      const wrapperRef = useRef<HTMLDivElement>(null)
      const [positionWrapper, setPositionWrapper] = useState<number>(0)
      const [countTranslate, setCountTranslate] = useState<number>(1)
      const ShopCount = Math.ceil(shops?.length / 2) || 0
      console.log({ ShopCount })
      const onTranslateNext = () => {
            if (wrapperRef.current) {
                  const width = wrapperRef.current.getBoundingClientRect().width
                  const x = wrapperRef.current.getBoundingClientRect().left
                  const newPositionWrapper = positionWrapper - width
                  wrapperRef.current.style.transform = `translateX(${newPositionWrapper}px)`
                  wrapperRef.current.style.transition = ' all 1s'
                  setPositionWrapper(newPositionWrapper)
                  if (countTranslate === ShopCount) return
                  setCountTranslate((prev) => prev + 1)
            }
      }

      const onTranslatePrev = () => {
            if (wrapperRef.current) {
                  const width = wrapperRef.current.getBoundingClientRect().width
                  const x = wrapperRef.current.getBoundingClientRect().left
                  const newPositionWrapper = positionWrapper + width

                  wrapperRef.current.style.transform = `translateX(${newPositionWrapper}px)`
                  wrapperRef.current.style.transition = ' all 1s'
                  setPositionWrapper(newPositionWrapper)
                  if (countTranslate === 1) return
                  setCountTranslate((prev) => prev - 1)
            }
      }

      return (
            <div className='relative w-full h-[200px] rounded  xl:overflow-hidden'>
                  <div className=' flex gap-[16px] h-full w-[350px] xl:w-full overflow-scroll xl:overflow-visible' ref={wrapperRef}>
                        {/* <div className='min-w-[50%]'>
                              <img src={shop_thumb1} className='w-full h-full' alt='' />
                              <img src='../books/assets/img' alt='' />
                        </div>

                        <div className='min-w-[50%]'>
                              <img src={shop_thumb2} className='w-full h-full' alt='' />
                        </div> */}
                        {shops?.map((shop) => (
                              <div key={shop._id} className='flex gap-[24px] min-w-[100%]  xl:min-w-[50%]'>
                                    <div className='relative w-[46%] xl:w-[36%] flex  items-center justify-center overflow-hidden'>
                                          <div
                                                style={{
                                                      backgroundImage: `url(${shop.shop_avatar?.secure_url || shop.shop_avatar_default}) `,
                                                      filter: 'blur(50px)',
                                                }}
                                                className='min-w-full w-full h-full'
                                          ></div>
                                          <img
                                                src={shop.shop_avatar?.secure_url || shop.shop_avatar_default}
                                                className='absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] z-1 w-[70px] h-[70px] xl:w-[140px] xl:h-[140px] rounded'
                                                alt='avatar_shop'
                                          />
                                    </div>
                                    <div className='w-[60%] flex flex-col justify-center'>
                                          <h4>Cửa hàng: {shop.shop_name} </h4>
                                    </div>
                              </div>
                        ))}
                  </div>
                  <button
                        className='absolute  border-[1px] border-blue-100 left-[0px]  bg-gray-300 h-[60px] w-[36px] top-[50%] translate-y-[-50%] hidden xl:flex items-center justify-center shadow-lg'
                        onClick={onTranslatePrev}
                        disabled={countTranslate === 1}
                  >
                        <ArrowLeft size={20} color='white' />
                  </button>
                  <button
                        className='absolute  border-[1px] border-blue-100 right-[0px]  bg-gray-300 h-[60px] w-[36px] top-[50%] translate-y-[-50%] hidden xl:flex items-center justify-center shadow-lg'
                        onClick={onTranslateNext}
                        disabled={countTranslate === ShopCount}
                  >
                        <ArrowRight size={20} color='white' />
                  </button>
            </div>
            // <div className='w-[50%] bg-blue-800'></div>
      )
}

export default ShopCategory
