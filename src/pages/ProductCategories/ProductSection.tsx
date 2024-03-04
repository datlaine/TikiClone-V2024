import React from 'react'
import { TProductDetail } from '../../types/product/product.type'
import { Link } from 'react-router-dom'
import { convertDateToString, convertWeekday } from '../../utils/date.utils'
import { DateTime } from 'luxon'
import { Rate } from 'antd'

type TProps = {
      products: TProductDetail[]
}

const ProductSection = (props: TProps) => {
      const { products } = props
      const d = new Date()
      return (
            <div className='w-full min-h-full h-max'>
                  <div className='grid grid-cols-2 xl:grid-cols-4 grid-rows-[450px] gap-[28px] auto-rows-[450px] '>
                        {products &&
                              products.map((product, index) => (
                                    <Link
                                          to={`/product/${product._id}`}
                                          key={product._id}
                                          className='bg-[#ffffff] p-[12px] flex flex-col gap-[20px] rounded-md border-[1px] border-gray-50 hover:shadow-lg'
                                    >
                                          <div className='w-full h-[40%] xl:h-[50%] flex justify-center '>
                                                <img
                                                      src={product.product_thumb_image?.secure_url}
                                                      className='xw-full min-h-full max-h-full h-full'
                                                      alt='product '
                                                />
                                          </div>
                                          <div className='flex-1 flex flex-col gap-[10px]'>
                                                <p className='text-slate-800 text-[20px] font-extrabold'>
                                                      {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(
                                                            product.product_price,
                                                      )}
                                                </p>
                                                <div className='flex flex-col gap-[8px] text-[16px]'>
                                                      <p>{product.shop_id.shop_name}</p>
                                                      <p className='break-all'>{product.product_name}</p>
                                                      <div className='flex flex-col xl:flex-row gap-[8px] text-[14px] xl:items-center'>
                                                            <Rate disabled defaultValue={product.product_votes} style={{ fontSize: 14 }} />

                                                            <p>Đã bán {product.product_is_bought}</p>
                                                      </div>
                                                </div>
                                          </div>
                                          <footer className='self-end w-full h-[36px] xl:h-[28px] flex items-center pt-[2px] border-t-[1px] border-gray-200'>
                                                <p className='w-full flex flex-col xl:flex-row xl:items-center justify-between'>
                                                      <span className='hidden xl:inline-block'>Giao vào {convertWeekday(d)}</span>
                                                      <span>{convertDateToString(d)}</span>
                                                </p>
                                          </footer>
                                    </Link>
                              ))}
                  </div>
            </div>
      )
}

export default ProductSection
