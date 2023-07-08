import React from 'react'
import { NavLink } from 'react-router-dom'

export default function InputSearch(props) {
  const { dataShow, search } = props

  // console.log(dataShow)

  const dataSortFlowPrice = dataShow.sort((a, b) => a.Bought - b.Bought).reverse()

  // console.log(dataSortFlowPrice)
  const show = dataSortFlowPrice.map((data, index) => {
    // console.log(data);

    if (data.name.toLowerCase().indexOf(search.toLowerCase()) === -1) {
      return
    } else {
      const inputSearch = document.querySelector('.inputSearch')
      // inputSearch.style.display = 'none'
      return (
        <NavLink
          className='navLink'
          style={({ isActive }) => ({
            color: isActive ? '#000' : '#000',
            textDecoration: isActive ? 'none' : 'none',
          })}
          to='/buy'
          state={{ data: data }}
        >
          {data.name}{' '}
        </NavLink>
      )
    }
  })

  const handleBlur = (e) => {
    const inputSearch = document.querySelector('.inputSearch')
    inputSearch.style.display = 'none'
    // console.log(123)
    e.target.value = ''
  }

  const closeSearch = (e) => {
    const inputSearch = document.querySelector('.inputSearch')
    inputSearch.style.display = 'none'
  }
  return (
    <div className='inputSearch' onBlur={handleBlur} id='inputSearch' tabIndex={0}>
      <div className='sanPhamTheoTen'>{show}</div>
    </div>
  )
}
