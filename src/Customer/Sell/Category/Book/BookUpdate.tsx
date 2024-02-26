import React, { useEffect } from 'react'
import { TProductDetail } from '../../../../types/product/product.type'
import {
      TTimeLineBookField,
      TTimeLineBookLabel,
      renderTimeLine,
      timelineFieldNameBook,
      timelineLabelNameBook,
} from '../../../../types/timeline/timeline.book.type'
import Book from './Book'
import ProductUpdate from '../../UpdateProductForm/ProductUpdate'

export type TProps = {
      product: TProductDetail
}

const BookUpdate: React.FC<TProps> = (props: TProps) => {
      const { product } = props

      // const product = getProductWithId.isSuccess ? getProductWithId!.data!.data!.metadata.product : undefined
      // console.log({ product })

      useEffect(() => {}, [product])

      return (
            <div className='w-[1000px] mx-auto bg-white px-[20px] flex justify-center'>
                  <ProductUpdate<TTimeLineBookField, TTimeLineBookLabel, typeof product>
                        ProductAttribute={<Book mode='UPDATE' />}
                        product_id={product._id}
                        mode='UPDATE'
                        TimelineProps={renderTimeLine({
                              defaultFieldName: timelineFieldNameBook,
                              defaultLabelName: timelineLabelNameBook,
                        })}
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
