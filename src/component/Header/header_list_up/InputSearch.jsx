import React, { useEffect } from 'react'
import { Link, NavLink } from 'react-router-dom'

export default function InputSearch(props) {
  const { data, show } = props

  // inputSearch.style.display = 'none'

  // useEffect(() => {
  //   console.log(data)
  //   const inputSearch = document.querySelector('.inputSearch')
  //   if (!data) {
  //     inputSearch.style.display = 'none'
  //   } else {
  //     inputSearch.style.display = 'block'
  //   }
  // }, [data])

  // console.log(data)

  const showHideDataSearch = document.querySelector('.showHideDataSearch')
  const handleBlur = (e) => {
    e.stopPropagation()
  }

  const handleClick = () => {
    showHideDataSearch.style.display = 'block'
  }

  return (
    <div
      className='showHideDataSearch bg-stale-50'
      onBlur={handleBlur}
      onClick={handleClick}
      tabIndex={0}
    >
      <div className='sanPhamTheoTen'>
        {!data && <span className='p-2'>Hãy nhập tìm kiếm</span>}

        {data &&
          data?.map((item) => (
            <a
              key={item.id}
              href={`/Buy/${item.id}`}
              className='hover:bg-purple-500 hover:ring-sky-300 p-2 hover:text-white rounded-md'
            >
              <span className='hover:text-white'>{item.name}</span>
            </a>
          ))}
      </div>
    </div>
  )
}
