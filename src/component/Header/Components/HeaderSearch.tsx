import React, { useCallback, useEffect, useRef, useState } from 'react'
import { SLATE_TIME } from '../../../apis/staleTime'
import { getData } from '../../../apis/getDataMain'
import { useQuery } from '@tanstack/react-query'
import InputSearch from './HeaderResultSearch'
import { debounce, throttle } from 'lodash'

const HeaderSeacrhInput = () => {
      const [search, setSearch] = useState('')
      const [filterSearchProduct, setFilterSearchProduct] = useState([])
      const [ketQua, setKetQua] = useState([])
      const [showSearch, setShowSearch] = useState(false)
      const inputRef = useRef<HTMLInputElement>(null)

      const { data, isLoading } = useQuery({
            queryKey: ['search'],
            queryFn: () => getData('/danhSachSanPham'),
            staleTime: SLATE_TIME,
            enabled: search !== '',
      })

      useEffect(() => {
            if (!isLoading) {
                  setFilterSearchProduct(data?.data)
            }
      }, [isLoading])

      useEffect(() => {
            if (!search) {
                  setKetQua([])
            }
      }, [search])

      const handleChange = (e: any) => {
            let result = []
            console.log('search', search)
            setSearch(e.target.value)
            result = filterSearchProduct.filter((item: any) => {
                  let nameLowerCase = item.name.toLowerCase()
                  return nameLowerCase.includes(search.toLowerCase())
            })
            if (result.length === 0) {
                  setKetQua([])
            } else {
                  console.log(result)
                  setKetQua(result)
            }
      }

      const handleSubMit = (e: any) => {
            e.preventDefault()
      }

      // const handleClick = (e) => {}

      useEffect(() => {
            const handleEvent = debounce((e: MouseEvent, ele: React.RefObject<HTMLElement>) => {
                  if (!ele.current?.contains(e.target as HTMLElement) && showSearch) {
                        console.log('input click')
                        if (showSearch) setShowSearch(false)
                  }
            }, 1500)

            window.addEventListener('click', (e: MouseEvent) => handleEvent(e, inputRef))
            if (!showSearch) {
                  window.removeEventListener('click', (e) => handleEvent(e, inputRef))
            }
            return () => window.removeEventListener('click', (e) => handleEvent(e, inputRef))
      }, [showSearch])

      return (
            // <form id='inputFormSearch' onSubmit={handleSubMit}>
            //   <i className='fa-solid fa-magnifying-glass xl:px-[4px]'></i>
            //   <input
            //     type='text'
            //     className='inputSearchHeader xl:border-none xl:flex-1 xl:px-[10px] xl:outline-none flex-1  focus:outline-none focus:border-none'
            //     placeholder='Bạn tìm gì hôm nay'
            //     onChange={handleChange}
            //     ref={inputRef}
            //   />
            //   <div className='dienThoai:hidden sm:hidden md:hidden w-[0.5px] h-5 bg-gray-400'></div>
            //   <button
            //     type='submit'
            //     className='2xl:block mr-[-8px] md:hidden sm:hidden dienThoai:hidden dienThoai:bg-sky-500 dienThoai:text-zinc-200 xl:bg-transparent  xl:hover:bg-sky-400 xl:hover:text-slate-50 xl:border-none xl:border-l-2 xl:text-[#0a68ff] xl:text-[14px] xl:font-medium  xl:px-[16px] dienThoai:p-2 dienThoai:rounded-[8px]'
            //     disabled
            //   >
            //     Tìm kiếm
            //   </button>
            //   {showSearch && <InputSearch data={ketQua} />}
            // </form>

            <div className='flex h-full border border-gray-300 rounded-lg'>
                  <div className='relative grow  h-full pl-4'>
                        <form className='h-full  flex gap-4'>
                              <div className='basis-[3%]   flex items-center'>
                                    <i className='fa-solid fa-magnifying-glass text-2xl'></i>
                              </div>
                              <div className='grow ' onClick={() => setShowSearch((prev) => !prev)}>
                                    <input
                                          type='text'
                                          className='w-full h-full outline-none border-none'
                                          placeholder='Bạn tìm gì hôm nay'
                                          onChange={handleChange}
                                          ref={inputRef}
                                    />
                              </div>
                              <div
                                    className='group basis-[25%]  lg:basis-[28%] 2xl:basis-[11%]  flex items-center transition-all duration-200 
              before:content-["|"] before:text-gray-300 before:text-2xl: opacity-80 
              hover:before:opacity-0 hover:bg-sky-700 '
                              >
                                    <button
                                          type='submit'
                                          className='text-sm w-full h-full text-center text-sky-800 group-hover:text-sky-100'
                                          disabled
                                    >
                                          Tìm kiếm
                                    </button>
                              </div>
                        </form>
                        {showSearch && <InputSearch data={ketQua} />}
                  </div>
            </div>
      )
}

export default HeaderSeacrhInput
