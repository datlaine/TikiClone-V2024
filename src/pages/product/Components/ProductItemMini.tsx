import React from 'react'
import { TProductDetail } from '../../../types/product/product.type'
import { Rate } from 'antd'
import { Link } from 'react-router-dom'

type TProps = {
      product: TProductDetail
}

const ProductItemMini = (props: TProps) => {
      const { product } = props

      return (
            <Link
                  to={`/product/${product._id}`}
                  className=' w-full h-full  flex flex-col gap-[20px] border-[1px] border-gray-300  rounded-lg'
            >
                  <img src={product.product_thumb_image?.secure_url} className='w-full h-[55%]  rounded-t-lg' alt='' />
                  <div className='px-[6px] pb-[7px] flex-1 flex flex-col gap-[10px]  justify-between text-[8px]'>
                        <span className='w-full break-words  line-clamp-2 text-[13px] h-[20px]'>{product.product_name}</span>

                        <div className='h-[12px] w-full'>
                              <Rate disabled allowHalf defaultValue={product.product_votes} className='text-[12px]' />
                        </div>
                        <p className=' break-words line-clamp-2 text-[14px] font-medium'>
                              <span>
                                    {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(product.product_price)}
                              </span>
                        </p>
                  </div>
            </Link>
      )
}

export default ProductItemMini
