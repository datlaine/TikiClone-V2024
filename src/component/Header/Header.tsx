import React, { memo, useRef, useState } from 'react'

import { useEffect } from 'react'
import SeacrhInput from './Components/HeaderSearch'
import HeaderActions from './Components/HeaderActions'
import HeaderCart from './Components/HeaderCart'
import HeaderTagsLocation from './Components/HeaderTagsLocation'
import HeaderLogoToggle from './Components/HeaderLogoToggle'
import HeaderSeacrhInput from './Components/HeaderSearch'
import { useLocation } from 'react-router-dom'
import { throttle } from 'lodash'
import { useSelector } from 'react-redux'
import { RootState } from '../../store'
import { UserResponse } from '../../types/user.type'
import { renderStringAddress, renderStringAddressDetail } from '../../utils/address.util'

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
      const user = useSelector((state: RootState) => state.authentication.user) as UserResponse

      useEffect(() => {
            window.scrollTo(0, 0)
      }, [])

      const address_default = (user?.user_address && user?.user_address.filter((address) => address.address_default === true)) || ''

      return (
            <>
                  <div className={`fixed lg:static top-0 left-0 w-full z-[100] bg-white shadow-xl`}>
                        <div className='h-[75px] lg:h-[100px] py-2 px-8 bg-white flex items-center gap-3 lg:gap-0'>
                              <div className='basis-[7%] flex items-center'>
                                    <HeaderLogoToggle />
                              </div>
                              <div className=' grow flex h-full'>
                                    <div className='grow flex flex-col'>
                                          <HeaderSeacrhInput />
                                          <HeaderTagsLocation />
                                    </div>
                                    <div className='hidden lg:flex lg:flex-col lg:justify-between lg:basis-[36%] ml-[50px] h-full'>
                                          <HeaderActions />
                                          <div
                                                id=''
                                                className=' flex items-center  text-[14px] text-[#000] w-[500px] truncate  '
                                                title={`${address_default ? renderStringAddressDetail(address_default[0]) : ' ...'}`}
                                          >
                                                <img
                                                      src='https://salt.tikicdn.com/ts/upload/88/5c/9d/f5ee506836792eb7775e527ef8350a44.png'
                                                      alt='Location'
                                                      width={25}
                                                      height={25}
                                                      className='mr-[4px]'
                                                />
                                                <span className='text-[12px] text-slate-500'>
                                                      Giao đến: {address_default ? renderStringAddressDetail(address_default[0]) : ' ...'}
                                                </span>
                                          </div>
                                    </div>
                                    <div className='basis-[14%] xl:basis-[10%] xl:self-start '>
                                          <HeaderCart />
                                    </div>
                              </div>
                        </div>
                  </div>
            </>
      )
}

export default memo(Header)
