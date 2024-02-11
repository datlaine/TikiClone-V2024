import { useQuery } from '@tanstack/react-query'
import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import ProductApi from '../../../../apis/product.api'
import FormUpdateBook from '../../UpdateProductForm/FormUpdateBook'
import { TProductDetail } from '../../../../types/product/product.type'

export type TProps = {
      product: TProductDetail
}

const BookUpdate: React.FC<TProps> = (props: TProps) => {
      const { product } = props

      // const product = getProductWithId.isSuccess ? getProductWithId!.data!.data!.metadata.product : undefined
      console.log({ product })

      useEffect(() => {}, [product])

      return (
            <div className='w-[1000px] mx-auto bg-white px-[20px] flex justify-center'>
                  <FormUpdateBook
                        product={product as TProductDetail}
                        defaultValues={product}
                        public_id={product.product_thumb_image.public_id}
                        public_id_array={product.product_desc_image}
                  />
            </div>
      )
}

export default BookUpdate
// import React from 'react'

// const BookUpdate = () => {
//       return <div>BookUpdate</div>
// }

// export default BookUpdate
