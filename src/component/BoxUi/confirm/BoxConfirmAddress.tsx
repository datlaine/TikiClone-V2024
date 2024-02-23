import React, { SetStateAction, useEffect, useState } from 'react'
import { X } from 'lucide-react'
import { Radio, RadioChangeEvent } from 'antd'
import Portal from '../../Portal'
import FormAddress from '../../../forms/FormAddress'
import { useSelector } from 'react-redux'
import { RootState } from '../../../store'
import { UserResponse } from '../../../types/user.type'
import { renderStringAddress, renderStringAddressDetail } from '../../../utils/address.util'
import { Span } from 'next/dist/trace'

type TProps = {
      setOpenModal: React.Dispatch<SetStateAction<boolean>>
}

const BoxConfirmAddress = (props: TProps) => {
      const user = useSelector((state: RootState) => state.authentication.user) as UserResponse
      const address_default = (user?.user_address && user?.user_address.filter((address) => address.address_default === true)) || ''
      const [valueAddress, setValueAddress] = useState<string>(address_default[0]?._id || '')

      const { setOpenModal } = props
      const [addNew, setAddNew] = useState<boolean>(false)

      const handleCloseModal = () => {
            setOpenModal(false)
      }

      const onSuccessAddAddress = (id: string) => {
            setAddNew(true)
            setValueAddress(id)
      }

      // useEffect(() => {}, [valueRadioDefault])

      console.log({ addNew })

      const handleChangeRadio = (e: RadioChangeEvent) => {
            console.log({ radio: e.target.value })
            setValueAddress(e.target.value)
      }

      // console.log({ valueRadioDefault, array: user?.user_address[user?.user_address.length - 1]._id })

      return (
            <Portal>
                  <div className='fixed inset-0 bg-[rgba(0,0,0,.45)] flex justify-center items-center'>
                        <div className='relative w-full xl:w-[600px] min-h-[370px] h-max bg-[#ffffff] p-[12px_8px]  xl:p-[24px_12px] mx-[16px] xl:mx-0 mt-[120px] xl:mt-0 rounded'>
                              <div className='flex flex-col gap-[10px] h-full'>
                                    <div className='basis-[80%] bg-white rounded-lg  py-[12px] flex flex-col gap-[12px]'>
                                          <header className='text-[20px] font-medium text-center'>Địa chỉ giao hàng</header>
                                          <div className='w-full h-[1px] bg-gray-100'></div>
                                          <div className='px-[36px] mt-[24px] text-[14px]'>
                                                <span>
                                                      Hãy chọn địa chỉ nhận hàng để được dự báo thời gian giao hàng cùng phí đóng gói, vận
                                                      chuyển một cách chính xác nhất.
                                                </span>
                                          </div>
                                          {user && user?.user_address && (
                                                <div className='px-[36px] mt-[24px] '>
                                                      <Radio.Group
                                                            className='flex flex-col gap-[8px]'
                                                            onChange={handleChangeRadio}
                                                            value={valueAddress}
                                                            defaultValue={valueAddress}
                                                      >
                                                            {user?.user_address.map((address, index) => {
                                                                  return (
                                                                        <div key={address._id}>
                                                                              <Radio
                                                                                    value={address._id}
                                                                                    defaultChecked={address.address_default}
                                                                              >
                                                                                    <span>
                                                                                          {renderStringAddressDetail(address)!.replace(
                                                                                                'Địa chỉ:',
                                                                                                '',
                                                                                          ) || ''}
                                                                                    </span>
                                                                                    {addNew && user?.user_address.length === index + 1 && (
                                                                                          <span className='ml-[6px] inline-block bg-blue-400 rounded-md p-[2px] text-white'>
                                                                                                new
                                                                                          </span>
                                                                                    )}
                                                                              </Radio>
                                                                        </div>
                                                                  )
                                                            })}

                                                            <Radio value={'Other'}>Chọn địa chỉ khác</Radio>
                                                      </Radio.Group>
                                                </div>
                                          )}

                                          {valueAddress === 'Other' && <FormAddress onSuccessAddAddress={onSuccessAddAddress} />}
                                    </div>
                              </div>
                              <button
                                    className='absolute top-[-15px] right-[-15px] w-[30px] h-[30px] border-[1px] border-gray-300 bg-white rounded-full flex items-center justify-center'
                                    onClick={handleCloseModal}
                              >
                                    <X color='gray' />
                              </button>
                        </div>
                  </div>
            </Portal>
      )
}

export default BoxConfirmAddress
