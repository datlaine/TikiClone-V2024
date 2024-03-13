import React, { useState } from 'react'
import OwnerShopFilterName from './Filter/OwnerShopFilterName'
import { ShopResponse } from '../../../types/shop.type'
import BoxAvatarMode from '../../Account/Box/BoxAvatarMode'
import BoxRegisterShop from '../../../component/BoxUi/BoxShopForm'
import BoxShopForm from '../../../component/BoxUi/BoxShopForm'
import { useSelector } from 'react-redux'
import { RootState } from '../../../store'
import { UserResponse } from '../../../types/user.type'

type TProps = {
      shop: ShopResponse
}

type FilterMode = 'NAME' | 'TYPE' | 'BEST_SELLER'

const ShopOwnerLayout = (props: TProps) => {
      const { shop } = props
      const user = useSelector((state: RootState) => state.authentication.user) as UserResponse
      const [filterMode, setfilterMode] = useState<FilterMode>()
      const [openForm, setOpenForm] = useState<boolean>(false)
      const defaultValues = user?.isOpenShop
            ? { shop_name: shop.shop_name, shop_avatar: shop.shop_avatar?.secure_url }
            : { shop_name: '', shop_avatar: '' }
      console.log({ shop })

      return (
            <div className='relative w-full min-h-[200px] h-max flex flex-col'>
                  <div className='relative w-full h-[160px] xl:h-[100px] bg-white flex items-center justify-center'>
                        <p className='tracking-[4px] text-[18px] mt-[-60px] xl:mt-0'>{shop.shop_name}</p>
                        <button
                              className='absolute bottom-[10px] right-[20px] min-w-[150px] w-max h-[40px] p-[8px_14px] bg-slate-800 text-white'
                              onClick={() => setOpenForm(true)}
                        >
                              Chỉnh sửa thông tin
                        </button>
                  </div>
                  <div className='relative w-full min-h-[140px] py-[30px] xl:py-0 h-max bg-[#FFA500] flex items-center'>
                        <div className='absolute top-[-50%] translate-y-[137%] xl:translate-y-0 left-[20px]  xl:left-[60px]  w-[70px] h-[70px] xl:h-[140px] xl:w-[140px] rounded-full'>
                              <BoxAvatarMode
                                    AvatartSource={{ avatar: shop.shop_avatar?.secure_url, avatar_default: shop.shop_avatar_default }}
                                    widthImage='w-[140px]'
                                    heightImage='h-[140px]'
                                    Mode='SHOP'
                              />
                              {/* <img src={shop.shop_avatar_default} className='h-full w-full rounded-full' alt='shop_image' /> */}
                        </div>

                        <ul className='ml-[20px] mt-[100px] xl:mt-0 xl:ml-[240px] flex flex-col xl:flex-row min-h-[40px] xl:items-center gap-[16px]'>
                              <li
                                    className='px-[16px] py-[12px]  bg-white  rounded-lg hover:bg-slate-900 hover:text-white transition-all duration-500'
                                    onClick={() => setfilterMode('NAME')}
                              >
                                    Sản phẩm của Shop
                              </li>
                              <li
                                    className='px-[16px] py-[12px] bg-white  rounded-lg hover:bg-slate-900 hover:text-white transition-all duration-500'
                                    onClick={() => setfilterMode('TYPE')}
                              >
                                    Sắp xếp theo loại
                              </li>
                              <li
                                    className='px-[16px] py-[12px] bg-white  rounded-lg hover:bg-slate-900 hover:text-white transition-all duration-500'
                                    onClick={() => setfilterMode('BEST_SELLER')}
                              >
                                    Các sản phẩm bán chạy
                              </li>
                        </ul>
                  </div>

                  <div className=' w-full h-max mt-[16px]'>{filterMode === 'NAME' && <OwnerShopFilterName />}</div>

                  {openForm && (
                        <BoxShopForm onClose={setOpenForm} modeForm={user.isOpenShop ? 'UPDATE' : 'UPLOAD'} defaultValues={defaultValues} />
                  )}
            </div>
      )
}

export default ShopOwnerLayout