import React from 'react'
import { IProductFood } from '../../types/product/product.food.type'
import { IProductBook, ProductAttributeObject } from '../../types/product/product.type'
import { TTimeLineBookField, TTimeLineBookLabel } from '../../types/timeline/timeline.book.type'

type TProps = {
      product_attribute: Omit<IProductBook, 'product_id' | 'description'>
}

const book_label: Array<keyof TTimeLineBookLabel> = ['Nhà xuất bản', 'Tác giả', 'Thể loại của sách', 'Số trang']

const ProductBook = (props: TProps) => {
      const { product_attribute } = props

      console.log({ product_attribute })

      const { author, book_type, page_number, publishing } = product_attribute

      const attribute = {
            publishing,
            author,
            book_type,
            page_number,
      }

      return (
            <div className='ml-[10px] xl:ml-[30px] py-[16px] text-[14px] xl:text-[20px] flex flex-col gap-[8px] xl:gap-[16px] '>
                  {Object.keys(attribute).map((attri, index) => {
                        if (attri === 'product_id' || attri === 'description') {
                              return null
                        }
                        return (
                              <div className='relative w-full flex flex-wrap items-center gap-[8px]' key={attri + index}>
                                    <span className=' w-[10px] h-[10px] bg-blue-500 rounded-full'></span>
                                    <span>{book_label[index]}</span>
                                    <span>
                                          {(product_attribute as unknown as ProductAttributeObject)[attri] ||
                                                'Không có thông tin về sản phẩm'}
                                    </span>
                                    {/* <span>{attri}</span> */}
                              </div>
                        )
                  })}
            </div>
      )
}

export default ProductBook
