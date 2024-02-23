import React, { ElementType, useEffect } from 'react'
import ProtectProductUpdate from './ProtectProductUpdate'
import BookUpdate from './BookUpdate'
import { useQuery } from '@tanstack/react-query'
import ProductApi from '../../../../apis/product.api'
import { useParams } from 'react-router-dom'
import { TProductDetail } from '../../../../types/product/product.type'

const UpdateWrapper = () => {
      const param = useParams()
      const { product_id } = param
      const protectProduct = useQuery({
            queryKey: ['get-product-with-id', product_id],
            queryFn: () => ProductApi.protectProduct({ id: product_id as string }),
      })

      useEffect(() => {
            if (protectProduct.isSuccess) {
                  // console.log({ _id: protectProduct.data.data.metadata.product?._id })
            }
      }, [protectProduct.isSuccess])

      const Book = <BookUpdate product={protectProduct.data?.data.metadata.product as TProductDetail} />

      return (
            <div className='w-full'>
                  {protectProduct.isSuccess && (
                        <ProtectProductUpdate
                              isSuccess={protectProduct.isSuccess}
                              product={protectProduct.data?.data.metadata.product}
                              ElementPrivate={<BookUpdate product={protectProduct.data?.data.metadata.product as TProductDetail} />}
                              ElementPublic={<p>Sản phẩm có id {product_id} không được tìm thấy trong shop của bạn</p>}
                        />
                  )}
            </div>
      )
}

export default UpdateWrapper
// import React from 'react'

// const UpdateWrapper = () => {
//       return <div>UpdateWrapper</div>
// }

// export default UpdateWrapper