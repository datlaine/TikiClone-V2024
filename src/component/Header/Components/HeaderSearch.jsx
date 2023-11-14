import React, { useEffect, useRef, useState } from 'react'
import { debounce } from 'lodash'
import { SLATE_TIME } from '../../../apis/staleTime'
import { getData } from '../../../apis/getDataMain'
import { useQuery } from '@tanstack/react-query'
import InputSearch from '../header_list_up/InputSearch'

const HeaderSeacrhInput = () => {
  const [search, setSearch] = useState('')
  const [filterSearchProduct, setFilterSearchProduct] = useState([])
  const [ketQua, setKetQua] = useState([])
  const [showSearch, setShowSearch] = useState(false)
  const inputRef = useRef(null)

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
      setKetQua('')
    }
  }, [search])

  const handleChange = debounce((e) => {
    let result = []
    console.log('search', search)
    setSearch(e.target.value)
    result = filterSearchProduct.filter((item) => {
      let nameLowerCase = item.name.toLowerCase()
      return nameLowerCase.includes(search.toLowerCase())
    })
    if (result.length === 0) {
      setKetQua('')
    } else {
      console.log(result)
      setKetQua(result)
    }
  }, 500)

  const handleSubMit = (e) => {
    e.preventDefault()
  }

  const handleClick = (e) => {}

 

  const handleEvent = (e, ele) => {
    if (ele?.contains(e.target)) {
      console.log('input click')
      setShowSearch(true)
    } else {
      console.log('input out')
      setShowSearch(false)
    }
  }

  useEffect(() => {
    window.addEventListener('click', (e) => handleEvent(e, inputRef?.current))

    return () => window.removeEventListener('click', (e) => handleEvent)
  }, [])


  return (
    <form
      className='basis-5/6 relative  dienThoai:p-2 dienThoai:border-[1px] dienThoai:border-solid  dienThoai:border-[#ccc] dienThoai:rounded-[6px] lg:w-6/12 lg:mt-0 xl:mt-0 relative  xl:flex xl:w-7/12 xl:h-[40px] xl:justify-center xl:items-center  xl:pl-[16px] xl:rounded-[8px] xl:border xl:border-solid xl:border-[rgb(221, 221, 227)]  dienThoai:flex dienThoai:items-center dienThoai:gap-x-2 dienThoai:h-full dienThoai:w-full 2xl:basis-4/6'
      id='inputFormSearch'
      onSubmit={handleSubMit}
    >
      <i className='fa-solid fa-magnifying-glass xl:px-[4px]'></i>
      <input
        type='text'
        className='inputSearchHeader xl:border-none xl:flex-1 xl:px-[10px] xl:outline-none flex-1  focus:outline-none focus:border-none'
        placeholder='Bạn tìm gì hôm nay'
        onChange={handleChange}
        ref={inputRef}
        onClick={handleClick}
      />
      <div className='dienThoai:hidden sm:hidden md:hidden w-[0.5px] h-5 bg-gray-400'></div>
      <button
        type='submit'
        className='md:hidden sm:hidden dienThoai:hidden dienThoai:bg-sky-500 dienThoai:text-zinc-200 xl:bg-transparent  xl:hover:bg-sky-500 xl:hover:text-slate-50 xl:border-none xl:border-l-2 xl:text-[#0a68ff] xl:text-[14px] xl:font-medium  xl:px-[16px] dienThoai:p-2 dienThoai:rounded-[8px]'
        onClick={handleClick}
      >
        Tìm kiếm
      </button>
      {showSearch && <InputSearch data={ketQua} show={showSearch} />}
    </form>
  )
}

export default HeaderSeacrhInput
