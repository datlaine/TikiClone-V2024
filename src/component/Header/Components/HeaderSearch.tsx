import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import InputSearch from './HeaderResultSearch'
import { debounce, throttle } from 'lodash'
import HeaderResultSearch from './HeaderResultSearch'

const HeaderSeacrhInput = () => {
    const [search, setSearch] = useState('')
    const [filterSearchProduct, setFilterSearchProduct] = useState([])
    const [ketQua, setKetQua] = useState([])
    const [showSearch, setShowSearch] = useState(false)
    const inputRef = useRef<HTMLInputElement>(null)
    const resultRef = useRef<HTMLDivElement>(null)
    const { data, isLoading } = useQuery({
        queryKey: ['search'],
        queryFn: () => {},
        staleTime: 60 * 60 * 1000,
        enabled: search !== '',
    })

    useEffect(() => {
        if (!isLoading) {
            // setFilterSearchProduct(data?.data)
        }
        if (!search) setShowSearch(false)
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
        setShowSearch(true)
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

    // const handleSubMit = (e: any) => {
    //       e.preventDefault()
    // }

    return (
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
                    <div className='group basis-[25%]  lg:basis-[28%] 2xl:basis-[11%]  flex items-center transition-all duration-200 before:content-["|"] before:text-gray-300 before:text-2xl: opacity-80 hover:before:opacity-0 hover:bg-sky-700 '>
                        <button type='submit' className='text-sm w-full h-full text-center text-sky-800 group-hover:text-sky-100' disabled>
                            Tìm kiếm
                        </button>
                    </div>
                </form>
                {showSearch && <HeaderResultSearch setShowSearch={setShowSearch} data={ketQua} show={showSearch} />}
            </div>
        </div>
    )
}

export default HeaderSeacrhInput
