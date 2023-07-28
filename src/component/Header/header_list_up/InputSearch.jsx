import React, { useEffect } from 'react'
import { Link, NavLink } from 'react-router-dom'

export default function InputSearch(props) {
  const { data, show } = props

  const showHideDataSearch = document.querySelector('.showHideDataSearch')
  const handleBlur = (e) => {
    e.stopPropagation()
  }

  const handleClick = () => {
    showHideDataSearch.style.display = 'block'
  }

  const main = document.querySelector('#main')
  if (main) {
    main.addEventListener('click', () => {
      document.querySelector('.showHideDataSearch').style.display = 'none'
    })
  }

  return (
    <div
      className='showHideDataSearch absolute left-0 top-full right-0 hidden m-h-25 overflow-hidden xl:py-5 rounded-[2px]  bg-white border-[1px] border-solid border-[#ccc] min-h-55 z-[9999] dienThoai:hidden m-h-40'
      onBlur={handleBlur}
      onClick={handleClick}
      tabIndex={0}
    >
      <div className='sanPhamTheoTen dienThoai:my-2 flex flex-col gap-y-2 overflow-hidden'>
        {!data && <span className='p-2'>Hãy nhập tìm kiếm</span>}

        {data &&
          data?.map(
            (item, index) =>
              index <= 5 && (
                <a
                  key={item.id}
                  href={`/Buy/${item.id}`}
                  className='hover:bg-blue-500 hover:ring-sky-300 p-2 hover:text-white rounded-md dienThoai:mx-2'
                >
                  <span className='hover:text-white'>{item.name}</span>
                </a>
              ),
          )}
      </div>
    </div>
  )
}
