import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../store'
import { Select } from 'antd'
import FormRegisterBook, { TRegisterFormBook } from './RegisterProductForm/FormRegisterBook'
// import FormRegisterFood from './RegisterProductForm/FormRegisterFood'
import { TUser } from '../../types/axiosResponse'
import { useMutation } from '@tanstack/react-query'
import ProductApi from '../../apis/product.api'
import Book from './Category/Book/Book'

export type timeLineRef = {
      publishing: string
      page_number: number
      author: string
      description: string
}

const defaultValues: Array<keyof timeLineRef> = ['publishing', 'author', 'page_number', 'description']

// const version2 = t

export type timeLineLabel = {
      'Nhà xuất bản': string
      'Tác giả': string
      'Số trang': string
      'Mô tả chi tiết': string
}
const labelValues: Array<keyof timeLineLabel> = ['Nhà xuất bản', 'Tác giả', 'Số trang', 'Mô tả chi tiết']

export type Timeline<T, K> = {
      FieldName: keyof T
      text: keyof K
}

const renderTimeLine = () => {
      const result: { FieldName: keyof timeLineRef; label: keyof timeLineLabel }[] = defaultValues.map((field, index) => {
            return {
                  FieldName: field,
                  label: labelValues[index] as keyof timeLineLabel,
            }
      })
      return result
}

const defaultValuesForm: TRegisterFormBook = {
      product_id: '',
      product_name: '',
      product_price: null,
      publishing: '',
      page_number: 0,
      author: '',
      description: '',
}

// const a: keyof timeLineRef =

console.log({ check: renderTimeLine() })

const RegisterSell = () => {
      const user = useSelector((state: RootState) => state.authentication.user) as TUser
      const [productType, setProductType] = useState<'Book' | 'Food'>()

      const createBaseProductId = useMutation({
            mutationKey: ['create-base-product-id'],
            mutationFn: () => ProductApi.createBaseProductId(),
      })

      if (!user.isOpenShop) {
            return <h1>Chức năng chỉ dành cho email đã được xác thực</h1>
      }
      return (
            <div className='min-w-full min-h-[100px] h-auto flex '>
                  <div className=' w-full h-full'>
                        <Select
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
                                          <FormRegisterBook<timeLineRef, timeLineLabel, TRegisterFormBook>
                                                ProductAttribute={<Book mode='UPLOAD' />}
                                                product_id={createBaseProductId.data.data.metadata.product_id}
                                                TimelineProps={renderTimeLine()}
                                                defaultValues={defaultValuesForm}
                                          />
                                    )}
                                    {/* {productType === 'Food' && <FormRegisterFood />} */}
                              </>
                        )}
                  </div>
            </div>
      )
}

export default RegisterSell
