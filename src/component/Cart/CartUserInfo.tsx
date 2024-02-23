import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../store'
import { UserResponse } from '../../types/user.type'

const CartUserInfo = () => {
      const user = useSelector((state: RootState) => state.authentication.user) as UserResponse

      return (
            <div className='w-full h-[200px] xl:h-[150px] bg-[#ffffff] flex flex-col p-[8px]  xl:p-[16px] rounded text-[12px] xl:text-[14px]'>
                  <div className='flex justify-between h-[30%] items-center text-[14px] xl:text-[16px]'>
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
      )
}

export default CartUserInfo
