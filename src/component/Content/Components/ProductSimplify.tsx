import React from 'react'
import { TProductDetail } from '../../../types/product/product.type'
import logoSun from '../../../pages/product/assets/img/sun.png'
//w-175 - h-285
//item-iamge / h-[175]

type TProps = {
      product: TProductDetail
}

const ProductSimplify = (props: TProps) => {
      const { product } = props

      return (
            <div className='w-full h-full  flex flex-col gap-[6px] border-[1px] border-slate-200  rounded-xl'>
                  <img src={product.product_thumb_image?.secure_url} className='w-full h-[58%]' alt='' />
                  <div className='px-[6px] pb-[7px] flex-1 flex flex-col gap-[4px]  justify-between'>
                        <span className='w-[80%] break-words  line-clamp-2 text-[11px]'>
                              {product.product_name}ádsadsadsadsadsadsadsđsdsa
                        </span>
                        <span className='flex-1 break-words line-clamp-2 text-[15px] font-medium'>{product.product_price}</span>
                        <div className='flex items-center gap-[8px] pt-[4px] border-t-[1px] border-slate-200'>
                              <img src={logoSun} className='w-[30px] h-[16px] rounded-xl' alt='' />
                              <span className='text-[11px]'>Giao chiều mai</span>
                        </div>
                  </div>
            </div>
      )
}

export default ProductSimplify
