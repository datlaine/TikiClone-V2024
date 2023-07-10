import React from 'react'
import { Link, NavLink } from 'react-router-dom'

export default function InputSearch(props) {
  const { data } = props

  // inputSearch.style.display = 'none'
  const handleBlur = (e) => {
    const inputSearch = document.querySelector('.inputSearch')
    inputSearch.style.display = 'none'
    // console.log(123)
    e.target.value = ''
  }

  const closeSearch = (e) => {
    const inputSearch = document.querySelector('.inputSearch')
    console.log('alo')
    inputSearch.style.display = 'none'
  }

  // console.log(data)

  return (
    <div className='inputSearch bg-stale-50	' onBlur={closeSearch} id='inputSearch' tabIndex={0}>
      <div className='sanPhamTheoTen'>
        {data.map((item) => (
          <Link
            key={item.id}
            to={`/Buy/${item.id}`}
            className='hover:bg-purple-500 hover:ring-sky-300 p-2 hover:text-white rounded-md'
          >
            <span className='hover:text-white'>{item.name}</span>
          </Link>
        ))}
      </div>
    </div>
  )
}
