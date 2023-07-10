import './header_list_up.css'
import ModuleHover from '../module_hover/Module_hover'
import { useLayoutEffect, useState } from 'react'
import { useEffect } from 'react'
import InputSearch from './InputSearch'
import { apiLink } from '../../../apis/api'
import { useMatch } from 'react-router-dom'
function Header_list_up() {
  const [search, setSearch] = useState('')
  const [apiSearch, setApiSearch] = useState([])
  const [ketQua, setKetQua] = useState([])

  useEffect(() => {
    fetch(`${apiLink}/danhSachSanPham`)
      .then((res) => res.json())
      .then((data) => setApiSearch(data))
  }, [])

  const handleChange = (e) => {
    let result = []
    // console.log('search', search)
    setSearch(e.target.value)
    result = apiSearch.filter((item) => {
      let nameLowerCase = item.name.toLowerCase()
      return nameLowerCase.includes(search.toLowerCase())
    })
    // console.log(result)
    setKetQua(result)
  }

  const handleSubMit = (e) => {
    e.preventDefault()
  }

  const handleClick = (e) => {
    const inputSearch = document.querySelector('.inputSearch')
    inputSearch.style.display = 'block'
  }

  const handleBlur = (e) => {
    const inputSearch = document.querySelector('.inputSearch')
    inputSearch.style.display = 'none'
    e.target.value = ''
  }
  let newApi = []
  if (apiSearch) {
    // console.log('>>>AOI' , apiSearch)
    newApi = apiSearch.filter((item, index) => {
      // console.log('>>>> check item.danhSach', item.danhSach)
      if (item) {
        // console.log(item)
        return item.danhSach
      }
    })

    // console.log("result" ,newApi)
  }

  return (
    <div id='header_list_up'>
      <div className='logo'>
        <img
          src='https://salt.tikicdn.com/ts/upload/e4/49/6c/270be9859abd5f5ec5071da65fab0a94.png'
          width='57px'
          height='40px'
          alt=''
        />
      </div>
      <form className='input' onSubmit={handleSubMit}>
        <i className='fa-solid fa-magnifying-glass'></i>
        <input
          type='text'
          placeholder='Bạn tìm gì hôm nay'
          onChange={handleChange}
          onClick={handleClick}
        />
        <button type='submit' className='btn-header' onClick={handleClick}>
          Tìm kiếm
        </button>
        <InputSearch data={ketQua} />
      </form>
      <div id='nav'>
        <a className='nav_item bg-sky-500 text-white rounded-lg	' href='/'>
          <img
            src='https://salt.tikicdn.com/ts/upload/b4/90/74/6baaecfa664314469ab50758e5ee46ca.png'
            alt=''
          />
          <button
            
          >
            Trang Chủ
          </button>
        </a>
        <div className='nav_item'>
          <img
            src='https://salt.tikicdn.com/ts/upload/41/28/7d/4713aa0d2855c5c770799f248692f0c5.png'
            alt=''
          />
          <button>Astra</button>
        </div>
        <div className='nav_item'>
          <img
            src='https://salt.tikicdn.com/ts/upload/07/d5/94/d7b6a3bd7d57d37ef6e437aa0de4821b.png'
            alt=''
          />
          <button>Tài Khoản</button>
          <ModuleHover></ModuleHover>
        </div>
        <div className='container-cart'>
          <div className='cart'>
            <img
              src='https://salt.tikicdn.com/ts/upload/51/e2/92/8ca7e2cc5ede8c09e34d1beb50267f4f.png'
              alt=''
            />
            <span className='numbers-cart'>0</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Header_list_up
