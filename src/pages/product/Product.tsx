import { useQuery } from '@tanstack/react-query'
import React, { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import ProductApi from '../../apis/product.api'
import { ChevronsRight, Image } from 'lucide-react'
import ProductDetail from './ProductDetail'
import ProductIntro from './ProductIntro'
import ProductPay from './ProductPay'
import NotFound from '../../component/Errors/NotFound'
import { useSelector } from 'react-redux'
import { RootState } from '../../store'
import { TUser } from '../../types/axiosResponse'

export type TImage = {
      secure_url: string
}

const Product = () => {
      const param = useParams()
      const { id } = param
      const user = useSelector((state: RootState) => state.authentication.user) as TUser

      const getProductWithId = useQuery({
            queryKey: ['get-product-with-id', id],
            queryFn: () => ProductApi.getProductWithId({ id: id as string }),
      })

      const product = getProductWithId.isSuccess ? getProductWithId!.data!.data!.metadata.product : undefined
      useEffect(() => {
            window.scrollTo({
                  top: 0,
                  left: 0,
                  behavior: 'smooth',
            })
      }, [])

      useEffect(() => {}, [getProductWithId.isSuccess])
      if (getProductWithId.isSuccess) {
            const message = ['Sản phẩm có thể đã bị Shop sở hũu xóa đi', 'Sản phẩm có thể đã bị chính bạn xóa đi']
            if (!getProductWithId?.data?.data?.metadata?.product?.product_thumb_image?.secure_url) {
                  return (
                        <NotFound
                              ContentHeader='Không tìm thấy sản phẩm'
                              ContentDescription={user._id === product?.shop_id.owner ? message[1] : message[0]}
                        />
                  )
            }
      }

      return (
            <div className='flex flex-col w-full text-[12px]'>
                  <div className=' w-full flex flex-col gap-[4px] '>
                        {getProductWithId.data?.data && (
                              <div className='flex gap-[4px] '>
                                    <Link to='/'>Trang chủ</Link>
                                    <ChevronsRight size={16} color='black' />
                                    {/* <Link to={'/product/:type'}>{getProductWithId.data.data.metadata.product.}</Link> */}
                              </div>
                        )}

                        {getProductWithId.isSuccess && product && (
                              <div className='px-[10px] xl:px-[20px] flex gap-[16px] xl:gap-[24px] mt-[30px] xl:mt-0'>
                                    <div className='w-[60%] xl:w-[74%] flex flex-col gap-[24px]'>
                                          <div className='top w-full min-h-[1000px] h-max flex flex-col xl:flex-row gap-[24px]'>
                                                <div className='basis-[40%] static xl:sticky top-[32px] xl:top-[16px] bg-white px-[3px] py-[6px] rounded-sm  h-max flex flex-col gap-[16px] '>
                                                      <ProductDetail product={product} isSuccess={getProductWithId.isSuccess} />
                                                </div>
                                                <div className='basis-[60%]  h-[5000px] mt-[20px] xl:mt-0 rounded-lg '>
                                                      <ProductIntro product={product} />
                                                </div>
                                          </div>
                                          <div className='comment w-full h-[1000px] bg-yellow-500'></div>
                                    </div>
                                    <div className='w-[40%] xl:w-[26%] sticky top-[100px] xl:top-[16px] h-max pb-[15px] bg-white  rounded-md'>
                                          <ProductPay product={product} />
                                    </div>
                              </div>
                        )}

                        {getProductWithId.isPending && (
                              <div className='animate-pulse bg-gray-300 flex gap-[24px]'>
                                    <div className='  basis-[80%] flex flex-col gap-[24px]'>
                                          <div className='top w-full min-h-[1000px] h-max flex flex-col xl:flex-row gap-[24px]'>
                                                <div className='basis-[40%] bg-gray-400 static min-h-[800px] h-[900px] xl:sticky top-[16px]  p-[8px] rounded-sm   flex flex-col gap-[16px]'>
                                                      <div className='bg-gray-500  basis-[35%] w-[350px]'></div>
                                                      <div className='flex bg-gray-400 h-[50px] gap-[16px]'>
                                                            {Array(5)
                                                                  .fill(0)
                                                                  .map((skeleton, index) => (
                                                                        <div
                                                                              className='bg-gray-500 w-[20%] flex items-center justify-center'
                                                                              key={index}
                                                                        >
                                                                              <Image size='30' />
                                                                        </div>
                                                                  ))}
                                                      </div>
                                                      <div className='flex-1 bg-gray-500 w-full'></div>
                                                </div>
                                                <div className='basis-[60%] bg-gray-400  h-[5000px] mt-[20px] xl:mt-0 rounded-lg '>
                                                      {/* <ProductIntro product={product} /> */}
                                                </div>
                                          </div>
                                          <div className='comment w-full h-[1000px] bg-yellow-500'></div>
                                    </div>
                                    <div className='animate-pulse bg-gray-400 basis-[20%] sticky top-[16px] h-[300px]'></div>
                              </div>
                        )}
                  </div>
                  <div className='bg-black h-[4000px] w-full'></div>
            </div>
      )
}

export default Product
