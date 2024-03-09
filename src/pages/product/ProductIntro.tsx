import { CaravanIcon } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { IProductBook, TProductDetail } from '../../types/product/product.type'
import { Rate } from 'antd'
import ProductLabel from './ProductLabel'
import BoxConfirmAddress from '../../component/BoxUi/confirm/BoxConfirmAddress'
import { useSelector } from 'react-redux'
import { RootState } from '../../store'
import { UserResponse } from '../../types/user.type'
import { getAddressDefault, renderStringAddressDetailV2 } from '../../utils/address.util'
import { CartCurrent } from '../../Redux/cartSlice'

import { IProductFood } from '../../types/product/product.food.type'
import ProductFood from './ProductFood'
import ProductBook from './ProductBook'

import NowLogo from './assets/img/now.png'
import SunLogo from './assets/img/sun.png'
import { convertDateToString } from '../../utils/date.utils'
import ProductDescription from './ProductDescription'

type TProps = { product: TProductDetail; totalComment: number; avg: number }

const ProductIntro = (props: TProps) => {
      const { product, totalComment, avg } = props

      const user = useSelector((state: RootState) => state.authentication.user) as UserResponse
      const cartCurrent = useSelector((state: RootState) => state.cartSlice.cart_current) as CartCurrent
      const address_default = user?.user_address && user?.user_address.filter((address) => address.address_default === true)

      const [openModal, setOpenModal] = useState<boolean>(false)

      const handleOpenModal = () => {
            setOpenModal(true)
      }

      // console.log({ cartCurrent: renderStringAddressDetailV2(address_default[0]) })

      return (
            <div className='flex flex-col min-h-full h-max gap-[16px] text-[13px]'>
                  <section className='bg-white w-full min-h-[160px] h-auto p-[18px]  rounded-lg'>
                        <div className='flex flex-col gap-[4px]'>
                              <header>
                                    <div className='flex gap-[12px] flex-col xl:flex-row'>
                                          <ProductLabel content='Chính hãng' />
                                          {product.product_type === 'Book' && (
                                                <p>
                                                      <span>Tác giả: </span>
                                                      <span className='text-blue-700'>{(product?.attribute as IProductBook).author}</span>
                                                </p>
                                          )}
                                    </div>
                              </header>
                              <p className='text-[24px] text-black font-medium'>{product?.product_name}</p>
                              <div className=' h-[16px]  flex flex-col xl:flex-row xl:items-center gap-[8px] text-[16px] my-[6px]'>
                                    <span className='font-semibold'>{avg.toFixed(1)}</span>
                                    {/* {diffrenceBetweenStar(votes)?.map((opacity) => <Star opacity={opacity} />)} */}
                                    <Rate disabled allowHalf value={product.product_votes || 0} className='text-[14px]' />
                                    <p className='text-gray-400'>({totalComment})</p>
                                    <p className='w-[1px] h-[12px] mt-[5px] bg-gray-400'></p>
                                    <p className='text-[14px] text-gray-500 leading-3 mt-[2px]'>
                                          {product.product_is_bought > 1000 ? 'Đã bán 1000+' : product.product_is_bought || ''}
                                    </p>
                              </div>

                              <p className='text-[24px] text-black font-semibold'>
                                    {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(
                                          product?.product_price as number,
                                    )}
                              </p>
                              <p className=' text-[14px] text-gray-500'>Sản phẩm trong kho: {product.product_available || 0}</p>
                        </div>
                  </section>

                  <section className='bg-white w-full min-h-[160px] h-auto p-[18px] rounded-lg'>
                        <div className='flex flex-col gap-[12px]'>
                              <p className='[word-spacing:1px] text-[16px] text-black font-semibold word'>Thông tin vận chuyển</p>
                              <div className=' min-h-[26px] h-max w-full flex flex-col xl:flex-row justify-between'>
                                    <span className='text-[14px]'>
                                          {cartCurrent.cart_current_address
                                                ? `Giao đến: ${cartCurrent.cart_current_address}`
                                                : `Giao đến: ${getAddressDefault(user?.user_address)}`
                                                ? `Giao đến: ${address_default ? renderStringAddressDetailV2(address_default[0]) : ''}`
                                                : 'Bạn chưa chọn ví trí giao hàng'}
                                    </span>
                                    <button className='text-left text-blue-600' onClick={handleOpenModal}>
                                          {getAddressDefault(user?.user_address) ? 'Đổi' : 'Chọn vị trí'}
                                    </button>
                              </div>

                              <div className='w-full h-max flex flex-col gap-[12px]'>
                                    <div className='flex flex-col gap-[4px] text-[14px]  '>
                                          <div className='flex items-center gap-[8px]'>
                                                <img src={NowLogo} className='h-[16px] w-[30px]' alt='now' />
                                                <span className='font-medium'>Giao siêu tốc 2h</span>
                                          </div>
                                          <span className='text-[14px]'>Trước 10h ngày mai</span>
                                    </div>

                                    <div className='flex flex-col gap-[4px] text-[14px]  '>
                                          <div className='flex items-center gap-[8px]'>
                                                <img src={SunLogo} className='h-[16px] w-[30px]' alt='now' />
                                                <span className='font-medium'>Giao đúng chiều mai</span>
                                          </div>
                                          <span className='text-[14px]'>13h - 18h, {convertDateToString(new Date())}</span>
                                    </div>
                              </div>
                        </div>
                  </section>

                  <section className='w-full h-[550px] bg-orange-300'></section>
                  <section className='w-full h-[300px] bg-green-400'></section>
                  <section className='w-full h-[130px] bg-blue-400'></section>

                  <section className='min-h-[70px] h-max w-full  p-[18px]  bg-[#ffffff] flex flex-col gap-[6px] rounded-lg '>
                        <p className='text-[16px] font-semibold'>Thông tin chi tiết</p>
                        <div className='flex flex-wrap'>
                              {product.product_type === 'Food' && <ProductFood product_attribute={product.attribute as IProductFood} />}
                              {product.product_type === 'Book' && <ProductBook product_attribute={product.attribute as IProductBook} />}
                        </div>
                  </section>

                  <ProductDescription product={product && product} />

                  {openModal && <BoxConfirmAddress setOpenModal={setOpenModal} product_id={product._id} />}
            </div>
      )
}

export default ProductIntro
