import { Check, Filter, X } from 'lucide-react'
import React, { useReducer, useRef, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import filterProductReducer, { Actions, initialValue } from '../../reducer/filterProduct.reducer'
import { Rate } from 'antd'
import FilterProductVote from '../../pages/ProductCategories/Components/FilterProductVote'
import FilterProductPrice from '../../pages/ProductCategories/Components/FilterProductPrice'

export const MAX_PRICE = 1000000000

const BoxFilterProduct = () => {
      const form = useForm()
      const [filter, setFilter] = useState<{ onVote: number; minPrice: number; maxPrice: number }>({
            onVote: 5,
            minPrice: 1,
            maxPrice: MAX_PRICE,
      })

      console.log({ filter })

      const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault()
            console.log({ filter })
      }

      return (
            <div className='fixed inset-0 bg-[rgba(0,0,0,.4)] h-screen flex items-center justify-center'>
                  <form className='w-[550px] h-[700px] px-[20px] bg-[#ffffff] rounded flex flex-col' onSubmit={onSubmit}>
                        <header className='relative w-full h-[8%] flex items-center justify-center border-b-[1px] border-gray-200  '>
                              <h3 className='text-[18px] text-slate-800 font-extrabold'>Tất cả bộ lọc</h3>
                              <X className='absolute top-[50%] translate-y-[-50%] right-[20px]' />
                        </header>
                        <div className='flex-1 w-full   overflow-y-scroll'>
                              <div className='w-full h-max flex '>
                                    <FilterProductVote setVote={setFilter} />
                              </div>
                              <div className='w-full h-[1px] bg-gray-200 my-[16px]'></div>

                              <div className='w-full h-max flex '>
                                    <FilterProductPrice setPrice={setFilter} />
                              </div>
                        </div>
                        <footer className='w-full h-[12%] flex items-center justify-between'>
                              <button className='min-w-[100px] h-[60%] p-[8px_6px] border-[1px] border-gray-200 rounded'>Xóa tất cả</button>
                              <button className='min-w-[100px] h-[60%] p-[8px_6px] border-[1px] border-gray-200 rounded' type='submit'>
                                    Xem kết quả
                              </button>
                        </footer>
                  </form>
            </div>
      )
}

//un -> def

export default BoxFilterProduct
