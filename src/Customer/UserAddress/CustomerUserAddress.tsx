import { MapPinOff } from 'lucide-react'
import React, { useState } from 'react'
import BoxButton from '../../component/BoxUi/BoxButton'
import FormAddress from '../../forms/FormAddress'
import { useSelector } from 'react-redux'
import { RootState } from '../../store'
import { UserResponse } from '../../types/user.type'
import AddressItem from './AddressItem'

const CustomerUserAddress = () => {
      const [openFormAddress, setOpenFormAddress] = useState<boolean>(false)

      const user = useSelector((state: RootState) => state.authentication.user) as UserResponse

      return (
            <div className='w-full px-[18px] py-[8px] flex flex-col gap-[20px]'>
                  {user.user_address.length === 0 && (
                        <div className='w-full flex flex-col gap-[24px] justify-center items-center py-[50px]'>
                              <header className='w-full h-max flex justify-center gap-[16px] '>
                                    <MapPinOff />
                                    <span>Bạn chưa thêm bất kì địa chỉ nào, nhấn vào "Thêm địa chỉ" để cập nhập nhé</span>
                              </header>
                              <div className='h-[40px]'>
                                    <BoxButton
                                          content={`${openFormAddress ? 'Ẩn Form' : 'Thêm địa chỉ'}`}
                                          onClick={() => setOpenFormAddress((prev) => !prev)}
                                    />
                              </div>
                        </div>
                  )}
                  {user.user_address.length > 0 &&
                        user.user_address.map((address, index) => {
                              return <AddressItem key={address._id} address={address} index={index} />
                        })}

                  <div className='w-[150px] h-[40px]'>
                        <BoxButton
                              content={`${openFormAddress ? 'Ẩn Form' : 'Thêm địa chỉ'}`}
                              onClick={() => setOpenFormAddress((prev) => !prev)}
                        />
                  </div>
                  {openFormAddress && <FormAddress />}
            </div>
      )
}

export default CustomerUserAddress
