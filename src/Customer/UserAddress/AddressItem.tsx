import React, { useEffect, useRef, useState } from 'react'
import { UserAddress } from '../../types/user.type'
import { renderStringAddress, renderStringAddressDetail } from '../../utils/address.util'
import BoxButton from '../../component/BoxUi/BoxButton'
import { Anchor, Building2, Home, MoveHorizontal, TentTree, Trash, Trash2 } from 'lucide-react'
import { useMutation } from '@tanstack/react-query'
import AccountService from '../../apis/account.service'
import { useDispatch } from 'react-redux'
import { fetchUser } from '../../Redux/authenticationSlice'
import axios from 'axios'

type TProps = {
      address: UserAddress
      index: number
}

const AddressItem = (props: TProps) => {
      const { address, index } = props

      const [detailAddress, setDetailAdress] = useState<boolean>(false)
      const iframeRef = useRef<HTMLIFrameElement>(null)
      const dispatch = useDispatch()

      const setAddressDefaultMutation = useMutation({
            mutationKey: ['/v1/api/account/set-address-default'],
            mutationFn: (form: Pick<UserAddress, '_id'>) => AccountService.setAddressDefault(form),
            onSuccess: (axiosResponse) => {
                  const { user } = axiosResponse.data.metadata
                  dispatch(fetchUser({ user }))
            },
      })

      const deleteAddressMutation = useMutation({
            mutationKey: ['/v1/api/account/delete-address'],
            mutationFn: ({ address_id }: { address_id: string }) => AccountService.deleteAddress({ address_id }),
            onSuccess: (axiosResponse) => {
                  const { user } = axiosResponse.data.metadata

                  dispatch(fetchUser({ user }))
            },
      })

      const handleSetDefaultAddress = (_id: string) => {
            if (address.address_default) return
            setAddressDefaultMutation.mutate({ _id })
      }

      const handleDeleteAddress = (_id: string) => {
            deleteAddressMutation.mutate({ address_id: _id })
      }

      const openSearchGoogle = (address: string) => {
            window.open(
                  `https://google.com/search?q=${address}`,
                  '_blank',
                  'toolbar=yes, scrollbar=yes,resizeable=yes,top=200,left=200,width=600,height=400',
            )
      }

      useEffect(() => {
            if (iframeRef.current) {
                  const addressApi = `Phường ${address.address_ward} ${address.address_district} ${address._id}`
                  const src = `https://maps.google.com/maps?&q="+${addressApi}"&output=embed`

                  iframeRef.current.src = src
            }
      }, [detailAddress])

      const AddressType =
            address.address_type === 'Nhà' ? <Home /> : address.address_type === 'Công ty / cơ quan' ? <Building2 /> : <TentTree />

      const styleEffect = {
            btnAddressDefault: address.address_default
                  ? 'animate-Custome border-[2px] border-blue-700 rounded bg-[#fffff] text-blue-700 '
                  : ' border-[1px] border-blue-300 rounded  text-blue-300',
      }
      return (
            <div className='relative flex flex-col gap-[20px]' key={address._id}>
                  <div className='h-[30px] w-full flex items-center gap-[8px]'>
                        <span>Số địa chỉ: </span>
                        <span className='  bg-slate-900 text-white  w-[20px] h-[20px] rounded-full flex items-center justify-center'>
                              {index + 1}
                        </span>
                  </div>
                  <div className='flex flex-col gap-[24px] w-full '>
                        <div className='w-max flex flex-col xl:flex-row gap-[20px] xl:gap-[4px]'>
                              <span>Địa chỉ:</span>
                              <button
                                    className='  bg-blue-300 text-white p-[12px_6px] min-w-[50px] w-[auto] max-w-[400px] h-[20px] rounded flex items-center justify-center gap-[8px]'
                                    onClick={() =>
                                          openSearchGoogle(
                                                address.address_street +
                                                      ' Phường ' +
                                                      address.address_ward +
                                                      ' ' +
                                                      address.address_district +
                                                      ' ' +
                                                      address.address_province,
                                          )
                                    }
                              >
                                    <span>{address.address_street}</span>
                                    <p className='w-max flex gap-[2px] items-center'>
                                          <span>Phường/Xã:</span>
                                          <button
                                                className='  bg-blue-300 text-white p-[12px_6px] min-w-[20px] w-[auto] max-w-[250px] h-[20px] rounded flex items-center justify-center'
                                                onClick={() => openSearchGoogle(address.address_ward)}
                                          >
                                                {address.address_ward}
                                          </button>
                                    </p>
                              </button>
                              <div className='ml-[6px] flex gap-[6px] items-center'>
                                    {AddressType}
                                    <span>({address.address_type})</span>
                              </div>
                        </div>

                        <div className='flex flex-col xl:flex-row gap-[16px]  xl:gap-[4px]'>
                              <p className='w-max flex gap-[4px]'>
                                    <span>Quận/Huyện:</span>
                                    <button
                                          className='  bg-blue-300 text-white p-[12px_6px] min-w-[50px] w-[auto] max-w-[250px] h-[20px] rounded flex items-center justify-center'
                                          onClick={() => openSearchGoogle(address.address_district)}
                                    >
                                          {address.address_district}
                                    </button>
                              </p>

                              <p className='w-max flex gap-[4px]'>
                                    <span>Tỉnh/Thành phố:</span>
                                    <button
                                          className='  bg-blue-300 text-white p-[12px_6px] min-w-[50px] w-[auto] max-w-[250px] h-[20px] rounded flex items-center justify-center'
                                          onClick={() => openSearchGoogle(address.address_province)}
                                    >
                                          {address.address_province}
                                    </button>
                              </p>
                        </div>
                        {/* <p>{renderStringAddressDetail(address)}</p> */}
                        <div className='w-[120px] h-[36px]'>
                              <BoxButton
                                    content={`${detailAddress ? 'Đóng bản đồ' : 'Xem bản đồ'}`}
                                    onClick={() => setDetailAdress((prev) => !prev)}
                              />
                        </div>
                  </div>

                  {detailAddress && (
                        <div>
                              <iframe
                                    ref={iframeRef}
                                    title='address'
                                    className='mt-[30px] w-full xl:w-[70%] h-[350px] animate-mountComponent'
                                    loading='lazy'
                                    referrerPolicy='no-referrer-when-downgrade'
                              ></iframe>
                        </div>
                  )}
                  <div className='mt-[16px] w-[calc(100%+36px)] ml-[-18px] bg-slate-200 h-[1px]'></div>
                  <div className='absolute top-0 xl:top-[20px] right-0 xl:right-[20px] flex items-center gap-[12px]'>
                        <button
                              className={`${styleEffect.btnAddressDefault} w-[145px] xl:w-[180px] h-[32px] xl:px-[12px] xl:py-[6px]  flex items-center justify-center gap-[6px]`}
                              onClick={() => handleSetDefaultAddress(address._id)}
                        >
                              <span>{address.address_default ? 'Địa chỉ mặc định' : 'Đặt làm mặc định'}</span>
                              {address.address_default && <Anchor size={15} />}
                        </button>
                        <Trash2
                              className=''
                              onClick={() => {
                                    handleDeleteAddress(address._id)
                              }}
                        />
                  </div>
            </div>
      )
}

export default AddressItem
