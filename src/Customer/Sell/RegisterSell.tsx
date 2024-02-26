import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../store'
import { Select } from 'antd'
import FormRegisterBook from './RegisterProductForm/FormRegisterBook'
// import FormRegisterFood from './RegisterProductForm/FormRegisterFood'
import { useMutation } from '@tanstack/react-query'
import ProductApi from '../../apis/product.api'
import Book from './Category/Book/Book'
import {
      TTimeLineBookField,
      TTimeLineBookLabel,
      renderTimeLine,
      timelineFieldNameBook,
      timelineLabelNameBook,
} from '../../types/timeline/timeline.book.type'
import { TRegisterFormBook } from '../../types/product/product.book.type'
import ProductFormSkeleton from './RegisterProductForm/components/ProductFormSkeleton'
import { UserResponse } from '../../types/user.type'

// const version2 = t

const defaultValuesForm: TRegisterFormBook = {
      product_id: '',
      product_name: '',
      product_price: null,
      product_available: 0,
      attribute: {
            publishing: '',
            page_number: 0,
            author: '',
            description: '',
            book_type: 'Novel',
      },
}

// const a: keyof TTimeLineBook =

const RegisterSell = () => {
      const user = useSelector((state: RootState) => state.authentication.user) as UserResponse
      const [productType, setProductType] = useState<'Book' | 'Food'>()

      const createBaseProductId = useMutation({
            mutationKey: ['create-base-product-id'],
            mutationFn: () => ProductApi.createBaseProductId(),
      })

      if (!user.isOpenShop) {
            return <h1>Chức năng chỉ dành cho email đã được xác thực</h1>
      }
      return (
            <div className='min-w-full min-h-[100px] h-auto flex bg-[#ffffff] p-[20px] '>
                  <div className=' w-full h-full'>
                        <Select
                              className='w-[150px]'
                              placeholder='Loại sản phẩm'
                              options={[
                                    { value: 'Book', label: 'Book' },
                                    { value: 'Food', label: 'Food' },
                              ]}
                              onChange={(type: 'Book' | 'Food') => {
                                    setProductType(type)
                                    createBaseProductId.mutate()
                              }}
                        />
                        {createBaseProductId.isSuccess && (
                              <>
                                    {productType === 'Book' && (
                                          <FormRegisterBook<TTimeLineBookField, TTimeLineBookLabel, TRegisterFormBook>
                                                ProductAttribute={<Book mode='UPLOAD' />}
                                                product_id={createBaseProductId.data.data.metadata.product_id}
                                                TimelineProps={renderTimeLine({
                                                      defaultFieldName: timelineFieldNameBook,
                                                      defaultLabelName: timelineLabelNameBook,
                                                })}
                                                defaultValues={defaultValuesForm}
                                          />
                                    )}
                                    {/* {productType === 'Food' && <FormRegisterFood />} */}
                              </>
                        )}

                        {createBaseProductId.isPending && <ProductFormSkeleton />}
                  </div>
            </div>
      )
}

export default RegisterSell
