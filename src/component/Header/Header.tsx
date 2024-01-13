import React, { useRef, useState } from 'react'

import { useEffect } from 'react'
import SeacrhInput from './Components/HeaderSearch'
import HeaderActions from './Components/HeaderActions'
import HeaderCart from './Components/HeaderCart'
import HeaderTagsLocation from './Components/HeaderTagsLocation'
import HeaderLogoToggle from './Components/HeaderLogoToggle'
import HeaderSeacrhInput from './Components/HeaderSearch'
import { USER } from '../User/infoUser'
import { useLocation } from 'react-router-dom'
import { throttle } from 'lodash'

function HeaderSlogan() {
      return (
            <div id='HeaderSlogan' className='hidden 2xl:flex bg-[#ffe880] min-h-[40px] w-full  justify-center items-center pb-0 2xl:gap-1'>
                  <img
                        src='https://salt.tikicdn.com/ts/upload/5e/ec/fb/150f3c633781ed1da9921e45db90c62d.png'
                        alt=''
                        className='2xl:h-[12px]'
                  />

                  <span className='flex items-center h-full'>
                        mọi đơn từ <strong>{149}K</strong>. Áp dụng cho cả <strong>TikiNOW {2}h</strong>
                  </span>
            </div>
      )
}

function Header() {
      // console.log('props')
      const address = USER.userAddress
      // const count = useRef(0)
      // count.current += 1
      // console.log('HEADER')
      useEffect(() => {
            // console.log('count', count.current)
            window.scrollTo(0, 0)
      }, [])

      const [withWindow, setWithWindow] = useState(window.innerWidth)
      const pathName = useLocation().pathname
      console.log()

      useEffect(() => {
            const onResize = throttle(() => setWithWindow(window.innerWidth), 1000)
            window.addEventListener('resize', onResize)
            return () => {
                  window.removeEventListener('resize', onResize)
            }
      }, [setWithWindow])
      return (
            // <div
            //   id=''
            //   className='h-[60px] top-0 w-full fixed z-[500] bg-[#fff] px-1   lg:w-full  lg:h-16   xl:w-full xl:px-0 xl:flex xl:flex-col 2xl:h-[150px]  '
            // >
            //   <div className='2xl:basic-[60%] 2xl:flex 2xl:justify-center  flex-col dienThoai:p-0 dienThoai:w-full dienThoai:h-full lg:max-w-full  xl:px-[40px] lg:px-7'>
            //     <div className='flex min-w-full px-1 gap-1 items-center '>
            //       <HeaderLogoToggle />
            //       <div className='flex-1 2xl:flex 2xl:flex-col 2xl:gap-4'>
            //         <div className='ml-4 flex justify-center items-center gap-6 2xl:ml-0 2xl:gap-0'>
            //           <SeacrhInput />
            //           <HeaderActions />
            //           <HeaderCart />
            //         </div>
            //         <div id='' className='hidden 2xl:flex items-center justify-between'>
            //           <HeaderTagsLocation />
            //         </div>
            //       </div>
            //     </div>
            //   </div>
            //   <HeaderSlogan />
            // </div>
            <>
                  <div
                        className={`${
                              pathName.startsWith('/customer') && withWindow < 1024 ? 'hidden' : 'fixed'
                        } lg:static top-0 left-0 w-full z-[100] bg-white shadow-xl`}
                  >
                        <div className='h-[75px] lg:h-[100px] py-2 px-8 bg-white flex items-center gap-3 lg:gap-0'>
                              <div className='basis-[7%] flex items-center'>
                                    <HeaderLogoToggle />
                              </div>
                              <div className=' grow flex h-full'>
                                    <div className='grow flex flex-col'>
                                          <HeaderSeacrhInput />
                                          <HeaderTagsLocation />
                                    </div>
                                    <div className='hidden lg:flex lg:flex-col lg:justify-between lg:basis-[30%] lg:items-center h-full'>
                                          <HeaderActions />
                                          <div id='' className=' flex  text-[14px] text-[#000] '>
                                                <img
                                                      src='https://salt.tikicdn.com/ts/upload/88/5c/9d/f5ee506836792eb7775e527ef8350a44.png'
                                                      alt='Location'
                                                      width={25}
                                                      height={25}
                                                      className='mr-[4px]'
                                                />
                                                <span>Giao đến {address}</span>
                                          </div>
                                    </div>
                                    <div className='basis-[10%] '>
                                          <HeaderCart />
                                    </div>
                              </div>
                        </div>
                  </div>
            </>
      )
}

export default Header
